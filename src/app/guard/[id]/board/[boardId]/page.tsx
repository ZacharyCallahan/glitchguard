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
                return (
                    <div key={board.id}>
                        <h2>{board.name}</h2>
                        {board.lists?.map((list) => (
                            <div key={list.id}>
                                <h3>{list.name}</h3>
                                {list.bugs.map((bug) => (
                                    <div key={bug.id}>
                                        <h4>{bug.name}</h4>
                                        <p>{bug.description}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default page;
