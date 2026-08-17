import React, {ButtonHTMLAttributes, FC, ReactNode} from "react";
import styles from "./IconButton.module.scss";
import cn from 'classnames';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    variant?: 'pink' | 'ghost';
}
export const IconButton = ({children, variant='ghost', className, ...props} : IconButtonProps) =>{
    return(
        <button {...props} className={cn(className, styles.btn, {
            [styles['pink']]: variant === 'pink',
        })}
        >
            {children}
        </button>
    )
};