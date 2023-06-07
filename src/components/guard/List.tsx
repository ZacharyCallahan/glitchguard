import React from "react";
import Bug from "./Bug";
import { CreateBugButton } from "../buttons.component";

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
