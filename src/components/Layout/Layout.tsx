import {Header} from "@/components/Header/Header"
import {Footer} from "@/components/Footer/Footer"
import React, {FC, PropsWithChildren, useState} from "react";
import {SideBar} from "@/components/SideBar/SideBar"
import styles from "./Layout.module.scss";
import {ModalWindow} from "@/components/UI/ModalWindow/ModalWindow";
import {AuthForm} from "@/components/Header/components/AuthForm/AuthForm";
import {PostForm} from "@/components/Header/components/PostForm/PostForm";
import {RegisterForm} from "@/components/Header/components/RegisterForm/RegisterForm";
import {useGetTopicsQuery} from "../../services/StoodoService";


export const Layout: FC<PropsWithChildren<{}>> = ({children}) => {

    const[loginModal, setLoginModal] = useState(false)
    const[createPostModal, setCreatePostModal] = useState(false)
    const[isLeftBarVisible, setLeftBarVisibility] = useState(true)
    const [mode, setMode] = useState<"login" | "register">("login");
    const {data, isFetching} = useGetTopicsQuery();
    const updateLoginModal = (value:boolean) =>
    {
        setLoginModal(value);
    }
    const updateCreatePostModal = (value:boolean) =>
    {
        setCreatePostModal(value);
    }
    const updateLeftSideBar = (value:boolean) =>
    {
        setLeftBarVisibility(value);
    }

    return (
        <div className={styles.container}>
            <ModalWindow className={styles.loginModal} visible={loginModal} setVisible={setLoginModal}>
                {mode === "login"
                    ?
                    <AuthForm onModeChange={setMode} onSuccess={() => setLoginModal(false)} />
                    :
                    <RegisterForm onModeChange={setMode} onSuccess={() => setLoginModal(false)}/>
                }
            </ModalWindow>
            <ModalWindow className={styles.createPostModal} visible={createPostModal} setVisible={setCreatePostModal}>
                <PostForm onSuccess={() => setCreatePostModal(false)}/>
            </ModalWindow>
            <Header updateLoginModal={updateLoginModal} onModeChange={setMode} updateCreatePostModal={updateCreatePostModal} updateLeftSideBar={updateLeftSideBar}/>
            <div className={styles.main}>
                <SideBar className={styles.leftSideBar} visible={isLeftBarVisible} setVisible={setLeftBarVisibility}/>
                <main className={styles.postList}>
                    {children}
                </main>
                <div className={styles.rightSideBar}>
                    <div className={styles.topics}>
                        <div className={styles.topicsHeader}>
                            <div className={styles.topicTitle}>Topics</div>

                            <button className={styles.viewAll}>
                                View all
                            </button>
                        </div>

                        <div className={styles.topicsGrid}>
                            {data?.map((topic) => (
                                <button
                                    key={topic.id}
                                    className={styles.topic}
                                    style={{ backgroundColor: topic.color }}
                                >
                                    {topic.topic}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
