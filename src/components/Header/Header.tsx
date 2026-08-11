import styles from './Header.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import {Search} from "./components/Search/Search";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/UI/Button/Button";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useGetAuthUserQuery} from "../../services/StoodoService";
import {setCredentials} from "../../store/authSlice";
import {useDispatch} from 'react-redux'

interface HeaderProps
{
    updateLoginModal:(value: boolean) => void,
    updateCreatePostModal:(value: boolean) => void,
    updateLeftSideBar:(value: boolean) => void
}
export const Header = ({updateLoginModal, updateCreatePostModal, updateLeftSideBar}: HeaderProps) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const { data: authUser } = useGetAuthUserQuery('', { skip: !isAuth });
    const[leftSideBar, setLeftSideBar] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setCredentials({ access_token: null }));
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.sectionLeft}>
                    <Button className={styles.burger} onClick={() => {setLeftSideBar(!leftSideBar); updateLeftSideBar(!leftSideBar)}}>
                        <MenuIcon/>
                    </Button>
                    <Link className={styles.link} href='/'>
                        STOODO
                    </Link>
                </div>
                <div className={styles.sectionCenter}>
                    <Search />
                    <Button className={styles.createBtn} onClick={() => updateCreatePostModal(true)}>
                        <img src={"/images/plus-light.svg"} width="20" height="20"/>
                        Create
                    </Button>
                </div>
                <div className={styles.sectionRight}>
                    <Button className={styles.notificationsBtn}>
                        <img width="28" height="28"/>
                    </Button>
                    {isAuth ?
                        <div className={styles.profile}>
                            <Button className={styles.personBtn}
                                    onClick={() => setIsMenuOpen(prev => !prev)}
                            >
                                <p>{authUser?.username}</p>
                            </Button>
                            {isMenuOpen && (
                                <div className={styles.menu}>
                                    <Button>Profile</Button>
                                    <Button>Settings</Button>
                                    <Button onClick={handleLogout}>Log Out</Button>
                                </div>
                            )}
                        </div>

                    :
                        <Button className={styles.personBtn} onClick={() => updateLoginModal(true)}>
                            <img width="28" height="28"/>
                            <p>Log In</p>
                        </Button>
                    }
                </div>
            </div>
        </header>
    );
};

