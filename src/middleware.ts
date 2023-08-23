export { default } from "next-auth/middleware";

export const config = {
  // https://next-auth.js.org/configuration/options#nextauthjs-options
  matcher: [
    "/profile",
    "/api",
    "/dashboard",
    "/dashboard/:path*",
    "/guard",
    "/guard/:path*",
  ],
  // matcher: ["/((?!register|api|login).*)"],
};
