import React from "react";
import {
    CreateBugButton,
    DeleteListButton,
    EditListButton,
    OptionsButton,
} from "../../buttons";
import Bug from "./Bug";

type ListProps = {
    list: List;
    boardId: number;
    guardId: number;
};

const List = ({ list, boardId, guardId, ...rest }: ListProps) => {
    return (
        <div className="border-2 border-black p-6 space-y-3" {...rest}>
            <div className="border-b-2 border-black mb-3">
                <div className="flex items-center justify-between">
                    <h3>{list.name}</h3>
                    <OptionsButton>
                        <DeleteListButton id={list.id} />
                        <EditListButton id={list.id} />
                    </OptionsButton>
                </div>
                <CreateBugButton
                    guardId={guardId}
                    boardId={boardId}
                    listId={list.id}
                />
            </div>
            {list.bugs.map((bug) => (
                <Bug bug={bug} key={bug.id} />
            ))}
        </div>
    );
};

export default List;
