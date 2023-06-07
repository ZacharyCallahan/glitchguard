import Board from "@/components/guard/Board";
import axios from "axios";

const page = async ({ params }: ParamsProp) => {
    const id = params.id;
    const boardId = params.boardId;

    const guard: Guard = await axios
        .get(`${process.env.NEXTAUTH_URL}/api/getGuard/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));

    const boards: Board[] = guard.boards;

    const activeBoard = boards.filter(
        (board) => board.id === parseInt(boardId)
    );
    

    return (
        <div>
            {activeBoard.map((board) => {
                return <Board key={board.id} board={board} />;
            })}
        </div>
    );
};

export default page;