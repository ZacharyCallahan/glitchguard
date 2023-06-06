type GuardProps = {
    guard: {
        id: number;
        name: string;
        users: User[];
        boards: Board[];
        createdAt: String;
        updatedAt: String;
    };
};
type User = {
    id: number;
    name: string;
    email: string;
    createdAt: String;
    updatedAt: String;
};

type Guard = {
    id: number;
    name: string;
    users: User[];
    boards: Board[];
    createdAt: String;
    updatedAt: String;
};

type Board = {
    id: number;
    name: string;
};

type ParamsProp = {
    params: {
        id: string;
        boardId: string;
    };
};
