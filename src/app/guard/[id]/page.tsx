import { useAppSelector } from "../../../redux/store";
import DataDisplay from "../../../components/guard/data/DataDisplay";
import GuardData from "../../../components/guard/data/GuardData";
import TaskCompleted from "../../../components/guard/data/TaskCompleted";
const Page = ({ params }: ParamsProp) => {
  const id = parseInt(params.id);
  const guard = useAppSelector((state) =>
    state.guardReducer.value.guards.find((guard) => guard.id === id)
  );

  const activeBugs =
    guard?.boards.flatMap((board) =>
      board.lists.flatMap((list) =>
        list.bugs.filter((bug) => bug.status === "In Progress")
      )
    ).length ?? 0;

  const inactiveBugs =
    guard?.boards.flatMap((board) =>
      board.lists.flatMap((list) =>
        list.bugs.filter((bug) => bug.status === "To Do")
      )
    ).length ?? 0;

  const doneBugs =
    guard?.boards.flatMap((board) =>
      board.lists.flatMap((list) =>
        list.bugs.filter((bug) => bug.status === "Done")
      )
    ).length ?? 0;

  const unassignedBugs =
    guard?.boards.flatMap((board) =>
      board.lists.flatMap((list) =>
        list.bugs.filter(
          (bug) =>
            !bug.hasOwnProperty("assignedUsers") ||
            bug.assignedUsers.length === 0
        )
      )
    ).length ?? 0;

  return (
    <div className="w-3/4 mr-12 space-y-6">
      <div className=" space-y-2">
        <h2 className="text-2xl font-semibold ">
          Welcome to Guard - {guard?.name}
        </h2>
        <p className="opacity-80 ">
          The dashboard for the guard. Here you can see the most useful data
          about the guard.
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
        <TaskCompleted
          complete={doneBugs}
          inComplete={inactiveBugs + activeBugs}
        />
        <GuardData guardId={id} />
      </div>
    </div>
  );
};

export default Page;
