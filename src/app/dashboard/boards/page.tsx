

import { Section } from "../../../components/dashboard/section";


const page = async () => {

    return (
        <Section
            title="Your Boards"
            content="Here are all your boards!"
            guardsEnabled={false}
        />
    );
};

export default page;
