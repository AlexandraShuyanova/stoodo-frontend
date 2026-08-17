import styles from "./RegisterForm.module.scss"
import {Button} from "@/components/UI/Button/Button";
import {TextField} from "@/components/UI/TextField/TextField";
import React from "react";
import {RegisterRequest, useRegisterMutation} from "../../../../services/StoodoService";
import { useDispatch } from 'react-redux'
import {setCredentials} from "../../../../store/authSlice";

interface RegisterFormProps
{
    onModeChange: (mode: "login" | "register") => void;
    onSuccess: () => void;

}

export const RegisterForm = ({ onModeChange, onSuccess }: RegisterFormProps) => {

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
            const user = await register(formState).unwrap();
            dispatch(setCredentials(user));
            onSuccess();
            //window.location.reload()

        } catch (err) {
            dispatch(setCredentials({access_token:null}));
        }
    }

    return (
        <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.heading}>
                <h1>Create your account</h1>
                <p>Join Stoodo and become part of the student community.</p>
            </div>
            <div className={styles.fields}>
                <TextField className={styles.input} name="firstName" onChange={handleChange}
                           type="text" placeholder="Enter first name" />
                <TextField className={styles.input} name="lastName" onChange={handleChange}
                           type="text" placeholder="Enter last name" />
                <TextField className={styles.input} name="email" onChange={handleChange}
                           type="email" placeholder="Enter email" />
                <TextField className={styles.input} name="username" onChange={handleChange}
                           type="text" placeholder="Enter username" />
                <TextField className={styles.input} name="password" onChange={handleChange}
                           type="password" placeholder="Enter password" />
            </div>
            <div className={styles.checkbox}>
                <input
                    type='checkbox'
                    id='saveSession'
                    name='saveSession'
                    onChange={handleChange}
                />
                <label htmlFor="saveSession">Keep me signed in</label>
            </div>
            <Button className={styles.btn} variant='primary' size='small' type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign up"}
            </Button>
            <p className={styles.switchMode}>Already have an account?{" "}
                <button type="button" onClick={() => onModeChange("login")}>Sign in</button>
            </p>
        </form>
    )}
