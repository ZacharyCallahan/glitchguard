import { Section } from "./section";

export const Dashboard = () => {
    return (
        <div className="space-y-6">
            <Section
                title="Your Guards"
                content="What guard are you going to working on today?"
            />
            <Section
                title="Your Boards"
                content="Get going with your most used boards!"
            />
        </div>
    );
};
