"use client";
import { useAppSelector } from "../../../../redux/store";
import Bug from "./Bug";
import ListHeader from "./ListHeader";

const ListDisplay = ({ boardId, guardId, listId }) => {
    const guards = useAppSelector((state) => state.guardReducer.value.guards);

    const guard = guards.find((guard) => guard.id === guardId);

    const boards: Board[] = guard.boards;

    const list = boards
        .filter((board) => board.id === parseInt(boardId))[0]
        .lists.filter((list) => list.id === parseInt(listId))[0];

    return (
        <div className="space-y-6 w-full">
            <ListHeader list={list} guardId={guardId} boardId={boardId} />
            <div className="grid grid-cols-fluid gap-6 w-full ">
                {list.bugs.map((bug) => (
                    <Bug key={bug.id} bug={bug} boardId={boardId} guardId={guardId} listId={listId} />
                ))}
            </div>
        </div>
    );
};

export default ListDisplay;
