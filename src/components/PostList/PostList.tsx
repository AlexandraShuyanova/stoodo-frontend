import {useEffect, useState} from 'react';
import {PostItem} from "@/components/PostItem/PostItem";
import styles from "./PostList.module.scss";
import {useGetPostsQuery} from "../../services/StoodoService";
import {CircularProgress} from "@mui/material";
import {IPost} from "@/types/IPost";

export const PostList = () => {
    //const [page, setPage] = useState(0);
    const [postList, setPostList] = useState<IPost[]>([]);
    const {data, isFetching} = useGetPostsQuery();

    useEffect(() => {
        if (!data?.content.length) return;

        setPostList(current => {
            const existingIds = new Set(current.map(post => post.id));
            const newPosts = data.content.filter(post => !existingIds.has(post.id));
            const updatedList = newPosts.length ? [...current, ...newPosts] : current;
            return [...updatedList].sort((a, b) => {
                const aTime = a.created_at ? Date.parse(a.created_at) : 0;
                const bTime = b.created_at ? Date.parse(b.created_at) : 0;
                return bTime - aTime;
            });
        });
    }, [data])

    /*useEffect(() => {
        const handleScroll = () => {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

            if (window.scrollY < scrollableHeight || isFetching || data?.last === true) {
                return;
            }
            setPage(p => p + 1)
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching, data]);*/

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
