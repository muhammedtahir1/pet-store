import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import bcrypt from "bcryptjs"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "./server-utils"
import { authSchema } from "@/lib/validations"

const config = {
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
                //@ts-ignore
                session.user.id = token.userId
            }

            return session
        }
    },
    //
    providers: [
        Credentials({
            //@ts-ignore
            async authorize(credentials) {
                // runs on login

                // validation
                const validatedFormData = authSchema.safeParse(credentials)

                if (!validatedFormData.success) {
                    return null
                }

                // extract values
                const { email, password } = validatedFormData.data

                const user = await getUserByEmail(email)

                if (!user) {
                    console.log("No user found");
                    return null
                }

                const passMatch = await bcrypt.compare(password, user.hashedPassword)

                if (!passMatch) {
                    console.log("Invalid Password");
                    return null
                }

                return user

            }
        })
    ],

} satisfies NextAuthConfig

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(config)