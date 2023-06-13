import {
    CreateBugButton,
    EditListButton,
    OptionsButton,
} from "../../../buttons";

const ListHeader = ({ boardId, guardId, list }) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-12">
                <h2 className="text-2xl font-semibold ">
                    Welcome to List - {list.name}
                </h2>

                <OptionsButton>
                    <CreateBugButton
                        boardId={boardId}
                        guardId={guardId}
                        listId={list.id}
                    />
                    <EditListButton id={list.id} />
                </OptionsButton>
            </div>

            <p className="opacity-80 ">
                This is the where you can see all Bugs for this board.
            </p>
        </div>
    );
};

export default ListHeader;
