import 'next-auth/jwt'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Resend from 'next-auth/providers/resend'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma/prisma'
import { UserRole } from '@prisma/client'
import { getCompany } from './actions/companyController'
import {
    getEditorById,
    getWriterByEmail,
    getWriterByID,
} from './actions/userController'

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
            const writer = await getWriterByEmail(user.email as string)
            const editor = await getEditorById(user.id as string)
            
            if (writer) {
                user.role = UserRole.WRITER
                user.companyId = writer.companyId
            }

            if (editor) {
                user.role = UserRole.EDITOR
                user.companyId = editor.companyId
            }

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

            if (!session.user.companyId && session.user.role) {
                if (session.user.role === UserRole.ADMIN) {
                    const company = await getCompany(session.user.id)
                    session.user.companyId = company?.id
                }

                if (session.user.role === UserRole.WRITER) {
                    const writer = await getWriterByID(session.user.id)
                    session.user.companyId = writer?.companyId
                }

                if (session.user.role === UserRole.EDITOR) {
                    const editor = await getEditorById(session.user.id)
                    session.user.companyId = editor?.companyId
                }
            }

            return session
        },
    },
    debug: false,
    secret: process.env.NEXTAUTH_SECRET, // To be added
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
