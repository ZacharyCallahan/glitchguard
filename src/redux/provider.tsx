"use client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    // Render the 'Provider' component, passing in the 'store' object as a prop which
    // will make the Redux store available to the 'children' components

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>
        </Provider>
    );
};

export default ReduxProvider;
