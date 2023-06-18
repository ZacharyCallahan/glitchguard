import { useAppSelector } from "../../../../redux/store";
import {
    DeleteBugButton,
    EditBugButton,
    OptionsButton,
} from "../../../buttons";

type BugProps = {
    bug: Bug;
    guardId: number;
    boardId: number;
    listId: number;
};

const Bug = ({ bug, guardId, boardId, listId, ...rest }: BugProps) => {
    // find the user who created the bug
    const user: User = useAppSelector((state) =>
        state.guardReducer.value.guards
            .find((guard) => guard.id === guardId)
            .users.find((user) => user.id === bug.createdById)
    );
    console.log()
    const formatedDeadline = new Date(
        bug.deadline?.toString()
    ).toLocaleDateString("en-US", {
        timeZone: "UTC",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const colorClass = {
        backgroundColor: bug.color,
    };
    return (
        <div className="shadow-md " {...rest}>
            <div style={colorClass} className={`h-10 rounded-t-md`}></div>
            <div className="bg-white h-fit rounded-b-md p-3 space-y-3 text-sm">
                <div className="flex justify-between items-center border-b-2 pb-3">
                    <h3 className="text-md font-semibold">{bug.name}</h3>
                    <OptionsButton>
                        <EditBugButton bug={bug} />
                        <DeleteBugButton id={bug.id} />
                    </OptionsButton>
                </div>
                <div className="flex flex-col border-b-2 pb-3">
                    <h4>Description:</h4>
                    <p>{bug.description}</p>
                </div>

                <div className="flex gap-3">
                    <h4>Priority:</h4>
                    <p>{bug.priority}</p>
                </div>
                <div className="flex gap-3">
                    <h4>Status:</h4>
                    <p> {bug.status}</p>
                </div>

                <div className="flex gap-3 ">
                    <h4>Assigned To:</h4>
                    {bug.assignedUsers && bug.assignedUsers.length > 0 ? (
                        bug.assignedUsers.map((user) => (
                            <p key={user.id}>{user.name}</p>
                        ))
                    ) : (
                        <p>No assigned users</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <h4>Due Date:</h4>
                    <p> {formatedDeadline}</p>
                </div>
                <div className="flex flex-col gap-3 text-xs opacity-80 border-t-2 pt-3">
                    <div className="flex gap-3">
                        <h4>Created By:</h4>
                        <p> {user.name} </p>
                    </div>
                    <div className="flex gap-3">
                        <h4>Email:</h4>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bug;
