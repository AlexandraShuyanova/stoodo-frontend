import React, {FC} from "react";
import classNames from "classnames";
import styles from "./ModalWindow.module.scss";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ModalWindowProps{
    children: React.ReactNode;
    visible: boolean;
    setVisible:(vis:boolean) => any;
    className: string;
}
export const ModalWindow: FC<ModalWindowProps> = ({children, visible,
                                                      setVisible, className}) => {
    if (!visible) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div
                className={classNames(styles.dialog, className)}
                role="dialog"
                aria-modal="true"
            >
                <IconButton className={styles.closeBtn} onClick={() => setVisible(false)}>
                    <CloseIcon />
                </IconButton>
                {children}
            </div>
            <div className={styles.darkScreen} onClick={() => setVisible(false)} />
        </div>
    )
}
