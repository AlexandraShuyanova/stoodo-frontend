import styles from './Header.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import {Search} from "./components/Search/Search";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/UI/Button/Button";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useGetAuthUserQuery} from "../../services/StoodoService";
import {setCredentials} from "../../store/authSlice";
import {useDispatch} from 'react-redux'
import {IconButton} from "@/components/UI/IconButton/IconButton";

interface HeaderProps
{
    updateLoginModal:(value: boolean) => void,
    updateCreatePostModal:(value: boolean) => void,
    updateLeftSideBar:(value: boolean) => void,
    onModeChange: (mode: "login" | "register") => void;
}
export const Header = ({updateLoginModal, updateCreatePostModal, updateLeftSideBar, onModeChange}: HeaderProps) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const { data: authUser } = useGetAuthUserQuery('', {
        skip: !isAuth
    });
    const[leftSideBar, setLeftSideBar] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setCredentials({ access_token: null }));
        setIsMenuOpen(false);
    };

    const onAuthClicked = (mode: "login" | "register") => {
        updateLoginModal(true);
        onModeChange(mode);
    }

    return (
        <header className={styles.header}>
            <div className={styles.sectionLeft}>
                <IconButton className={styles.burger} variant='ghost' onClick={() => {setLeftSideBar(!leftSideBar); updateLeftSideBar(!leftSideBar)}}>
                    <MenuIcon/>
                </IconButton>
                <Link className={styles.link} href='/'>
                    STOODO
                </Link>
            </div>
            <div className={styles.sectionCenter}>
                <Search />
            </div>
            {authUser === undefined ?
                <div className={styles.sectionRight}>
                    <Button className={styles.loginBtn} variant='ghost' size='small' onClick={() => onAuthClicked('login')}>
                        Log in
                    </Button>
                    <Button className={styles.signupBtn} variant='primary' size='small' onClick={() => onAuthClicked('register')}>
                        Sign up
                    </Button>
                </div>
            :
                <div className={styles.sectionRight}>
                    <Button className={styles.createBtn} variant='primary' size='big' onClick={() => updateCreatePostModal(true)}>
                        <AddIcon className={styles.addIcon}/>
                        Create
                    </Button>
                    <IconButton className={styles.notificationsBtn} variant='pink'>
                        <NotificationsNoneIcon/>
                    </IconButton>
                    <div className={styles.profile}>
                        <Button
                            className={styles.profileBtn}
                            startIcon={<AccountCircleIcon />}
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
                </div>
            }
        </header>
    );
};

