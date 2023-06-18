import { useAppSelector } from "../../../redux/store";
import GuardDataCard from "./GuardDataCard";

const GuardData = ({ guardId }) => {
    // grab data from store and check the number of users, boards, and bugs
    const numberOfUsers = useAppSelector(
        (state) =>
            state.guardReducer.value.guards.find(
                (guard) => guard.id === guardId
            )?.users.length
    );

    const numberOfBoards = useAppSelector(
        (state) =>
            state.guardReducer.value.guards.find(
                (guard) => guard.id === guardId
            )?.boards.length
    );

    const numberOfBugs = useAppSelector(
        (state) =>
            state.guardReducer.value.guards
                .find((guard) => guard.id === guardId)
                ?.boards.map((board) => board.lists.map((list) => list.bugs))
                .flat().length
    );

    return (
        <div className="w-2/4 bg-white rounded-md p-6 text-center space-y-6 flex flex-col shadow-md">
            <div className="space-y-2">
                <h3 className="text-xl font-medium">Guard Data</h3>
                <p className="opacity-80 text-sm">
                    The general data of the guard.
                </p>
            </div>
            <div className="flex flex-col items-center justify-between flex-grow">
                <GuardDataCard
                    icon={"test"}
                    name={"Users"}
                    number={numberOfUsers}
                />
                <GuardDataCard
                    icon={"test"}
                    name={"Boards"}
                    number={numberOfBoards}
                />
                <GuardDataCard
                    icon={"test"}
                    name={"Bugs"}
                    number={numberOfBugs}
                />
            </div>
        </div>
    );
};

export default GuardData;
