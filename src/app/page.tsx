import { HomeSignupForm } from "@/components/forms";
import { Slider } from "@/components/home/slider";
import { Slogan } from "@/components/home/slogan";
import { Subscription } from "@/components/home/subscription";
import { Teaser } from "@/components/home/teaser";

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
