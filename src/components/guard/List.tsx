import React from "react";
import { CreateBugButton, ListOptionsButton } from "../buttons";
import Bug from "./Bug";

type ListProps = {
    list: List;
};

const List = ({ list, ...rest }: ListProps) => {
    return (
        <div className="border-2 border-black p-6 space-y-3" {...rest}>
            <div className="border-b-2 border-black mb-3">
                <div className="flex items-center justify-between">
                    <h3>{list.name}</h3>
                    <ListOptionsButton id={list.id} />
                </div>
                <CreateBugButton id={list.id} />
            </div>
            {list.bugs.map((bug) => (
                <Bug bug={bug} key={bug.id} />
            ))}
        </div>
    );
};

export default List;
