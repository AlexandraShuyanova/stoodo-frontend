import {Header} from "@/components/Header/Header"
import {Footer} from "@/components/Footer/Footer"
import React, {FC, PropsWithChildren, useState} from "react";
import {SideBar} from "@/components/SideBar/SideBar"
import styles from "./Layout.module.scss";
import {ModalWindow} from "@/components/UI/ModalWindow/ModalWindow";
import {AuthForm} from "@/components/Header/components/AuthForm/AuthForm";
import {PostForm} from "@/components/Header/components/PostForm/PostForm";
import {RegisterForm} from "@/components/Header/components/RegisterForm/RegisterForm";


export const Layout: FC<PropsWithChildren<{}>> = ({children}) => {

    const[loginModal, setLoginModal] = useState(false)
    const[createPostModal, setCreatePostModal] = useState(false)
    const[isLeftBarVisible, setLeftBarVisibility] = useState(true)
    const [mode, setMode] = useState<"login" | "register">("login");
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
                <PostForm/>
            </ModalWindow>
            <Header updateLoginModal={updateLoginModal} updateCreatePostModal={updateCreatePostModal} updateLeftSideBar={updateLeftSideBar}/>
            <div className={styles.main}>
                <SideBar className={styles.leftSideBar} visible={isLeftBarVisible} setVisible={setLeftBarVisibility}/>
                <main className={styles.postList}>
                    {children}
                </main>
                <div className={styles.rightSideBar}></div>
                {/* <SideBar className={styles.rightSideBar}/> */}
            </div>
            <Footer />
        </div>
    );
};
