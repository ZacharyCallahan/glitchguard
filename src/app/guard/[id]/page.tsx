import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type pageProps = {
    params: {
        id: string;
    };
};



const page = async ({ params }: pageProps) => {
    const id = params.id;
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const guard: Guard = await axios
        .get(`${process.env.NEXTAUTH_URL}/api/getGuard/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));

    if (!guard?.users.find((u) => u.email === user?.email)) redirect("/");

    return (
        <div>
            {
                <h2>{guard.name}</h2>
            }
        </div>
    );
};

export default page;
