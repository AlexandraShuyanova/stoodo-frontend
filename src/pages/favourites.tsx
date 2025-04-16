import type { NextPage } from 'next'
import Head from 'next/head'
import {Favourites} from '@/components/screens/Favourites/Favourites'
import {Layout} from '@/components/Layout/Layout'
import React from "react";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Stoodo - Favourites</title>
            </Head>
            <Layout>
                <Favourites/>
            </Layout>
        </>
    )
}
export default Index;