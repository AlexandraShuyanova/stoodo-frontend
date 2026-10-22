import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from './PostContent.module.scss';
import {IPost} from "@/types/IPost";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
    useGetPostStatByIdQuery,
    useGetUserPostInteractionQuery,
    useLikePostMutation
} from "../../services/StoodoService";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useState} from "react";

interface PostContentProps {
    item: IPost;
}

export const PostContent = ({item}: PostContentProps) => {
    const {id, title, images, posts_content, owner, created_at, topic} = item;
    const { data: postStat } = useGetPostStatByIdQuery(id, { skip: !id });
    const [likePost, {isLoading}] = useLikePostMutation();
    const router = useRouter();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const { data: interaction } = useGetUserPostInteractionQuery(id, { skip: !id || !isAuth });

    const liked = interaction?.liked ?? false;

    const text = posts_content[0]?.text ?? "";

    const authorName = owner ? `${owner.first_name} ${owner.last_name}` : 'Unknown author';
    const authorInitial = owner?.first_name?.[0] ?? 'R';
    const createdDate = created_at
        ? new Date(created_at).toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'})
        : '';

    const readMinutes = Math.max(1, Math.round(text.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length / 200));

    const handleLikePost = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        likePost({ id, isLiked: !liked });
    }
    return (
        <Card className={styles.postContent}>
            {topic?.topic && <span className={styles.topic}>{topic.topic}</span>}

            <Typography variant="h3" component="h1" className={styles.title}>
                {title}
            </Typography>

            <div className={styles.authorRow}>
                <Avatar className={styles.avatar}>{authorInitial}</Avatar>
                <div className={styles.authorMeta}>
                    <div className={styles.authorName}>{authorName}</div>
                    <div className={styles.date}>{createdDate} · {readMinutes} min read</div>
                </div>
            </div>

            <div className={styles.actions}>
                {/* TODO: like, comments */}
                <span className={styles.actionItem}>
                    <IconButton onClick={handleLikePost} disabled={isLoading} size="small" aria-label="Like">
                            {liked
                                ? <FavoriteIcon fontSize="small" color="error"/>
                                : <FavoriteBorderIcon fontSize="small" />}
                        </IconButton>
                        <span>{postStat?.likes_count ?? 0}</span>
                </span>
                <span className={styles.actionItem}>
                    <IconButton size="small" aria-label="Comments">
                        <ChatBubbleOutlineIcon fontSize="small"/>
                    </IconButton>
                    <span>0</span>
                </span>
                <IconButton size="small" aria-label="Save">
                    <BookmarkBorderIcon fontSize="small"/>
                </IconButton>
                <span className={styles.actionsSpacer}/>
                <IconButton size="small" aria-label="Share">
                    <IosShareIcon fontSize="small"/>
                </IconButton>
                <IconButton size="small" aria-label="More">
                    <MoreHorizIcon fontSize="small"/>
                </IconButton>
            </div>

            {images && (
                <img className={styles.image} src={images.url} alt={title}/>
            )}

            <div className={styles.cardMainContent}>
                <CardContent>
                    <div dangerouslySetInnerHTML={{ __html: text }}></div>
                </CardContent>
            </div>
        </Card>
    );
}
