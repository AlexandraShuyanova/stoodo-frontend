import {Header} from "@/components/Header/Header"
import {Footer} from "@/components/Footer/Footer"
import React, {FC, PropsWithChildren, useState} from "react";
import {SideBar} from "@/components/SideBar/SideBar"
import styles from "./Layout.module.scss";
import {ModalWindow} from "@/components/UI/ModalWindow/ModalWindow";
import {AuthForm} from "@/components/Header/components/AuthForm/AuthForm";
import {PostForm} from "@/components/Header/components/PostForm/PostForm";
import {RegisterForm} from "@/components/Header/components/RegisterForm/RegisterForm";
import {TopicsSidebar} from "@/components/TopicsSidebar/TopicsSidebar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {closeAuthModal, openAuthModal, setAuthMode} from "../../store/authModalSlice";

interface LayoutProps {
    children: React.ReactNode;
    hideRightSidebar?: boolean;
}

export const Layout = ({children, hideRightSidebar = true} : LayoutProps) => {

    const[loginModal, setLoginModal] = useState(false)
    const[createPostModal, setCreatePostModal] = useState(false)
    const[isLeftBarVisible, setLeftBarVisibility] = useState(true)
    const modal = useSelector(
        (state: RootState) => state.modal.authModal
    );

    const dispatch = useDispatch();
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
            <ModalWindow className={styles.loginModal} visible={modal.open} setVisible={(e) => dispatch(closeAuthModal())}>
                {modal.mode === "login"
                    ?
                    <AuthForm onModeChange={(mode) =>dispatch(setAuthMode(mode))} onSuccess={() => dispatch(closeAuthModal())} />
                    :
                    <RegisterForm onModeChange={(mode) => dispatch(setAuthMode(mode))} onSuccess={() => dispatch(closeAuthModal())}/>
                }
            </ModalWindow>
            <ModalWindow className={styles.createPostModal} visible={createPostModal} setVisible={setCreatePostModal}>
                <PostForm onSuccess={() => setCreatePostModal(false)}/>
            </ModalWindow>
            <Header openLoginModal={() => dispatch(openAuthModal({mode: modal.mode}))} onModeChange={(mode) => dispatch(setAuthMode(mode))} updateCreatePostModal={updateCreatePostModal} updateLeftSideBar={updateLeftSideBar}/>
            <div className={styles.main}>
                <SideBar className={styles.leftSideBar} visible={isLeftBarVisible} setVisible={setLeftBarVisibility}/>
                <main className={styles.postList}>
                    {children}
                </main>
                {!hideRightSidebar && <TopicsSidebar/>}
            </div>
            <Footer />
        </div>
    );
};
