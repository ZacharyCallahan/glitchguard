"use client";
import { useAppSelector } from "../../../redux/store";

const Page = ({ params }: ParamsProp) => {
    const id = parseInt(params.id);
    const guard = useAppSelector((state) =>
        state.guardReducer.value.guards.find((guard) => guard.id === id)
    );

    return <div>{<h2>{guard.name}</h2>}</div>;
};

export default Page;
