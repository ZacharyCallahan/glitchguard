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
        <div className="space-y-6">
            <BoardHeader board={board} guardId={guardId} />

            <div className="bg-white p-6  shadow-md rounded-md">
                <table className="w-full sm:text-xs md:text-base text-left ">
                    <thead className="border-b-2 bg-gray-800  text-white">
                        <tr>
                            <th className="py-4 sm:px-2 md:px-4 lg:px-6 xl:px-8">
                                List Name
                            </th>
                            <th className="py-4 sm:px-2 md:px-4 lg:px-6 xl:px-8">
                                Number of Bugs
                            </th>
                            <th className="py-4 sm:px-2 md:px-4 lg:px-6 xl:px-8">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {board.lists?.map((list) => (
                            <List
                                key={list.id}
                                list={list}
                                boardId={board.id}
                                guardId={guardId}
                            />
                        ))}
                    </tbody>
                </table>
                <div className="mt-6 flex justify-between">
                    <button>Prev</button>
                    <button>Next</button>
                </div>
            </div>
        </div>
    );
};

export default BoardDisplay;
