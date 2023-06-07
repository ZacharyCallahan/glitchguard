import { CreateListButton } from "../buttons";
import List from "./List";

const Board = ({ board }: { board: Board }) => {
    return (
        <div>
            <h2>{board.name}</h2>
            <CreateListButton id={board.id} />
            {board.lists?.map((list) => (
                <>
                    <List key={list.id} list={list} />
                </>
            ))}
        </div>
    );
};

export default Board;
