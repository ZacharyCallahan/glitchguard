"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { PopupForm } from "./forms.component";
import axios from "axios";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
    return <button onClick={() => signIn()}>Login</button>;
};

export const RegisterButton = () => {
    return <Link href="/register">Register</Link>;
};

export const LogoutButton = () => {
    return <button onClick={() => signOut()}>Logout</button>;
};

export const ProfileButton = () => {
    return <Link href="/profile">Profile</Link>;
};

export const CreateGuardButton = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post("/api/createGuard", { name })
            .then((response) => router.refresh())
            .catch((error) => console.log(error));
    };
    return (
        <>
            <button onClick={handleClick}>Create Guard</button>
            {open && (
                <PopupForm onClick={handleClick}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button type="submit">Create</button>
                    </form>
                </PopupForm>
            )}
        </>
    );
};
export const CreateBoardButton = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post(`/api/createBoard/${id}`, { name })
            .then((response) => router.refresh())
            .catch((error) => console.log(error));
    };
    return (
        <>
            <button onClick={handleClick}>Create Board</button>
            {open && (
                <PopupForm onClick={handleClick}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button type="submit">Create</button>
                    </form>
                </PopupForm>
            )}
        </>
    );
};
