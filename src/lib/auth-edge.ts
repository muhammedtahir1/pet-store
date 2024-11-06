//@ts-nocheck

import { NextAuthConfig } from "next-auth"

export const nextAuthEdgeConfig = {
    pages: {
        signIn: "/login",
    },
    // session: {
    //     maxAge: 30 * 24 * 60 * 60,
    //     strategy: "jwt"
    // },
    callbacks: {
        authorized: ({ request, auth }) => {
            // runs on every req with middleware
            const isTryingToAccessApp = request.nextUrl.pathname.includes("/app")
            const isLoggedIn = Boolean(auth?.user)

            if (!isLoggedIn && isTryingToAccessApp) {
                return false
            }
            if (isLoggedIn && isTryingToAccessApp) {
                return true
            }
            if (!isLoggedIn && !isTryingToAccessApp) {
                return true
            }
            if (isLoggedIn && !isTryingToAccessApp) {
                return Response.redirect(new URL("/app/dashboard", request.nextUrl))
            }

            return false
        },
        jwt: ({ token, user }) => {
            if (user) {
                token.userId = user.id
            }
            return token;
        },
        session: ({ session, token }) => {
            if (session.user) {
                session.user.id = token.userId
            }

            return session
        }
    },
    providers: [],
} satisfies NextAuthConfig