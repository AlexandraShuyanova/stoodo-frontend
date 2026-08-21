import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import {IPosts} from "@/types/IPosts"
import authFetchBase from "./authFetchBase";
import {IPost, IImage, ITopic, UserPostInteraction, PostContentResponse, PostStat} from "@/types/IPost";
import {IUser} from "@/types/IUser";

export interface UserResponse {
    access_token: string
}

export interface LoginRequest {
    email: string,
    password: string,
    saveSession: boolean
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    saveSession: boolean
}

export interface CreatePostRequest {
    title: string,
    image: string,
    content: string
}

export const stoodoAPI = createApi({
    reducerPath: 'stoodoAPI',
    baseQuery: authFetchBase,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (build) => ({
        getPosts: build.query<IPosts, any>({
            query: () => `post/posts`,
            providesTags: ['Posts'],
        }),
        getTopics: build.query<ITopic[], any>({
            query:() => `topic/topics`
        }),
        getListNotPublished: build.query<IPosts, number>({
            query: page => `post/list_not_published?page=${page}&size=10`
        }),
        getUserPostInteraction: build.query<UserPostInteraction, string> ({
            query: id => `post/user_interaction_by_post/${id}`
        }),
        getPostContentById: build.query<PostContentResponse, string>({
            query: id=>`post/get_content_by_post_id/${id}`
        }),
        getPostContentBySlug: build.query<PostContentResponse, string>({
            query: slug=>`post/get_content_by_slug/${slug}`
        }),
        getPostStatById: build.query<PostStat, string>({
            query: id=>`post/post_stat/${id}`
        }),
        getPostBySlug: build.query<IPost, string | string[] | undefined>({
            query: slug => `post/get_by_slug/${slug}`
        }),
        getAuthUser: build.query<IUser, any>({
            query: () => `auth/user_info`
        }),
        register: build.mutation<UserResponse, RegisterRequest>({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: build.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        createPost: build.mutation<any, CreatePostRequest>({
            query:(credentials) => ({
                url: 'post/create',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Posts']
        }),
        uploadImage: build.mutation<IImage, FormData> ({
            query: (credentials) => ({
                url: 'image/upload',
                method: 'POST',
                body: credentials,
            })
        }),
        likePost: build.mutation<UserPostInteraction, {id:string, isLiked:boolean}> ({
            query: ({id, isLiked}) => ({
                url: `post/like_post/${id}?isLiked=${isLiked}`,
                method: 'POST',
            })
        }),
        protected: build.mutation<{ message: string }, void>({
            query: () => 'protected',
        }),
    }),
});

export const { useGetPostsQuery, useGetListNotPublishedQuery,
    useGetUserPostInteractionQuery, useGetTopicsQuery,
    useGetPostContentByIdQuery, useGetPostStatByIdQuery,
    useGetPostBySlugQuery, useLoginMutation, useRegisterMutation,
    useProtectedMutation, useCreatePostMutation,
    useUploadImageMutation, useLikePostMutation,  useGetAuthUserQuery,
    useGetPostContentBySlugQuery,
    util: { getRunningQueriesThunk }} = stoodoAPI;

//export for SSR
export const { getPostBySlug, getPostContentBySlug } = stoodoAPI.endpoints;

