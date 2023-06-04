"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { PopupForm } from "./forms.component";

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

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <button onClick={handleClick}>Create Guard</button>
            {open && (
                <PopupForm onClick={handleClick}>
                    <form className="flex flex-col gap-4">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                        />
                        <label htmlFor="type">Type</label>
                    </form>
                </PopupForm>
            )}
        </>
    );
};


