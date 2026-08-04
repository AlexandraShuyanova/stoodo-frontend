import React, {FC, PropsWithChildren, useState} from "react";
import classNames from "classnames";
import styles from "./ModalWindow.module.scss";
import {Button} from "@/components/UI/Button/Button";

interface ModalWindowProps{
    children: React.ReactNode;
    visible: boolean;
    setVisible:(vis:boolean) => any;
    className: string;
}
export const ModalWindow: FC<ModalWindowProps> = ({children, visible,
                                                      setVisible, className}) => {

    const [mode, setMode] = useState<"login" | "register">("login");
    const rootClasses = [styles.modal]
    const backgroundClasses = [styles.darkBackground]

    if (visible)
    {
        rootClasses.push(styles.active)
        rootClasses.push(className)
        backgroundClasses.push(styles.active)
    }

    return(
        <div>
            <div className={classNames(rootClasses)}>
                <Button className={styles.closeBtn} onClick={() => setVisible(false)}>
                    <img width="24" height="24"/>
                </Button>
                {children}
            </div>
            <div className={classNames(backgroundClasses)}>
            </div>
        </div>
    )
}
