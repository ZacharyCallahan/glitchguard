
import { CreateListButton, EditBoardButton } from "../buttons";
import List from "./List";

const BoardDisplay = ({ board, guardId }: { board: Board, guardId: number }) => {
    return (
        <div>
            <div className="border-b-2 border-black mb-6">
                <h2>{board.name}</h2>
                <CreateListButton boardId={board.id} guardId={guardId} />
                <EditBoardButton id={board.id} />
            </div>
            <div className="flex gap-6">
                {board.lists?.map((list) => (
                    <List key={list.id} list={list} boardId={board.id} guardId={guardId}  />
                ))}
            </div>
        </div>
    );
};

export default BoardDisplay;
