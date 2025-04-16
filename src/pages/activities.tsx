import type { NextPage } from 'next'
import Head from 'next/head'
import {Activities} from '@/components/screens/Activities/Activities'
import {Layout} from '@/components/Layout/Layout'
import React from "react";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Stoodo - Activities</title>
            </Head>
            <Layout>
                <Activities/>
            </Layout>
        </>
    )
}
export default Index;