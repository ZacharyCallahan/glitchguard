"use client";
import BoardDisplay from "../../../../../components/guard/board/BoardDisplay";
import { useAppSelector } from "../../../../../redux/store";

const Page = ({ params }: ParamsProp) => {
  const id = parseInt(params.id);
  const boardId = params.boardId;

  const guards = useAppSelector((state) => state.guardReducer.value.guards);

  const guard = guards.find((guard) => guard.id === id);

  const boards: Board[] = guard?.boards || [];
  // make the activeboard a object of board by filtering the boards array
  const activeBoard = boards.filter((board) => board?.id === parseInt(boardId));

  return (
    <div className="w-3/4 mr-12 space-y-6 ">
      <BoardDisplay board={activeBoard[0]} guardId={id} />
    </div>
  );
};

export default Page;
