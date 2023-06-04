import { DashboardNav } from "@/components/navs.component.";

const dashboardlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="flex gap-12 m-auto w-5/6">
            <DashboardNav />
            <section className="border-2 border-black p-6 w-full">{children}</section>
        </section>
    );
};

export default dashboardlayout;
