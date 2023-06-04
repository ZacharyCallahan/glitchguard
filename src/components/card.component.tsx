import Link from "next/link";

type SubscriptionCardProps = {
    title: string;
    content: string;
    monthly: number;
    yearly: number;
    learnMoreLink: string;
    subscribeLink: string;
};

export const SubscriptionCard = ({
    title,
    content,
    monthly,
    yearly,
    learnMoreLink,
    subscribeLink,
}: SubscriptionCardProps) => (
    <div className="text-center space-y-12 border-2 border-black p-6 w-72">
        <div className="space-y-3">
            <h2>{title}</h2>
            <h3>{content}</h3>
        </div>
        <div>
            <p>${monthly} /monthly</p>
            <p> or</p>
            <p>${yearly} /yearly</p>
        </div>
        <div className="flex flex-col gap-3">
            <Link href={learnMoreLink}>Learn More</Link>
            <Link href={subscribeLink}>Subscribe</Link>
        </div>
    </div>
);
