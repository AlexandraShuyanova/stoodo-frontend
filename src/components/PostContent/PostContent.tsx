import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './PostContent.module.scss';
import {PostContentResponse} from "@/types/IPost";
import {FC} from "react";

interface PostContentProps{
    item: IPost;
}

export const PostContent = ({item}: PostContentProps) => {

    const {title, images, posts_content, owner, created_at} = item;
    const text = posts_content[0]?.text ?? "";

    return (
        <Card className={styles.postContent}>
            {images && <CardMedia component="img" image={images.url} alt={title}/>}
            <div className={styles.cardMainContent}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {title}
                    </Typography>
                    <div dangerouslySetInnerHTML={{ __html: text }}></div>
                </CardContent>
            </div>
        </Card>
    );
}
