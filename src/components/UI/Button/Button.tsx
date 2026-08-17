import React, {ButtonHTMLAttributes, FC, forwardRef, ReactNode} from "react";
import styles from "./Button.module.scss";
import cn from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    startIcon?: ReactNode;
    variant?: 'primary' | 'ghost';
    size?: 'big' | 'small';
}
export const Button = ({children, variant, size, startIcon, className, ...props} : ButtonProps) =>{
    return(
        <button {...props} className={cn(className, styles.btn, {
            [styles['primary']]: variant === 'primary',
            [styles['small']]: size === 'small',
            [styles['big']]: size === 'big',
        })}
        >
            {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
            {children}
        </button>
    )
};
