import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearGuards } from "./guard-slice";

type InitialState = {
    value: AuthState;
};

type AuthState = {
    isLoggedIn: boolean;
    user: User;
};

const initialState = {
    value: {
        isLoggedIn: false,
        user: {
            id: "",
            name: "",
            email: "",
            createdAt: "",
            updatedAt: "",
        } as User,
    } as AuthState,
} as InitialState;

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            return {
                value: {
                    isLoggedIn: true,
                    user: action.payload,
                }
            };
        },
        logout: () => {
            clearGuards();
            return initialState;
        },
    },
});

export const { login, logout } = auth.actions;
export default auth.reducer;