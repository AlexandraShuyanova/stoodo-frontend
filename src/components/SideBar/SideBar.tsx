import {FC, useEffect, useState} from 'react'
import classNames from 'classnames'
import styles from "./SideBar.module.scss";
import * as React from 'react';
import Link from 'next/link';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Typography from '@mui/material/Typography';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

interface SideBarProps {
    className?: string
    visible?: boolean
    setVisible:(vis:boolean) => any;
}

const menuItems = [
    { label: 'Home',       href: '/',           icon: HomeOutlinedIcon },
    { label: 'Library',    href: '/library',    icon: BookmarksOutlinedIcon,      authOnly: true },
    { label: 'Popular',    href: '/popular',    icon: LocalFireDepartmentOutlinedIcon },
    { label: 'Favourites', href: '/favourites', icon: FavoriteBorderOutlinedIcon, authOnly: true },
    { label: 'Drafts',     href: '/drafts',     icon: DescriptionOutlinedIcon,    authOnly: true },
];

export const SideBar = ({className, visible, setVisible}: SideBarProps) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    // the token lives in localStorage, so the server always renders the guest menu;
    // show the auth-only items only after mount, otherwise hydration doesn't match
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const rootClasses = [styles.sidebar, className]

    if(!visible)
    {
        rootClasses.push(styles.inactive)
    }

    return (
        <div className={classNames(rootClasses)}>
            <List className={styles.list}>
                {menuItems
                    .filter(item => !item.authOnly || (mounted && isAuth))
                    .map(({label, href, icon: Icon}) => (
                        <ListItem key={href} disablePadding>
                            <Link href={href} passHref>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={label} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
            </List>
        </div>
    );
};
