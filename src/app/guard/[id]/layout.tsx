import GuardNav from "@/components/navs/GuardNav";
import axios from "axios";
import React from "react";

type layoutProps = {
    params: {
        id: string;
    };
    children: React.ReactNode;
};

const layout = async ({ params, children }: layoutProps) => {
    const id = params.id;
    const guard: Guard = await axios
        .get(`${process.env.NEXTAUTH_URL}/api/getGuard/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    return (
        <div className="flex items-center">
            <GuardNav guard={guard} />
            {children}
        </div>
    );
};

export default layout;
