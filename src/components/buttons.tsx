"use client";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PopupForm } from "./forms";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
    addBoard,
    addBug,
    addGuard,
    addList,
    deleteBoard,
    deleteBug,
    deleteGuard,
    deleteList,
    editBoard,
    editBug,
    editGuard,
    editList,
} from "../redux/features/guard-slice";
type OptionsButtonProps = React.HTMLProps<HTMLDivElement> & {
    children: React.ReactNode;
};
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

    const dispath = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("/api/guard/create", { name })
            .then((response) => {
                setLoading(false);
                dispath(addGuard(response.data));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        setOpen(false);
    };
    return (
        <>
            <button onClick={handleClick}>Create Guard</button>
            {loading && <div>Loading...</div>}
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
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`/api/guard/board/create/${id}`, { name })
            .then((response) => {
                setLoading(false);
                dispatch(addBoard(response.data));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        setOpen(false);
    };
    return (
        <>
            <button onClick={handleClick} className="text-xl">
                Create Board
            </button>
            {loading && <div>Loading...</div>}
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

export const CreateListButton = ({
    boardId,
    guardId,
}: {
    boardId: number;
    guardId: number;
}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`/api/guard/board/list/create/${boardId}`, { name })
            .then((response) => {
                setLoading(false);
                const payload = { ...response.data, guardId };
                dispatch(addList(payload));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        setOpen(false);
    };
    return (
        <>
            <button onClick={handleClick}>Create List</button>
            {loading && <p>Creating...</p>}
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

export const CreateBugButton = ({
    guardId,
    boardId,
    listId,
}: {
    guardId: number;
    boardId: number;
    listId: number;
}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    //createdBy is the user id
    const session = useSession();
    const createdBy = session.data.user;

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        createdBy: createdBy,
        deadline: "",
        priority: "low",
        status: "open",
        color: "#000"
    });


    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        axios
            .post(`/api/guard/board/list/bug/create/${listId}`, formData)
            .then((response) => {
                const payload = { ...response.data, guardId, boardId, listId };
                dispatch(addBug(payload));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        setOpen(false);
    };
    return (
        <>
            <button onClick={handleClick}>Create Bug</button>
            {loading && <div>Loading...</div>}
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
                        <label htmlFor="deadline">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            id="deadline"
                            value={formData.deadline}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    deadline: e.target.value,
                                })
                            }
                        />
                        {/* color wheel */}
                        <label htmlFor="color">Color</label>
                        <input
                            type="color"
                            name="color"
                            id="color"
                            value={formData.color}
                            onChange={(e) =>    
                                setFormData({
                                    ...formData,
                                    color: e.target.value,
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

export const EditGuardButton = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios
            .put(`/api/guard/edit/${id}`, { name })
            .then((response) => {
                setLoading(false);
                dispatch(editGuard(response.data));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        setOpen(false);
    };
    return (
        <>
            <button onClick={handleClick}>Edit Guard</button>
            {loading && <div>Loading...</div>}
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
                        <button type="submit">Edit</button>
                    </form>
                </PopupForm>
            )}
        </>
    );
};

export const EditBoardButton = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios
            .put(`/api/guard/board/edit/${id}`, { name })
            .then((response) => {
                setLoading(false);
                dispatch(editBoard(response.data));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        setOpen(false);
    };
    return (
        <>
            <button onClick={handleClick}>Edit Board</button>
            {loading && <div>Loading...</div>}
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
                        <button type="submit">Edit</button>
                    </form>
                </PopupForm>
            )}
        </>
    );
};

export const EditListButton = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios
            .put(`/api/guard/board/list/edit/${id}`, { name })
            .then((response) => {
                dispatch(editList(response.data));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        setOpen(false);
    };
    return (
        <>
            <button onClick={handleClick}>Edit List</button>
            {loading && <div>Loading...</div>}
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
                        <button type="submit">Edit</button>
                    </form>
                </PopupForm>
            )}
        </>
    );
};

export const EditBugButton = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios
            .put(`/api/guard/board/list/bug/edit/${id}`, {
                name,
                description,
            })
            .then((response) => {
                dispatch(editBug(response.data));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        setOpen(false);
    };
    return (
        <>
            <button onClick={handleClick}>Edit Bug</button>
            {loading && <div>Loading...</div>}
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
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button type="submit">Edit</button>
                    </form>
                </PopupForm>
            )}
        </>
    );
};

export const DeleteGuardButton = ({ id }: { id: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        setLoading(true);

        axios
            .delete(`/api/guard/delete/${id}`)
            .then((response) => {
                setLoading(false);
                console.log(response.data);
                dispatch(deleteGuard(response.data));
                //check if we are on the guard page
                if (pathname.includes(`/guard/${id}`)) router.push("/");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <button onClick={handleClick}>
            Delete Guard {loading && <p>Deleting...</p>}
        </button>
    );
};

export const DeleteBoardButton = ({ id }: { id: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);

        axios
            .delete(`/api/guard/board/delete/${id}`)
            .then((response) => {
                setLoading(false);
                dispatch(deleteBoard(response.data));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <button onClick={handleClick}>
            Delete Board {loading && <p>Deleting...</p>}
        </button>
    );
};

export const DeleteListButton = ({ id }: { id: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);

        axios
            .delete(`/api/guard/board/list/delete/${id}`)
            .then((response) => {
                setLoading(false);
                dispatch(deleteList(response.data));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <button onClick={handleClick}>
            Delete List {loading && <p>Deleting...</p>}
        </button>
    );
};

export const DeleteBugButton = ({ id }: { id: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);

        axios
            .delete(`/api/guard/board/list/bug/delete/${id}`)
            .then((response) => {
                setLoading(false);
                dispatch(deleteBug(response.data));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <button onClick={handleClick}>
            Delete Bug {loading && <p>Deleting...</p>}
        </button>
    );
};

export const OptionsButton = ({ children, ...rest }: OptionsButtonProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div {...rest}>
            {!open ? (
                <button onClick={() => setOpen(!open)}>+</button>
            ) : (
                <button onClick={() => setOpen(!open)}>-</button>
            )}

            {open && (
                <div className="z-[999] absolute bg-slate-300 p-3 rounded-md flex flex-col items-start">
                    {children}
                </div>
            )}
        </div>
    );
};
