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
                where: {
                    email: user.email as string,
                },
                include: {
                    user: true,
                },
            })

            user.role = writer ? UserRole.WRITER : UserRole.ADMIN
            user.companyId = writer?.companyId ?? undefined
            return true
        },

        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }

            if (user.role === UserRole.ADMIN) {
                const company = await prisma.company.findFirst({
                    where: {
                        owner: {
                            id: user.id,
                        },
                    },
                    include: {
                        owner: true,
                    },
                })

                token.companyId = company?.id ?? undefined
            }

            if (user.role === UserRole.WRITER) {
                const writer = await prisma.writer.findFirst({
                    where: {
                        id: user.id,
                    },
                    include: {
                        user: true,
                    },
                })

                token.companyId = writer?.companyId ?? undefined
            }

            if (user.role === UserRole.EDITOR) {
                const editor = await prisma.editor.findFirst({
                    where: {
                        id: user.id,
                    },
                    include: {
                        user: true,
                    },
                })

                token.companyId = editor?.companyId ?? undefined
            }

            return token
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role
                session.user.companyId = token.companyId as string
            }
            return session
        },
    },
    debug: false,
    secret: process.env.NEXTAUTH_SECRET, // To be added
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
