import Link from "next/link";
import { CreateBoardButton, CreateGuardButton } from "../buttons.component";

const GuardNav = ({ guard }: GuardProps) => {
    return (
        <div className="w-1/4 border-2 border-black">
            <ul>
                <li>
                    <h2>{guard.name}</h2>
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
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                </li>
                <li>
                    <div className="flex items-center justify-between">
                        <h4>Boards </h4>
                        <CreateBoardButton id={guard.id} />
                    </div>
                    <ul className="pl-3">
                        {guard.boards?.map((board) => (
                            <li key={board.id}>
                                <Link href={`/guard/${guard.id}/board/${board.id}`}> {board.name}</Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default GuardNav;
