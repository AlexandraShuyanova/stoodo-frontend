import {IUser} from "./IUser"
export interface IPost {
    id: string;
    title: string;
    slug: string;

    image_id: string | null;
    owner_id: string | null;

    is_published: boolean;

    created_by: string | null;
    created_at: string | null;
    last_modified_by: string | null;
    last_modified_at: string | null;

    images: IImage | null;
    posts_content: IPostContent[];

    owner: {
        id: string;
        first_name: string;
        last_name: string;
    } | null;
}

export interface IImage {
    id: string;
    key: string;
    url: string;

    file_name: string | null;
    mime_type: string | null;
    size: number | null;

    created_by: string | null;
    created_at: string | null;
    last_modified_by: string | null;
    last_modified_at: string | null;
}

export interface IPostContent {
    id: string;
    version: number;
    text: string;
    post_id: string;
    is_current_version: boolean;

    created_by: string | null;
    created_at: string | null;
    last_modified_by: string | null;
    last_modified_at: string | null;
}

export interface ITopic {
    id: string,
    topic: string,
    color: string,
}

export interface ITag {
    id: string,
    tag: string,
}
export interface UserPostInteraction {
    liked: boolean,
    opened: boolean,
    viewed: boolean,
}


export interface PostStat {
    likes_count: number,
    opened_count: number,
    views_count: number,
}
