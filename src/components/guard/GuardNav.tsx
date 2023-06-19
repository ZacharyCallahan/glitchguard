"use client";
import Link from "next/link";
import {
    CreateBoardButton,
    DeleteBoardButton,
    DeleteGuardButton,
    EditGuardButton,
    OptionsButton,
} from "../buttons";
import { useAppSelector } from "../../redux/store";

const GuardNav = ({ id }: { id: number }) => {
    const guard: Guard = useAppSelector((state) =>
        state.guardReducer.value.guards.find((guard) => guard.id === id)
    );

    return (
        <div className="w-1/4 bg-white rounded-r-md shadow-md p-6 space-y-3">
            <div className="flex justify-between border-b-2 pb-3">
                <Link
                    className="text-2xl font-medium"
                    href={`/guard/${guard.id}`}>
                    {guard.name}
                </Link>
                <OptionsButton>
                    <DeleteGuardButton id={guard.id} />
                    <EditGuardButton id={guard.id} />
                </OptionsButton>
            </div>
            <ul className="space-y-3">
                <li className="flex gap-3 items-center">
                    <i className="fa fa-shield fa-lg" aria-hidden="true"></i>
                    <Link
                        className="text-xl"
                        href={`/guard/${guard.id}/settings`}>
                        Guard Settings
                    </Link>
                </li>
                <li>
                    <div className="flex gap-3 items-center">
                        <i className="fa fa-user fa-lg" />
                        <h3 className="text-xl">Users</h3>
                    </div>
                    <ul className="pl-9">
                        {guard.users.map((user) => (
                            <li className="text-lg" key={user?.id}>
                                {user?.name}
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <i className="fa fa-columns fa-lg" aria-hidden="true"></i>
                            <h4 className="text-xl">Boards </h4>
                        </div>
                        <CreateBoardButton id={guard.id} />
                    </div>
                    <ul className="pl-9">
                        {guard.boards.map((board) => (
                            <li key={board?.id}>
                                <div className="flex items-center gap-3">
                                    <Link
                                        className="text-lg"
                                        href={`/guard/${guard.id}/board/${board?.id}`}>
                                        {board?.name}
                                    </Link>
                                    <OptionsButton>
                                        <DeleteBoardButton id={board?.id} />
                                    </OptionsButton>
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
