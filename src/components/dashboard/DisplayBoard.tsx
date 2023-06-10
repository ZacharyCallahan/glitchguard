import Link from "next/link";
import { DeleteBoardButton, EditBoardButton, OptionsButton } from "../buttons";

const DisplayBoard = ({
    id,
    name,
    guardId,
}: {
    id: number;
    name: string;
    guardId: number;
}) => {
    return (
        <Link
            href={`/guard/${guardId}/board/${id}`}
            className="w-48 h-24 bg-orange-300 p-3 flex flex-col justify-end items-end rounded-md">
            {name}
        </Link>
    );
};

export default DisplayBoard;
