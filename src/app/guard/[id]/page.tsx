"use client";

import DataDisplay from "../../../components/guard/data/DataDisplay";
import GuardData from "../../../components/guard/data/GuardData";
import TaskCompleted from "../../../components/guard/data/TaskCompleted";
import { useAppSelector } from "../../../redux/store";

const Page = ({ params }: ParamsProp) => {
    const id = parseInt(params.id);
    const guard = useAppSelector((state) =>
        state.guardReducer.value.guards.find((guard) => guard.id === id)
    );

    const activeBugs = guard.boards.flatMap((board) =>
        board.lists.flatMap((list) =>
            list.bugs.filter((bug) => bug.status === "open")
        )
    ).length;

    const inactiveBugs = guard.boards.flatMap((board) =>
        board.lists.flatMap((list) =>
            list.bugs.filter((bug) => bug.status === "closed")
        )
    ).length;

    // to get the number of unassigned bugs we need to check if the bug has a assignedUsers array. If it does not have it, it means that it is unassigned.
    // if has assignedUsers array, check if it is empty. If it is empty, it means that it is unassigned.
    // if it has assignedUsers array and it is not empty, check the length of that array get thats how many users are assigned to that bug.
    const unassignedBugs = guard.boards.flatMap((board) =>
        board.lists.flatMap((list) =>
            list.bugs.filter(
                (bug) =>
                    !bug.hasOwnProperty("assignedUsers") ||
                    bug.assignedUsers.length === 0
            )
        )
    ).length;

    return (
        <div className="w-3/4 mr-12 space-y-6">
            <div className=" space-y-2">
                <h2 className="text-2xl font-semibold ">
                    Welcome to Guard - {guard.name}
                </h2>
                <p className="opacity-80 ">
                    The dashboard for the guard. Here you can see the most
                    useful data about the guard.
                </p>
            </div>
            <div className="flex gap-6 ">
                <DataDisplay
                    color={"bg-gray-500"}
                    number={activeBugs}
                    title="Active Bugs"
                />
                <DataDisplay
                    color={"bg-yellow-500"}
                    number={inactiveBugs}
                    title="Inactive Bugs"
                />
                <DataDisplay
                    color={"bg-gray-700"}
                    number={unassignedBugs}
                    title="Unassigned Bugs"
                />
            </div>
            <div className="flex gap-6">
                <TaskCompleted />
                <GuardData guardId={id} />
                <TaskCompleted />
                <GuardData guardId={id} />
            </div>
        </div>
    );
};

export default Page;
