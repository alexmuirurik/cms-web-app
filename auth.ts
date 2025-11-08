import 'next-auth/jwt'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Resend from 'next-auth/providers/resend'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma/prisma'
import { UserRole } from '@prisma/client'

export const config = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub,
        Google,
        Resend({
            apiKey: process.env.AUTH_RESEND_KEY,
            from: process.env.ADMIN_EMAIL,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const writer = await prisma.writer.findUnique({
                where: { email: user.email as string },
                include: { user: true },
            })

            user.role = writer ? UserRole.WRITER : UserRole.ADMIN

            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role
            }
            return session
        },
    },
    debug: false,
    secret: process.env.NEXTAUTH_SECRET, // To be added
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
