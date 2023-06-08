"use client";
import BoardDisplay from "../../../../../components/guard/BoardDisplay";
import { useAppSelector } from "../../../../../redux/store";

const Page = async ({ params }: ParamsProp) => {
    const id =  parseInt(params.id);
    const boardId = params.boardId;

    const guards = useAppSelector((state) => state.guardReducer.value.guards);

    const guard = guards.find((guard) => guard.id === id);

    const boards: Board[] = guard.boards;
    console.log(boards);
    const activeBoard = boards.filter(
        (board) => board?.id === parseInt(boardId)
    );

    return (
        <div className="w-3/4">
            {activeBoard.map((board) => {
                return <BoardDisplay key={board?.id} board={board} guardId={id} />;
            })}
        </div>
    );
};

export default Page;
