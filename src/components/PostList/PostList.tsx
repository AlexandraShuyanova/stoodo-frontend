import {useEffect, useState} from 'react';
import {PostItem} from "@/components/PostItem/PostItem";
import styles from "./PostList.module.scss";
import {useGetListNotPublishedQuery, useGetListPublishedQuery} from "../../services/StoodoService";
import {CircularProgress} from "@mui/material";
import {IPost} from "@/types/IPost";

export const PostList = () => {
    const [page, setPage] = useState(0);
    const [postList, setPostList] = useState<IPost[]>([]);
    const {data, isFetching} = useGetListPublishedQuery(page);

    useEffect(() => {
        if (data === undefined || data.content.length === 0)
            return

        for (let post of postList) {
            if (post.id === data.content[0].id) {
                return
            }
        }

        setPostList( list => [...list, ...data.content])
    }, [data, postList])

    useEffect(() => {
        const handleScroll = () => {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

            if (window.scrollY < scrollableHeight || isFetching || data?.last === true) {
                return;
            }
            setPage(p => p + 1)
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching, data]);

    return (
        <section>
            <div className={styles.container}>
                {postList.map(post =>
                    <PostItem
                        key={post.id}
                        item={post}
                    />
                )}
                {isFetching && <div className={styles.loader}><CircularProgress /></div>}
            </div>
        </section>
    );
};
