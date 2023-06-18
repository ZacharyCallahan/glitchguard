"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useAppSelector } from "../../redux/store";
import {
    DeleteBoardButton,
    DeleteGuardButton,
    EditBoardButton,
    EditGuardButton,
} from "../buttons";
import DisplayBoard from "./DisplayBoard";
import DisplayGuard from "./DisplayGuard";

// Define the props for the Section component
type SectionProps = {
    title: string;
    content: string;
    guards?: Guard[];
    guardsEnabled?: boolean;
};

// Define the Section component
export const Section = ({
    title,
    content,
    guardsEnabled = false,
}: SectionProps) => {
    // Get the guards from the Redux store
    const guards = useAppSelector((state) => state.guardReducer.value.guards);

    // Use useMemo to memoize the boards and allBoardsEmpty values only when the guards change
    const allBoardsEmpty = useMemo(() => {
        // Check if all the boards are empty/undefined
        return guards.every((guard) => !guard.boards.length);
    }, [guards]);

    const allGuardsEmpty = useMemo(() => {
        // Check if all the guards are empty/undefined
        return !guards.length;
    }, [guards]);

    // Render the Section component
    return (
        <div className="">
            <div>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
            <div className="grid grid-cols-dashboard-fluid gap-6 mt-6 ">
                {/* If guardsEnabled is true, render the guards */}
                {guardsEnabled
                    ? guards.map(({ id, name }) => (
                          <DisplayGuard key={id} id={id} name={name} />
                      ))
                    : // If guardsEnabled is false, render the boards if allBoardsEmpty is false
                      !allBoardsEmpty &&
                      guards.flatMap((guard) =>
                          guard.boards.map(({ name, id }) => (
                              <DisplayBoard
                                  key={id}
                                  guardId={guard.id}
                                  name={name}
                                  id={id}
                              />
                          ))
                      )}
            </div>
            {/* If guardsEnabled is false and allBoardsEmpty is true, render a message */}
            {!guardsEnabled && allBoardsEmpty && (
                <div>
                    <p>No boards found.</p>
                </div>
            )}

            {/* If guardsEnabled is false and allGuardsEmpty is true, render a message */}
            {guardsEnabled && allGuardsEmpty && (
                <div>
                    <p>No guards found.</p>
                </div>
            )}
        </div>
    );
};
