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
            // Set the guards in the state to the guards that were passed in
            return {
                value: {
                    guards: action.payload,
                },
            };
        },
        addGuard: (state, action: PayloadAction<Guard>) => {
            // Add the guard to the state
            state.value.guards.push(action.payload);
        },
        addBoard: (state, action: PayloadAction<BoardPayload>) => {
            // Find the guard with the id that matches the board's guardId
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.guardId
            );

            // If the guard exists, add the board to the guard's boards array
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
        // Add a list to a board
        addList: (state, action: PayloadAction<ListPayload>) => {
            // Find the guard the list belongs to
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.guardId
            );

            // Find the board the list belongs to
            const board = guard.boards.find(
                (board) => board.id === action.payload.boardId
            );

            // If the board exists, add the list to the board
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
            // Find the list to which the bug is being added
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.guardId
            );
            // Find the board to which the bug is being added
            const board = guard.boards.find(
                (board) => board.id === action.payload.boardId
            );
            // Find the list to which the bug is being added
            const list = board.lists.find(
                (list) => list.id === action.payload.listId
            );
            console.log(action.payload);
            // Add the bug to the list
            list.bugs.push({
                id: action.payload.id,
                name: action.payload.name,
                description: action.payload.description,
                assignedUsers: [] as User[],
                color: action.payload.color,
                createdById: action.payload.createdById,
                deadline: action.payload.deadline,
                priority: action.payload.priority,
                status: action.payload.status,
                createdAt: action.payload.createdAt,
                updatedAt: action.payload.updatedAt,
            });
        },
        deleteGuard: (
            state,
            action: PayloadAction<TempGuardPayloadForDelete>
        ) => {
            // Delete the guard that was passed in from the state
            state.value.guards = state.value.guards.filter(
                (guard) => guard.id !== action.payload.guardId
            );
        },

        deleteBoard: (
            state,
            action: PayloadAction<TempBoardPayloadForDelete>
        ) => {
            // Find the guard in the state that matches the guard that was
            // passed in.
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.guardId
            );

            // If the guard was found, delete the board that was passed in
            // from the guard.
            if (guard) {
                guard.boards = guard.boards.filter(
                    (board) => board.id !== action.payload.boardId
                );
            }
        },

        deleteList: (
            state,
            action: PayloadAction<TempListPayloadForDelete>
        ) => {
            // Find the board that matches the board that was passed in.
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.resList.board.guardId
            );
            // Find the board that matches the board that was passed in.
            const board = guard?.boards.find(
                (board) => board.id === action.payload.resList.board.id
            );
            // If the board was found, delete the list that was passed in
            if (board) {
                board.lists = board.lists.filter(
                    (list) => list.id !== action.payload.resList.id
                );
            }
        },

        deleteBug: (state, action: PayloadAction<TempBugPayloadForDelete>) => {
            // Find the list that matches the list that was passed in.
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.guardId
            );
            // Find the board that matches the board that was passed in.
            const board = guard?.boards.find(
                (board) => board.id === action.payload.boardId
            );
            // Find the list that matches the list that was passed in.
            const list = board?.lists.find(
                (list) => list.id === action.payload.listId
            );
            // If the list was found, delete the bug that was passed in
            if (list) {
                list.bugs = list.bugs.filter(
                    (bug) => bug.id !== action.payload.bugId
                );
            }
        },

        editGuard: (state, action: PayloadAction<Guard>) => {
            // Find the guard that matches the guard that was passed in.
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.id
            );
            // If the guard was found, edit the guard that was passed in
            if (guard) {
                guard.name = action.payload.name;
            }
        },

        editBoard: (state, action: PayloadAction<BoardPayload>) => {
            // Find the guard that matches the guard that was passed in.
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.guardId
            );
            // Find the board that matches the board that was passed in.
            const board = guard?.boards.find(
                (board) => board.id === action.payload.id
            );
            // If the board was found, edit the board that was passed in
            if (board) {
                board.name = action.payload.name;
            }
        },

        editList: (state, action: PayloadAction<ListPayload>) => {
            // Find the guard that matches the guard that was passed in.
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.guardId
            );
            // Find the board that matches the board that was passed in.
            const board = guard?.boards.find(
                (board) => board.id === action.payload.boardId
            );
            // Find the list that matches the list that was passed in.
            const list = board?.lists.find(
                (list) => list.id === action.payload.id
            );
            // If the list was found, edit the list that was passed in
            if (list) {
                list.name = action.payload.name;
            }
        },

        editBug: (state, action: PayloadAction<BugPayload>) => {
            // Find the guard that matches the guard that was passed in.
            const guard = state.value.guards.find(
                (guard) => guard.id === action.payload.guardId
            );
            // Find the board that matches the board that was passed in.
            const board = guard?.boards.find(
                (board) => board.id === action.payload.boardId
            );
            // Find the list that matches the list that was passed in.
            const list = board?.lists.find(
                (list) => list.id === action.payload.listId
            );
            // Find the bug that matches the bug that was passed in.
            const bug = list?.bugs.find((bug) => bug.id === action.payload.id);
            // If the bug was found, edit the bug that was passed in
            if (bug) {
                bug.name = action.payload.name;
                bug.description = action.payload.description;
                bug.assignedUsers = action.payload.assignedUsers;
                bug.color = action.payload.color;
                bug.deadline = action.payload.deadline;
                bug.status = action.payload.status;
                bug.priority = action.payload.priority;
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
    deleteGuard,
    deleteBoard,
    deleteList,
    deleteBug,
    editGuard,
    editBoard,
    editList,
    editBug,
} = guard.actions;
export default guard.reducer;
