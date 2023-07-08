"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { LoginButton, RegisterButton } from "./buttons";

import { useDispatch } from "react-redux";

import axios from "axios";
import { AppDispatch } from "../redux/store";
import { setGuards } from "../redux/features/guard-slice";
import Link from "next/link";

type PopupFormProps = {
    children: React.ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
};
export const PopupForm = ({ children, onClick }: PopupFormProps) => {
    return (
        <div className="w-full fixed top-0 left-0 h-full z-50 flex items-center justify-center backdrop-blur-md backdrop-brightness-50">
            <div className="absolute bg-white w-5/6 m-auto max-w-md rounded-lg p-6">
                {children}
                <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={onClick}>
                    <i className={`fa fa-times`} />
                </button>
            </div>
        </div>
    );
};

export const LoginForm = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setFormValues({ email: "", password: "" });

            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl,
            });

            setLoading(false);

            if (!res?.error) {
                await axios
                    .get(`/api/get/users/guard`, {
                        params: {
                            email: formValues.email,
                        },
                    })
                    .then((res) => {
                        const guards: Guard[] = res.data;
                        dispatch(setGuards(guards));
                    });
                router.push(callbackUrl);
            } else {
                setError("invalid email or password");
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    return (
        <form onSubmit={onSubmit}>
            {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">
                    {error}
                </p>
            )}
            <div className="mb-6">
                <input
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
                />
            </div>
            <div className="mb-6">
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "loading..." : "Sign In"}
            </button>

            <p className="text-center font-semibold mx-4 mb-0">OR</p>

            <a onClick={() => signIn("google", { callbackUrl })} role="button">
                Continue with Google
            </a>
            <a onClick={() => signIn("github", { callbackUrl })} role="button">
                Continue with GitHub
            </a>

            <span>
                Don{"'"}t have an account? <RegisterButton />
            </span>
        </form>
    );
};

export const RegisterForm = ({ email }) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        email: email || "",
        password: "",
    });
    const [error, setError] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormValues({ name: "", email: "", password: "" });

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);
            if (!res.ok) {
                setError((await res.json()).message);
                return;
            }

            signIn(undefined, { callbackUrl: "/" });
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <form onSubmit={onSubmit}>
            {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">
                    {error}
                </p>
            )}
            <div className="mb-6">
                <input
                    required
                    type="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
            </div>
            <div className="mb-6">
                <input
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
                />
            </div>
            <div className="mb-6">
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
            </div>
            <button
                type="submit"
                style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
                disabled={loading}>
                {loading ? "loading..." : "Sign Up"}
            </button>
            <span>
                Already have an account? <LoginButton />
            </span>
        </form>
    );
};

export const HomeSignupForm = () => {
    const [email, setEmail] = useState("");
    return (
        <form className="text-center">
            <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-black border-2"
            />
            <Link href={`/register?email=${email}`}>Sign Up</Link>
        </form>
    );
};
