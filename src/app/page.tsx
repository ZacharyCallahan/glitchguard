import { HomeSignupForm } from "@/components/forms.component";
import { Slider } from "@/components/home/slider.component";
import { Slogan } from "@/components/home/slogan.component";
import { Subscription } from "@/components/home/subscription.component";
import { Teaser } from "@/components/home/teaser.component";

export default async function Home() {
    return (
        <>
            <section className="h-screen">
                <Slogan />
                <HomeSignupForm />
                <Teaser />
            </section>
            <section className="h-screen">
                <Slider />
            </section>
            <section className="h-screen">
                <Subscription />
            </section>
        </>
    );
}
