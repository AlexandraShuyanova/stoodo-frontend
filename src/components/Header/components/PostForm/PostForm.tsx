import styles from "./PostForm.module.scss"
import {TextField} from "@/components/UI/TextField/TextField";
import {Button} from "@/components/UI/Button/Button";
import React, {useEffect, useState} from "react";
import {
    CreatePostRequest,
    useCreatePostMutation,
    useGetTopicsQuery,
    useUploadImageMutation
} from "../../../../services/StoodoService";
import dynamic from "next/dynamic";

const HtmlEditor = dynamic(() => import("@/components/UI/HtmlEditor/HtmlEditor"), { ssr: false });

export const PostForm = () => {
    const [file, setFile] = useState<any|null>(null);
    const [htmlEditorLoaded, setHtmlEditorLoaded] = useState<boolean>(false);
    const [postContent, setPostContent] = useState('');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [createPost, { isLoading: isLoadingPostCreate }] = useCreatePostMutation();
    const [uploadImage, { isLoading: isLoadingUploadImage }] = useUploadImageMutation();

    const {data, isFetching} = useGetTopicsQuery();

    const [formState, setFormState] = React.useState<CreatePostRequest>({
        title: '',
        image: '',
        content: ''
    })

    useEffect(() => {
        setHtmlEditorLoaded(true);
    }, []);

    const handleChangePostForm = ({
                              target: { name, value},
                          }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangePostContent = (content: string) => {
        setFormState((prev) => ({
            ...prev,
            content,
        }));
    };

    const handleSelectTopic = (topicId: string) => {
        setSelectedTopic(topicId);
    };

    const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLoadingPostCreate || isLoadingUploadImage) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file[0], file[0].name);

            const image = await uploadImage(formData).unwrap();

            let id = image.id;

            if (!id)
                return;

            const post = await createPost({
                ...formState,
                image: image.id,
            }).unwrap();

        } catch (err) {
            console.log(err);
        }
    }
    return(
        <form className={styles.form} onSubmit={handleCreatePost}>
            <div className={styles.titleTitle}>Title</div>
            <TextField
                className={styles.input}
                name="title"
                type="text"
                placeholder="Enter a catchy title..."
                value={formState.title}
                onChange={handleChangePostForm}
            />

            <div className={styles.topicsBlock}>
                <div className={styles.topicTitle}>Topic</div>
                <div className={styles.topicsList}>
                    {data?.map((topic) => {
                        const isActive = selectedTopic === topic.id;

                        return (
                            <button
                                key={topic.id}
                                type="button"
                                className={`${styles.topicChip} ${isActive ? styles.topicChipActive : ''}`}
                                onClick={() => handleSelectTopic(topic.id)}
                            >
                                {topic.topic}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={styles.postEditor}>
                <HtmlEditor
                    editorLoaded={htmlEditorLoaded}
                    value={formState.content}
                    onChange={handleChangePostContent}
                />
            </div>

            <div className={styles.actionsBlock}>
                <div className={styles.imageTitle}>Attach image(optional)</div>
                    <div className={styles.actionsList}>
                        <input className={styles.imageBtn} type="file" onChange={event => setFile(event.target?.files)}/>
                        <Button className={styles.publishBtn} variant='primary' size='big' type="submit" >
                            Publish
                        </Button>
                    </div>
            </div>
        </form>
    )
}
