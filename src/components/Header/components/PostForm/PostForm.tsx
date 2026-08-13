import styles from "./PostForm.module.scss"
import {TextField} from "@/components/UI/TextField/TextField";
import {Button} from "@/components/UI/Button/Button";
import React, {useEffect, useState} from "react";
import {
    CreatePostRequest,
    useCreatePostContentMutation,
    useCreatePostMutation,
    useGetTopicsListQuery,
    useUploadImageMutation
} from "../../../../services/StoodoService";
import dynamic from "next/dynamic";

const HtmlEditor = dynamic(() => import("@/components/UI/HtmlEditor/HtmlEditor"), { ssr: false });

export const PostForm = () => {
    const [file, setFile] = useState<any|null>(null)
    const [htmlEditorLoaded, setHtmlEditorLoaded] = useState<boolean>(false);
    const [postContent, setPostContent] = useState('')

    const [createPost, { isLoading: isLoadingPostCreate }] = useCreatePostMutation()
    const [createPostContent, { isLoading: isLoadingPostContentCreate }] = useCreatePostContentMutation()
    const [uploadImage, { isLoading: isLoadingUploadImage }] = useUploadImageMutation()

    const {data, isFetching} = useGetTopicsListQuery('');

    const [formState, setFormState] = React.useState<CreatePostRequest>({
        title: '',
        slug: '',
        image: '',
        description: '',
        topic: '',
    })

    useEffect(() => {
        setHtmlEditorLoaded(true);
    }, []);

    const handleChangePostForm = ({
                              target: { name, value},
                          }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (name == 'tagsList')
        {
            setFormState((prev) => ({...prev, [name]: value.split('#')}))
        }
        else if (name == 'topic') {
            data?.content?.map(item => {
                if (item.topic == value) {
                    setFormState((prev) => ({...prev, [name]: item.id}))
                }
            })
        }
        else
            setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangePostContent = (data: string) =>
    {
        setPostContent(data);
    }

    const handleCreatePost = async() => {
        if (isLoadingPostCreate || isLoadingPostContentCreate || isLoadingUploadImage) {
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

            let postId = post.id;

            if (postId)
            {
                const postContentRes = await createPostContent({text:postContent, postId}).unwrap();
            }

            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    }
    return(
        <form className={styles.form} onSubmit={handleCreatePost} action="javascript:void(0);">
            <div className={styles.postContent}>
                <select
                    className={styles.topicsCB}
                    name='topic'
                    onChange={handleChangePostForm}
                >
                    {data?.content?.map(topic =>
                        <option key={topic.id}>
                            {topic.topic}
                        </option>
                    )}
                </select>
                <TextField
                    className={styles.input}
                    name='title'
                    type="text"
                    placeholder="Title"
                    onChange={handleChangePostForm}
                />
                <TextField
                    className={styles.input}
                    name='description'
                    type="text"
                    placeholder="Description"
                    onChange={handleChangePostForm}
                />
                <TextField
                    className={styles.input}
                    name='slug'
                    type="text"
                    placeholder="Slug"
                    onChange={handleChangePostForm}
                />
                <div className={styles.textarea}>
                    <HtmlEditor
                        onChange={handleChangePostContent}
                        editorLoaded={htmlEditorLoaded}
                        name={"PostContentData"}
                        value={postContent}
                    />
                </div>
                <input className={styles.imageBtn} type="file" onChange={event => setFile(event.target?.files)}/>

            </div>
            <Button className={styles.publishBtn} onClick={handleCreatePost} >
                Publish
            </Button>
        </form>
    )
}