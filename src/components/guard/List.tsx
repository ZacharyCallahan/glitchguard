import React from "react";
import { CreateBugButton } from "../buttons";
import Bug from "./Bug";

type ListProps = {
    list: List;
};

const List = ({ list, ...rest }: ListProps) => {
    return (
        <div {...rest}>
            <h3>{list.name}</h3>
            <CreateBugButton id={list.id} />
            {list.bugs.map((bug) => (
                <Bug bug={bug} key={bug.id} />
            ))}
        </div>
    );
};

export default List;
