import { Section } from "../../../components/dashboard/section";


const page = () => {

    return (
        <Section
            title="Your Boards"
            content="Here are all your boards!"
            guardsEnabled={false}
        />
    );
};

export default page;
