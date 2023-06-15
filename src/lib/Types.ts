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
type BoardPayload = {
    guardId: number;
    id: number;
    name: string;
    updatedAt: String;
    createdAt: String;
};
type ListPayload = {
    guardId: number;
    boardId: number;
    id: number;
    name: string;
    updatedAt: String;
    createdAt: String;
};

type TempGuardPayloadForDelete = {
    guardId: number;
};

type TempBoardPayloadForDelete = {
    guardId: number;
    boardId: number;
};

type TempListPayloadForDelete = {
    resList: {
        id: number;
        board: {
            id: number;
            guardId: number;
        };
    };
};
type TempBugPayloadForDelete = {
    guardId: number;
    boardId: number;
    listId: number;
    bugId: number;
};

type BugPayload = {
    guardId: number;
    boardId: number;
    listId: number;
    id: number;
    name: string;
    color: string;
    description: string;
    updatedAt: String;
    createdAt: String;
    assignedUsers: User[];
    createdById: String;
};
type User = {
    id: string;
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
        listId: string;
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
    status?: string;
    assignedUsers: User[] | [];
    color: string;
    deadline?: String;
    priority?: string;
    createdById: String;
    createdBy?: User;
    createdAt: String;
    updatedAt: String;
};
