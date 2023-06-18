import Link from "next/link";
import React from "react";
import {
    CreateBugButton,
    CreateListButton,
    DeleteListButton,
    EditListButton,
    OptionsButton,
} from "../../buttons";
import Bug from "./list/Bug";

type ListProps = {
    list: List;
    boardId: number;
    guardId: number;
};

const List = ({ list, boardId, guardId }: ListProps) => {
    return (
        <tr className=" border-b-2 table-row  hover:bg-gray-200 ">
            <td className="py-4 sm:px-2 md:px-4 lg:px-6 xl:px-8">
                {list.name}
            </td>
            <td className="py-4 sm:px-2 md:px-4 lg:px-6 xl:px-8">
                {list.bugs.length}
            </td>
            <td className="flex  py-4 sm:px-2 md:px-4 lg:px-6 xl:px-8 space-x-3">
                <Link
                    href={`/guard/${guardId}/board/${boardId}/list/${list.id}`}>
                    View List
                </Link>
                <DeleteListButton id={list.id} />
                <EditListButton id={list.id} />
            </td>
        </tr>
    );
};

export default List;
