"use client";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
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
import Spinner from "./Spinner";
type OptionsButtonProps = React.HTMLProps<HTMLDivElement> & {
    children: React.ReactNode;
};
type FormErrors = {
    name?: string;
    description?: string;
    priority?: string;
    status?: string;
    deadline?: string;
    color?: string;
};
type FormData = {
    name?: string;
    description?: string;
    priority?: string;
    status?: string;
    deadline?: string;
    color?: string;
};

const validateForm = (formData: FormData) => {
    const errors: FormErrors = {};
    if (formData.name?.length < 3) {
        errors.name = "Name must be at least 3 characters long";
    }
    if (formData.description?.length < 10) {
        errors.description = "Description must be at least 10 characters long";
    }
    if (formData.priority?.length < 1) {
        errors.priority = "You must select a priority";
    }
    if (formData.status?.length < 1) {
        errors.status = "You must select a status";
    }
    if (formData.deadline?.length < 1) {
        errors.deadline = "You must enter a deadline";
    }
    if (formData.color?.length < 1) {
        errors.color = "You must select a color";
    }

    return errors;
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
    const [errors, setErrors] = useState<FormErrors>({});

    const dispath = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = validateForm({ name });
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }
        axios
            .post("/api/guard/create", { name })
            .then((response) => {
                setOpen(false);
                setLoading(false);
                dispath(addGuard(response.data));
                setErrors({});
            })
            .catch((err) => {
                setErrors(err.data);
                setLoading(false);
            });
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
                        {errors.name && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.name}
                            </p>
                        )}
                        <div className="flex justify-center gap-3 items-center">
                            <button type="submit">Create</button>
                            {loading && <Spinner />}
                        </div>
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
    const [errors, setErrors] = useState<FormErrors>({});

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = validateForm({ name });
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }
        axios
            .post(`/api/guard/board/create/${id}`, { name })
            .then((response) => {
                setLoading(false);
                dispatch(addBoard(response.data));
                setOpen(false);
                setErrors({});
            })
            .catch((error) => {
                setLoading(false);
                setErrors(error.data);
            });
    };
    return (
        <>
            <button onClick={handleClick} className="text-xl">
                Create Board
            </button>

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
                        {errors.name && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.name}
                            </p>
                        )}
                        <div className="flex gap-3 justify-center items-center">
                            <button type="submit">Create</button>
                            {loading && <Spinner />}
                        </div>
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
    const [errors, setErrors] = useState<FormErrors>({});

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = validateForm({ name });
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }

        axios
            .post(`/api/guard/board/list/create/${boardId}`, { name })
            .then((response) => {
                setLoading(false);
                const payload = { ...response.data, guardId };
                dispatch(addList(payload));
                setOpen(false);
                setErrors({});
            })
            .catch((error) => {
                setLoading(false);
                setErrors(error.data);
            });
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
                        {errors.name && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.name}
                            </p>
                        )}
                        <div className="flex gap-3 justify-center items-center">
                            <button type="submit">Create</button>
                            {loading && <Spinner />}
                        </div>
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
        priority: "Low",
        status: "To Do",
        color: "#000",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }

        axios
            .post(`/api/guard/board/list/bug/create/${listId}`, formData)
            .then((response) => {
                const payload = { ...response.data, guardId, boardId, listId };
                dispatch(addBug(payload));
                setLoading(false);
                setOpen(false);
                setErrors({});
            })
            .catch((error) => {
                setLoading(false);
                setErrors(error.data);
            });
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
                        {errors.name && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.name}
                            </p>
                        )}
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
                        {errors.description && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.description}
                            </p>
                        )}
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
                        {errors.deadline && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.deadline}
                            </p>
                        )}
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
                        {errors.color && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.color}
                            </p>
                        )}

                        <div className="flex gap-3 justify-center items-center">
                            <button type="submit">Create</button>
                            {loading && <Spinner />}
                        </div>
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
    const [errors, setErrors] = useState<FormErrors>({});

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = validateForm({ name });
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }
        axios
            .put(`/api/guard/edit/${id}`, { name })
            .then((response) => {
                setLoading(false);
                dispatch(editGuard(response.data));
                setOpen(false);
                setErrors({});
            })
            .catch((error) => {
                setLoading(false);
                setErrors(error.data);
            });
    };
    return (
        <>
            <button onClick={handleClick}>Edit Guard</button>

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
                        {errors.name && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.name}
                            </p>
                        )}
                        <div className="flex gap-3 justify-center  items-center">
                            <button type="submit">Edit</button>
                            {loading && <Spinner />}
                        </div>
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
    const [errors, setErrors] = useState<FormErrors>({});

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = validateForm({ name });
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }
        axios
            .put(`/api/guard/board/edit/${id}`, { name })
            .then((response) => {
                setLoading(false);
                dispatch(editBoard(response.data));
                setOpen(false);
                setErrors({});
            })
            .catch((error) => {
                setLoading(false);
                setErrors(error.data);
            });
    };
    return (
        <>
            <button onClick={handleClick}>Edit Board</button>

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
                        {errors.name && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.name}
                            </p>
                        )}
                        <div className="flex gap-3 justify-center items-center">
                            <button type="submit">Edit</button>
                            {loading && <Spinner />}
                        </div>
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
    const [errors, setErrors] = useState<FormErrors>({});

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = validateForm({ name });
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }
        axios
            .put(`/api/guard/board/list/edit/${id}`, { name })
            .then((response) => {
                dispatch(editList(response.data));
                setLoading(false);
                setOpen(false);
                setErrors({});
            })
            .catch((error) => {
                setLoading(false);
                setErrors(error.data);
            });
    };
    return (
        <>
            <button onClick={handleClick}>Edit List</button>

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
                        {errors.name && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.name}
                            </p>
                        )}
                        <div className="flex gap-3 justify-center items-center">
                            <button type="submit">Edit</button>
                            {loading && <Spinner />}
                        </div>
                    </form>
                </PopupForm>
            )}
        </>
    );
};

export const EditBugButton = ({ bug }: { bug: Bug }) => {
    const [open, setOpen] = useState(false);
    const deadline = new Date(bug.deadline.toString());
    const formatedDeadline = deadline.toISOString().split("T")[0];
    const [formData, setFormData] = useState({
        name: bug.name || "",
        description: bug.description || "",
        priority: bug.priority || "",
        status: bug.status || "",
        assignedTo: bug.assignedUsers || "",
        deadline: formatedDeadline || "",
        color: bug.color || "",
    });
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleClick = () => {
        setOpen(!open);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }
        axios
            .put(`/api/guard/board/list/bug/edit/${bug.id}`, formData)
            .then((response) => {
                dispatch(editBug(response.data));
                setLoading(false);
                setOpen(false);
                setErrors({});
            })
            .catch((error) => {
                setLoading(false);
                setErrors(error.data);
            });
    };
    return (
        <>
            <button onClick={handleClick}>Edit Bug</button>

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
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.name}
                            </p>
                        )}
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.description && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.description}
                            </p>
                        )}

                        <label htmlFor="priority">Priority</label>
                        <select
                            name="priority"
                            id="priority"
                            value={formData.priority}
                            onChange={(e) => handleChange(e)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        {errors.priority && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.priority}
                            </p>
                        )}
                        <label htmlFor="status">Status</label>
                        <select
                            name="status"
                            id="status"
                            value={formData.status}
                            onChange={(e) => handleChange(e)}>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        {errors.status && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.status}
                            </p>
                        )}
                        <label htmlFor="assignedTo">Assigned To</label>
                        {/* TODO: Change the value and how this is rendered */}
                        <input
                            type="text"
                            name="assignedTo"
                            id="assignedTo"
                            value={formData.assignedTo.toString()}
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="deadline">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            id="deadline"
                            value={formData.deadline}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.deadline && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.deadline}
                            </p>
                        )}
                        <label htmlFor="color">Color</label>
                        <input
                            type="color"
                            name="color"
                            id="color"
                            value={formData.color}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.color && (
                            <p className="bg-red-100 text-red-500 rounded-md p-2 mt-5 w-fit">
                                {errors.color}
                            </p>
                        )}
                        <div className="flex gap-3 justify-center items-center">
                            <button type="submit">Edit</button>
                            {loading && <Spinner />}
                        </div>
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
    const [resError, setResError] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        await axios
            .delete(`/api/guard/delete/${id}`)
            .then((response) => {
                setLoading(false);
                dispatch(deleteGuard(response.data));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setResError(true);
            });
        if (pathname.includes(`/guard/${id}`) && !resError) router.push("/");
    };

    return (
        <div className="flex gap-3 items-center">
            <button onClick={handleClick}>Delete Guard</button>
            {loading && <Spinner />}
        </div>
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
        <div className="flex gap-3 items-center">
            <button onClick={handleClick}>Delete Board</button>
            {loading && <Spinner />}
        </div>
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
        <div className="flex gap-3 items-center">
            <button onClick={handleClick}>Delete List</button>
            {loading && <Spinner />}
        </div>
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
        <div className="flex gap-3 items-center">
            <button onClick={handleClick}>Delete Bug</button>
            {loading && <Spinner />}
        </div>
    );
};

export const OptionsButton = ({ children, ...rest }: OptionsButtonProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);

    return (
        <div ref={ref} {...rest}>
            <button onClick={handleClick}>
                {open ? (
                    <i className="fa fa-times" aria-hidden="true"></i>
                ) : (
                    <i className="fa fa-bars" aria-hidden="true"></i>
                )}
            </button>

            {open && (
                <div className="z-[999] absolute bg-slate-300 p-3 rounded-md flex flex-col items-start">
                    {children}
                </div>
            )}
        </div>
    );
};
