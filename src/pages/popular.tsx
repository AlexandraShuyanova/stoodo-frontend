import type { NextPage } from 'next'
import Head from 'next/head'
import {Popular} from '@/components/screens/Popular/Popular'
import {Layout} from '@/components/Layout/Layout'
import React from "react";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Stoodo - Popular</title>
            </Head>
            <Layout>
                <Popular/>
            </Layout>
        </>
    )
}
export default Index;