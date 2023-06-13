import {
    DeleteBugButton,
    EditBugButton,
    OptionsButton,
} from "../../../buttons";

type BugProps = {
    bug: Bug;
};

const Bug = ({ bug, ...rest }: BugProps) => {
    return (
        <div className="shadow-md " {...rest}>
            <div className="bg-red-300 h-10 rounded-t-md"></div>
            <div className="bg-white h-fit rounded-b-md p-3 space-y-3 text-sm">
                <div className="flex justify-between items-center border-b-2 pb-3">
                    <h3 className="text-md font-semibold">{bug.name}</h3>
                    <OptionsButton>
                        <EditBugButton id={bug.id} />
                        <DeleteBugButton id={bug.id} />
                    </OptionsButton>
                </div>
                <div className="flex gap-3 border-b-2 pb-3">
                    <h4>Description:</h4>
                    <p>{bug.description}</p>
                </div>
                <div className="flex  justify-between">
                    <div className="flex gap-3">
                        <h4>Priority:</h4>
                        <p> N/A</p>
                    </div>
                    <div className="flex gap-3">
                        <h4>Status:</h4>
                        <p> N/A</p>
                    </div>
                </div>
                <div className="flex  justify-between">
                    <div className="flex gap-3">
                        <h4>Due Date:</h4>
                        <p> N/A</p>
                    </div>
                    <div className="flex gap-3 pl-3">
                        <h4>Assigned To:</h4>
                        <p> N/A</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 text-xs opacity-80 border-t-2 pt-3">
                    <h4>Created By:</h4>
                    <p> N/A</p>
                </div>
            </div>
        </div>
    );
};

export default Bug;
