type GuardProps = {
    guard: {
        id: number;
        name: string;
        users: {
            id: number;
            name: string;
            email: string;
        }[];
        boards: {
            id: number;
            name: string;
        }[];
        createdAt: String;
        updatedAt: String;
    };
};

type Guard = {
    id: number;
    name: string;
    users: {
        id: number;
        name: string;
        email: string;
    }[];
    boards: {
        id: number;
        name: string;
    }[];
    createdAt: String;
    updatedAt: String;
};
