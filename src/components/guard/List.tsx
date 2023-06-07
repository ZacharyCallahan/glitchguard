import React from "react";
import Bug from "./Bug";

type ListProps = {
    list: List;
};

const List = ({ list, ...rest }: ListProps) => {
    return (
        <div {...rest}>
            <h3>{list.name}</h3>
            
            {list.bugs.map((bug) => (
                <Bug bug={bug} key={bug.id} />
            ))}
        </div>
    );
};

export default List;
