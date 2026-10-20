import {NextPage} from "next";
import {useRouter} from "next/router";
import {Layout} from "@/components/Layout/Layout";
import {useGetPostBySlugQuery, getPostBySlug, getRunningQueriesThunk} from "../../services/StoodoService";
import {Post} from "@/components/screens/Post/Post";
import {wrapper} from "../../store/store";
import Head from "next/head";
const PostPage: NextPage = () => {

    const {query: {slug}} = useRouter();
    const {data: post} = useGetPostBySlugQuery(typeof slug === "string" ? slug : skipToken);
    const text = (post?.posts_content[0]?.text ?? "").replace(/<[^>]*>/g, "")
    return (
        <>
            <Head>
                <title>{`${post?.title ?? ""} — Stoodo`}</title>
                <meta name="description" content={text.slice(0, 160)} />
                <meta property="og:title" content={post?.title ?? ""} />
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
            store.dispatch(getPostBySlug.initiate(slug))
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {},
        };
    }
);
