import { Toaster } from "@/src/components/ui/toaster"
import "./globals.css"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import NextTopLoader from "nextjs-toploader"

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: "SlackApp",
	description: "This is a slackapp to manage your writers",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en" theme-mode="white-content" className="bg-zinc-100">
			<body className={nunito.className}>
				<NextTopLoader height={1} color="rgb(19 78 74 /1)" />
				{children}
				<Toaster />
			</body>
		</html>
	)
}
