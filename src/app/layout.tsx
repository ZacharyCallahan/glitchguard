import { Footer } from "@/components/footer";
import { GlobalNav } from "@/components/navs";
import { Rubik } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";

const rubik = Rubik({ subsets: ["cyrillic"] });

export const metadata = {
    title: "Create Next App",
    description: "Create Next App with TypeScript",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                />
            </head>
            <body className={`${rubik.className}`}>
                <NextAuthProvider>
                    <GlobalNav />
                    {children}
                    <Footer />
                </NextAuthProvider>
            </body>
        </html>
    );
}
