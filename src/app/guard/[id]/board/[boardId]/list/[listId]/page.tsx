import ListDisplay from "../../../../../../../components/guard/board/list/ListDisplay";

const page = ({ params }: ParamsProp) => {
    const id = parseInt(params.id);
    const boardId = parseInt(params.boardId);
    const listId = parseInt(params.listId);
    return (
        <div className="w-3/4 mr-12 space-y-6 ">
            <ListDisplay boardId={boardId} guardId={id} listId={listId} />
        </div>
    );
};

export default page;
