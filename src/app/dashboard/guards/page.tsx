import { Section } from "@/components/dashboard/section.component";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";



const page = async () => {
    const session = await getServerSession(authOptions);

    const guards: Guard[] = await axios
        .get(`${process.env.NEXTAUTH_URL}/api/get/users/guard`, {
            params: {
                session,
            },
        })
        .then((res) => res.data);

    return (
        <Section
            title="Your Guards"
            content="Here are all your Guards!"
            guards={guards}
            guardsEnabled={true}
        />
    );
};

export default page;
