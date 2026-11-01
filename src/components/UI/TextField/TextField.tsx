import React, {ChangeEvent, FC, useState} from 'react'
import classNames from 'classnames'
import styles from './TextField.module.scss';
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface TextFieldProps {
    className?: string,
    value?: string | number,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    name?: string,
    type?: string,
    error?: boolean,
    label?: string,
    placeholder?: string,
}

export const TextField: FC<TextFieldProps> = ({className, label,
                                                  type, error, ...props}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleClickShowPassword = () => setPasswordVisible((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <label className={classNames(
            type === 'password' ? styles.labelPassword : styles.label,
            error && styles.error,
            className)}
        >
            {label && <span className={styles.caption}>{label}</span>}
            <input
                className={classNames(
                    styles.textField,
                    type === 'password' && styles.passwordInput,
                )}
                type={type === 'password' ? (isPasswordVisible ? 'text' : type) : type}
                {...props}
            />
            {type === 'password' &&
                <IconButton
                    className={styles.eyeIconButton}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                >
                    { isPasswordVisible ? <VisibilityOff /> : <Visibility /> }
                </IconButton>
            }
        </label>
    )
}
