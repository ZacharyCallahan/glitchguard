import Link from "next/link";
import { CreateGuardButton, LoginButton, LogoutButton } from "./buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export const GlobalNav = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    return (
        <nav className=" bg-white rounded-md shadow-sm mb-6">
            <div className="flex justify-between items-center h-20 m-auto w-5/6">
                <ul className="flex items-center gap-6">
                    <li>
                        <Link href={"/"}>GlitchGuard</Link>
                    </li>
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li>
                        <CreateGuardButton />
                    </li>
                </ul>
                <ul className="flex items-center gap-6">
                    <li>
                        <input
                            placeholder="Search"
                            type="search"
                            name="search"
                            id="search"
                            className="border-2 border-black"
                        />
                    </li>
                    {user && (
                        <li>
                            <p>Welcome, {user.name}</p>
                        </li>
                    )}

                    <li>{user ? <LogoutButton /> : <LoginButton />}</li>

                    <li>
                        <Link href={"/profile"}>Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export const DashboardNav = () => {
    return (
        <nav className="w-1/4 space-y-3 border-2 border-black p-6 h-[768px]">
            <ul className="border-b-2 pb-3">
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/dashboard"}>Dashboard</Link>
                </li>
            </ul>
            <ul className="border-b-2  pb-3">
                <li>
                    <Link href={"/dashboard/guards"}>Your Guards</Link>
                </li>
                <li>
                    <Link href={"/dashboard/boards"}>Your Boards</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href={"/subscriptions"}>Subscriptions</Link>
                </li>
            </ul>
        </nav>
    );
};
