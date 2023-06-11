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

    return (
        <div className="w-3/4 mr-12 space-y-6 ">
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
                    number={0}
                    title="Active Bugs"
                />
                <DataDisplay
                    color={"bg-yellow-500"}
                    number={0}
                    title="Inactive Bugs"
                />
                <DataDisplay
                    color={"bg-gray-700"}
                    number={0}
                    title="Unassigned Bugs"
                />
            </div>
            <div className="flex gap-6">
                <TaskCompleted />
                <GuardData />
                <TaskCompleted />
                <GuardData />
            </div>
        </div>
    );
};

export default Page;
