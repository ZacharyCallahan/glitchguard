import { DeleteBugButton, EditBugButton } from "../buttons";

type BugProps = {
    bug: Bug;
};

const Bug = ({ bug, ...rest }: BugProps) => {
    return (
        <div className="border-black border-2 p-3" {...rest}>
            <DeleteBugButton id={bug.id} />
            <EditBugButton id={bug.id} />
            <h4>{bug.name}</h4>
            <p>{bug.description}</p>
        </div>
    );
};

export default Bug;
