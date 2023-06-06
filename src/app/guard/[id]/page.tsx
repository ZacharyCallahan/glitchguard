import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async ({ params }: ParamsProp) => {
    const id = params.id;

    const guard: Guard = await axios
        .get(`${process.env.NEXTAUTH_URL}/api/getGuard/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));

    return <div>{<h2>{guard.name}</h2>}</div>;
};

export default page;
