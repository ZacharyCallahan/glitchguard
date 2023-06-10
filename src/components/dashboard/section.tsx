"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useAppSelector } from "../../redux/store";

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
        return guards.every((guard) => guard.boards.length);
    }, [guards]);

    // Render the Section component
    return (
        <div>
            <div>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>

            {/* If guardsEnabled is true, render the guards */}
            {guardsEnabled
                ? guards.map(({ id, name }) => (
                      <div key={id}>
                          <Link href={`/guard/${id}`}>{name}</Link>
                      </div>
                  ))
                : // If guardsEnabled is false, render the boards if allBoardsEmpty is false
                  !allBoardsEmpty &&
                  guards.flatMap((guard) =>
                      guard.boards.map((board) => (
                          <div key={board?.id}>
                              <Link
                                  href={`/guard/${guard.id}/board/${board?.id}`}>
                                  {board?.name}
                              </Link>
                          </div>
                      ))
                  )}
        </div>
    );
};
