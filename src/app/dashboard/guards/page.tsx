import { Section } from "@/components/dashboard/section.component";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";

type Guard = {
    id: number;
    name: string;
    createdAt: String;
    updatedAt: String;
}[];

const page = async () => {
    const session = await getServerSession(authOptions);

    const guards: Guard = await axios
        .get(`${process.env.NEXTAUTH_URL}/api/getUsersGuards`, {
            params: {
                session,
            },
        })
        .then((res) => res.data);

    return (
        <Section
            title="Your Guards"
            content="Here are all your Guards!"
            data={guards}
        />
    );
};

export default page;
