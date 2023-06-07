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
    lists: List[];
    createdAt: String;
    updatedAt: String;
};

type ParamsProp = {
    params: {
        id: string;
        boardId: string;
    };
};

type List = {
    id: number;
    name: string;
    bugs: Bug[];
    createdAt: String;
    updatedAt: String;
};

type Bug = {
    id: number;
    name: string;
    description: string;
    createdAt: String;
    updatedAt: String;
};
