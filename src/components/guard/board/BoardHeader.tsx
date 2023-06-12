import {
    CreateListButton,
    EditBoardButton,
    OptionsButton,
} from "../../buttons";

type BoardHeaderProps = {
    board: Board;
    guardId: number;
};

const BoardHeader = ({ board, guardId }: BoardHeaderProps) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-12">
                <h2 className="text-2xl font-semibold ">
                    Welcome to Board - {board.name}
                </h2>

                <OptionsButton>
                    <CreateListButton boardId={board.id} guardId={guardId} />

                    <EditBoardButton id={board.id} />
                </OptionsButton>
            </div>

            <p className="opacity-80 ">
                This is the where you can see all List for this board.
            </p>
        </div>
    );
};

export default BoardHeader;
