import styles from "./AuthForm.module.scss"
import {Button} from "@/components/UI/Button/Button";
import {TextField} from "@/components/UI/TextField/TextField";
import React from "react";
import {LoginRequest, useLoginMutation} from "../../../../services/StoodoService";
import {useDispatch} from 'react-redux'
import {setCredentials} from "../../../../store/authSlice";


interface AuthFormProps
{
    onModeChange: (mode: "login" | "register") => void;
    onSuccess: () => void;

}
export const AuthForm = ({ onModeChange, onSuccess }: AuthFormProps) => {

    const dispatch = useDispatch()

    const [login, {isLoading}] = useLoginMutation()

    const [formState, setFormState] = React.useState<LoginRequest>({
        email: '',
        password: '',
        saveSession: false,
    })

    const [error, setError] = React.useState<string | null>(null);

    const [fieldErrors, setFieldErrors] = React.useState({
        email: false,
        password: false,
    });

    const handleChange = ({
                              target: {name, value, checked = false},
                          }: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setFieldErrors({...fieldErrors, [name]: false});

        if (name == "saveSession")
            setFormState((prev) => ({...prev, [name]: checked}))
        else
            setFormState((prev) => ({...prev, [name]: value}))
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLoading) {
            return
        }

        if (!formState.email || !formState.password) {
            setFieldErrors({
                email: !formState.email,
                password: !formState.password,
            });
            setError("All fields are required");
            return;
        }

        try {
            const user = await login(formState).unwrap()
            console.log(user);
            dispatch(setCredentials(user))
            onSuccess();

        } catch (err: any) {
            setError(err?.data?.error || "Something went wrong");
            dispatch(setCredentials({access_token: null}));
        }
    }

    return (
        <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.heading}>
                <h1>Welcome back</h1>
                <p>Sign in to continue to Stoodo.</p>
            </div>
            <div className={styles.fields}>
                <TextField
                    className={styles.input}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    error={fieldErrors.email}
                    placeholder="Enter email"
                />
                <TextField
                    className={styles.input}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    error={fieldErrors.password}
                    placeholder="Enter password"
                />
            </div>
            {error && (
                <p role="alert" className={styles.error}>
                    {error}
                </p>
            )}
            <div className={styles.checkbox}>
                <input
                    type="checkbox"
                    id="saveSession"
                    name="saveSession"
                    onChange={handleChange}
                />
                <label htmlFor="saveSession">Keep me signed in</label>
            </div>
            <Button className={styles.btn} variant='primary' type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <p className={styles.switchMode}>
                No account?{" "}
                <button type="button" onClick={() => onModeChange("register")}>Create one</button>
            </p>
        </form>
    )
}
