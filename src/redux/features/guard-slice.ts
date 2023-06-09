import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: GuardState;
};

type GuardState = {
    guards: Guard[];
};

const initialState = {
    value: {
        guards: [
            {
                id: 0,
                name: "",
                users: [] as User[],
                boards: [] as Board[],
                createdAt: "",
                updatedAt: "",
            } as Guard,
        ] as Guard[],
    } as GuardState,
} as InitialState;


export const guard = createSlice({
    name: "guard",
    initialState,
    reducers: {
        setGuards: (state, action: PayloadAction<Guard[]>) => {
            return {
                value: {
                    guards: action.payload,
                },
            };
        },
        addGuard: (state, action: PayloadAction<Guard>) => {
            state.value.guards.push(action.payload);
            console.log(state.value);
        },
        addBoard: (state, action: PayloadAction<BoardPayload>) => {
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.guardId
            );
            if (guard) {
                guard.boards.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    lists: [] as List[],
                    createdAt: action.payload.createdAt,
                    updatedAt: action.payload.updatedAt,
                });
            }
        },
        addList: (state, action: PayloadAction<ListPayload>) => {
            const board = state.value.guards
                .find((guard) => guard.id === action.payload.guardId)
                ?.boards.find((board) => board.id === action.payload.boardId);
            if (board) {
                board.lists.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    bugs: [] as Bug[],
                    createdAt: action.payload.createdAt,
                    updatedAt: action.payload.updatedAt,
                });
            }
        },
        addBug: (state, action: PayloadAction<BugPayload>) => {
            const list = state.value.guards
                .find((guard) => guard.id === action.payload.guardId)
                ?.boards.find((board) => board.id === action.payload.boardId)
                ?.lists.find((list) => list.id === action.payload.listId);
            console.log(list);
            console.log(action.payload);
            if (list) {
                list.bugs.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    description: action.payload.description,
                    createdAt: action.payload.createdAt,
                    updatedAt: action.payload.updatedAt,
                });
            }
        },

        deleteList: (
            state,
            action: PayloadAction<TempListPayloadForDelete>
        ) => {
            const board = state.value.guards
                .find(
                    (guard) => guard.id === action.payload.resList.board.guardId
                )
                ?.boards.find(
                    (board) => board.id === action.payload.resList.board.id
                );
            if (board) {
                board.lists = board.lists.filter(
                    (list) => list.id !== action.payload.resList.id
                );
            }
        },

        clearGuards: () => {
            return initialState;
        },
    },
});

export const {
    setGuards,
    clearGuards,
    addGuard,
    addBoard,
    addList,
    addBug,
    deleteList,
} = guard.actions;
export default guard.reducer;
