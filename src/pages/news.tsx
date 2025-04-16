import type { NextPage } from 'next'
import Head from 'next/head'
import {News} from '@/components/screens/News/News'
import {Layout} from '@/components/Layout/Layout'
import React from "react";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Stoodo - News</title>
            </Head>
            <Layout>
                <News/>
            </Layout>
        </>
    )
}
export default Index;