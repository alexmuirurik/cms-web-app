import "next-auth/jwt"
import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma/prisma"

export const config = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHub,
		Google,
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: (credentials) => {
				const user = {
					username: 'alexmuiruri',
					email: 'content@alexmuiruri.com'
				}
				return user 
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role
			}
			return token
		},
		async session({ session, token }) {
			if(token && session.user) {
				session.user.role = token.role
			}
			return session
		},
	},
	debug: false,
	secret: process.env.NEXTAUTH_SECRET, // To be added
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
