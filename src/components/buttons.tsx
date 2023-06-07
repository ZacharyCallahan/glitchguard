"use client";

import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PopupForm } from "./forms";

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
            .post("/api/guard/create", { name })
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
            .post(`/api/guard/board/create/${id}`, { name })
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

export const CreateListButton = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post(`/api/guard/board/list/create/${id}`, { name })
            .then((response) => router.refresh())
            .catch((error) => console.log(error));
    };
    return (
        <>
            <button onClick={handleClick}>Create List</button>
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

export const CreateBugButton = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const router = useRouter();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post(`/api/guard/board/list/bug/create/${id}`, formData)
            .then((response) => router.refresh())
            .catch((error) => console.log(error));
    };
    return (
        <>
            <button onClick={handleClick}>Create Bug</button>
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
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                        />
                        <button type="submit">Create</button>
                    </form>
                </PopupForm>
            )}
        </>
    );
};

export const DeleteListButton = ({ id }: { id: number }) => {
    const router = useRouter();

    const handleClick = () => {
        axios
            .delete(`/api/guard/board/list/delete/${id}`)
            .then((response) => router.refresh())
            .catch((error) => console.log(error));
    };

    return <button onClick={handleClick}>Delete List</button>;
};

export const ListOptionsButton = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            {!open ? (
                <button onClick={() => setOpen(!open)}>+</button>
            ) : (
                <button onClick={() => setOpen(!open)}>-</button>
            )}

            {open && (
                <div className="absolute bg-slate-300 p-3 rounded-md flex flex-col items-start">
                    <DeleteListButton id={id} />
                    <button>Edit</button>
                </div>
            )}
        </div>
    );
};
