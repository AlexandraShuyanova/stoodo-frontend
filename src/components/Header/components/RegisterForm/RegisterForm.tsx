import styles from "./RegisterForm.module.scss"
import {Button} from "@/components/UI/Button/Button";
import {TextField} from "@/components/UI/TextField/TextField";
import React, {useState} from "react";
import {
    RegisterRequest,
    useRegisterMutation
} from "../../../../services/StoodoService";
import { useDispatch } from 'react-redux'
import {setCredentials} from "../../../../store/authSlice";

export const RegisterForm = ({ onModeChange }: { onModeChange: (mode: "login" | "register") => void }) => {

    const dispatch = useDispatch()

    const [register, { isLoading }] = useRegisterMutation()

    const [formState, setFormState] = React.useState<RegisterRequest>({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        saveSession: false,
    })

    const handleChange = ({
                              target: { name, value, checked=false },
                          }: React.ChangeEvent<HTMLInputElement>) => {
        if (name=="saveSession")
            setFormState((prev) => ({ ...prev, [name]: checked }))
        else
            setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLoading) {
            return
        }

        try {
            const user = await register(formState).unwrap()
            dispatch(setCredentials(user))
            window.location.reload()

        } catch (err) {
            dispatch(setCredentials({access_token:null}))
        }
    }

    return (
        <form className={styles.form} onSubmit={handleRegister}>
            <h1>STOODO</h1>
            <TextField
                className={styles.input}
                name='firstName'
                onChange={handleChange}
                type='text'
                placeholder='Enter first name'
            />
            <TextField
                className={styles.input}
                name='lastName'
                onChange={handleChange}
                type='text'
                placeholder='Enter last name'
            />
            <TextField
                className={styles.input}
                name='email'
                onChange={handleChange}
                type='text'
                placeholder='Enter email'
            />
            <TextField
                className={styles.input}
                name='username'
                onChange={handleChange}
                type='text'
                placeholder='Enter username'
            />
            <TextField
                className={styles.input}
                name='password'
                onChange={handleChange}
                type='password'
                placeholder='Enter password'
            />
            <div className={styles.checkbox}>
                <input
                    type='checkbox'
                    id='saveSession'
                    name='saveSession'
                    onChange={handleChange}
                />
                <label htmlFor="saveSession">Save session</label>
            </div>
            <Button className={styles.btn} type="submit">
                Sign Up
            </Button>
            <div>
                <div>Have an account?</div>
                <span onClick={() => onModeChange("login")}>
                    Log In
                </span>
            </div>
        </form>
    )}