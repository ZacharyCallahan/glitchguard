import { CreateListButton } from "../buttons";
import List from "./List";

const Board = ({ board }: { board: Board }) => {
    return (
        <div>
            <div className="border-b-2 border-black mb-6">
                <h2>{board.name}</h2>
                <CreateListButton id={board.id} />
            </div>
            <div className="flex gap-6">
                {board.lists?.map((list) => (
                    <List key={list.id} list={list} />
                ))}
            </div>
        </div>
    );
};

export default Board;
