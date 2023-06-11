import { CreateListButton, EditBoardButton } from "../../buttons";
import BoardHeader from "./BoardHeader";
import List from "./List";

const BoardDisplay = ({
    board,
    guardId,
}: {
    board: Board;
    guardId: number;
}) => {
    return (
        <div>
            <BoardHeader board={board} guardId={guardId} />

            <div className="flex gap-6">
                {board.lists?.map((list) => (
                    <List
                        key={list.id}
                        list={list}
                        boardId={board.id}
                        guardId={guardId}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardDisplay;
