import {NextPage} from "next";
import {Layout} from "@/components/Layout/Layout";
import {getPostContentBySlug, getRunningQueriesThunk} from "../../services/StoodoService";
import {Post} from "@/components/screens/Post/Post";
import {wrapper} from "../../store/store";
import Head from "next/head";
const PostPage: NextPage = () => {

    return (
        <>
            <Head>
                <title>Stoodo - Post</title>
            </Head>
            <Layout>
                <Post/>
            </Layout>
        </>
    )
}

export default PostPage;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const slug = context.params?.slug;
        if (typeof slug === "string") {
            store.dispatch(getPostContentBySlug.initiate(slug))
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {},
        };
    }
);
