import {useEffect, useState} from 'react';
import {PostItem} from "@/components/PostItem/PostItem";
import styles from "./PostList.module.scss";
import {useGetPostsQuery} from "../../services/StoodoService";
import {CircularProgress} from "@mui/material";
import {IPost} from "@/types/IPost";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const PostList = () => {
    //const [page, setPage] = useState(0);
    const search = useSelector(
        (state: RootState) => state.search.search
    );
    const [postList, setPostList] = useState<IPost[]>([]);
    const {data, isFetching} = useGetPostsQuery({search});

    useEffect(() => {
        if (!data) return;

        setPostList(
            [...data.content].sort((a,b) => {
                const aTime = a.created_at ? Date.parse(a.created_at) : 0;
                const bTime = b.created_at ? Date.parse(b.created_at) : 0;
                return bTime - aTime;
            })
        );
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
