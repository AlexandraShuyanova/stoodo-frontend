import type { NextPage } from 'next'
import Head from 'next/head'
import {Events} from '@/components/screens/Events/Events'
import {Layout} from '@/components/Layout/Layout'
import React from "react";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Stoodo - Events</title>
            </Head>
            <Layout>
                <Events/>
            </Layout>
        </>
    )
}
export default Index;