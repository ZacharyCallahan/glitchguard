"use client";
import Link from "next/link";
import { DeleteGuardButton, EditGuardButton, OptionsButton } from "../buttons";

const DisplayGuard = ({ id, name }: { id: number; name: string }) => {
    return (
        <Link
            href={`/guard/${id}`}
            className="w-48 h-24 bg-red-300 p-3 flex flex-col justify-end items-end rounded-md">
            <h2>{name}</h2>
        </Link>
    );
};

export default DisplayGuard;
