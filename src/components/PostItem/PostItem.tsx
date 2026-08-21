import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import styles from './PostItem.module.scss';
import { IPost } from "@/types/IPost";
import { FC } from "react";
import { useGetPostStatByIdQuery } from "../../services/StoodoService";
import { useRouter } from "next/router";

interface PostItemProps {
    item: IPost;
}

export const PostItem: FC<PostItemProps> = ({ item }) => {
    const { id, title, slug, images, owner, posts_content, created_at } = item;
    const { data: postStat } = useGetPostStatByIdQuery(id, { skip: !id });
    const router = useRouter();

    const content = posts_content?.find((post) => post.is_current_version) ?? posts_content?.[0];
    const excerpt = content?.text
        ? content.text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 180)
        : '';

    const authorName = owner ? `${owner.first_name} ${owner.last_name}` : 'Unknown author';
    const authorInitial = owner?.first_name?.[0] ?? 'R';

    const handleOpenPost = () => {
        router.push(`/posts/${slug}`);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    };

    const formatTimeAgo = (value: string | null) => {
        if (!value) return '';

        const created = new Date(value);
        if (Number.isNaN(created.getTime())) return '';

        const diffMs = Date.now() - created.getTime();
        const diffMin = Math.floor(diffMs / 60000);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffMin < 1) return 'just now';
        if (diffMin < 60) return `${diffMin}m ago`;
        if (diffHour < 24) return `${diffHour}h ago`;
        if (diffDay < 7) return `${diffDay}d ago`;
        return created.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    return (
        <div className={styles.post} onClick={handleOpenPost} role="button" tabIndex={0}>
            <div className={styles.headerRow}>
                <div className={styles.authorBlock}>
                    <Avatar className={styles.avatar}>{authorInitial}</Avatar>
                    <div className={styles.authorMeta}>
                        <div className={styles.authorName}>{authorName}</div>
                        <div className={styles.time}>{formatTimeAgo(created_at)}</div>
                    </div>
                </div>

                <IconButton className={styles.moreBtn} aria-label="Post actions" onClick={handleMenuClick}>
                    <MoreVertIcon />
                </IconButton>
            </div>

            <div className={styles.body}>
                <div className={styles.content}>
                    <h3 className={styles.title}>{title}</h3>
                    {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
                </div>

                {images?.url && (
                    <img className={styles.postImage} src={images.url} alt={title} />
                )}
            </div>

            <div className={styles.footer}>
                <div className={styles.stats}>
                    <span className={styles.statItem}>
                        <FavoriteBorderIcon fontSize="small" />
                        <span>{postStat?.likes_count ?? 0}</span>
                    </span>
                    <span className={styles.statItem}>
                        <ChatBubbleOutlineIcon fontSize="small" />
                        <span>{postStat?.opened_count ?? 0}</span>
                    </span>
                    <span className={styles.statItem}>
                        <BookmarkBorderIcon fontSize="small" />
                    </span>
                </div>

            </div>
        </div>
    );
};
