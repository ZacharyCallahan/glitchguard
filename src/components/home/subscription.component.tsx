import { SubscriptionCard } from "../card.component";

export const Subscription = () => {
    return (
        <div className="space-y-12">
            <div className="text-center">
                <h2>
                    Want to upgrade your Guard? Check-out the subscriptions
                    below.
                </h2>
                <p>
                    Developers always love additional {'"'}features{'"'}...
                </p>
            </div>
            <div className="flex justify-evenly">
                <SubscriptionCard
                    title="Free"
                    content="The free plan is for those who want to try out Guard."
                    monthly={0}
                    yearly={0}
                    learnMoreLink="/"
                    subscribeLink="/"
                />
                <SubscriptionCard
                    title="Free"
                    content="The free plan is for those who want to try out Guard."
                    monthly={0}
                    yearly={0}
                    learnMoreLink="/"
                    subscribeLink="/"
                />
                <SubscriptionCard
                    title="Free"
                    content="The free plan is for those who want to try out Guard."
                    monthly={0}
                    yearly={0}
                    learnMoreLink="/"
                    subscribeLink="/"
                />
                <SubscriptionCard
                    title="Free"
                    content="The free plan is for those who want to try out Guard."
                    monthly={0}
                    yearly={0}
                    learnMoreLink="/"
                    subscribeLink="/"
                />
            </div>
        </div>
    );
}
