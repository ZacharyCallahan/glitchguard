"use client";
import Link from "next/link";
import {
    CreateBoardButton,
    DeleteBoardButton,
    DeleteGuardButton,
    EditGuardButton,
} from "../buttons";
import { useAppSelector } from "../../redux/store";

const GuardNav = ({ id }: { id: number }) => {
    const guard: Guard = useAppSelector((state) =>
        state.guardReducer.value.guards.find((guard) => guard.id === id)
    );

    return (
        <div className="w-1/4 border-2 border-black p-6">
            <ul>
                <li>
                    <h2>{guard.name}</h2>
                    <DeleteGuardButton id={guard.id} />
                    <EditGuardButton id={guard.id} />
                </li>
                <li>
                    <Link href={`/guard/${guard.id}/settings`}>
                        Guard Settings
                    </Link>
                </li>
                <li>
                    <h3>Users</h3>
                    <ul className="pl-3">
                        {guard.users.map((user) => (
                            <li key={user?.id}>{user?.name}</li>
                        ))}
                    </ul>
                </li>
                <li>
                    <div className="flex items-center justify-between">
                        <h4>Boards </h4>
                        <CreateBoardButton id={guard.id} />
                    </div>
                    <ul className="pl-3">
                        {guard.boards.map((board) => (
                            <li key={board?.id}>
                                <div>
                                    <Link
                                        href={`/guard/${guard.id}/board/${board?.id}`}>
                                        {board?.name}
                                    </Link>
                                    <DeleteBoardButton id={board?.id} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default GuardNav;
