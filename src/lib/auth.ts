import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // If no email or password is provided, return null
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                // Find a user with the provided email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // If no user exists or the password is incorrect, return null
                if (
                    !user ||
                    !(await compare(credentials.password, user.password))
                ) {
                    return null;
                }

                // Return the user object
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    randomKey: "Hey cool",
                };
            },
        }),
    ],
    callbacks: {
        // Update the user to include the id and randomKey
        session: ({ session, token }) => {
            // Get the user from the session
            const { user } = session;
            // Get the id and randomKey from the token
            const { id, randomKey } = token;
            // Create a new user object with the id and randomKey
            const updatedUser = { ...user, id, randomKey };
            // Return the updated session
            return { ...session, user: updatedUser };
        },
        jwt: ({ token, user }) => {
            if (user) {
                // We have a logged in user, so add their user id and random key to the token.

                // Why do we need to cast user as unknown as any?
                // Because the user object doesn't have an id property, but we know it does.
                // So we need to cast it as any to get around that.

                const userAsAny = user as unknown as any;
                return {
                    ...token,
                    id: userAsAny.id,
                    // The user's random key
                    // The user's id is public, so we need a way to verify that the user is who they say they are.
                    randomKey: userAsAny.randomKey,
                };
            }
            // Else, no user is logged in, so just return the token as is.
            return token;
        },
    },
};
