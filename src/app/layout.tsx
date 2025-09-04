import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Headline Widget Demo – Editable, Animated, Customizable Text",
	description:
		"A modern React + TypeScript + Tailwind + Framer Motion demo project. Create stunning editable headlines with gradient fills, typography controls, animations, and exportable JSON settings.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<main>
					{children}
					<footer className="mx-auto max-w-6xl px-4 py-10 text-center text-xs text-slate-500">
						Built with{" "}
						<span className="font-semibold">
							React + TypeScript + Tailwind + Framer Motion
						</span>
					</footer>
				</main>
			</body>
		</html>
	);
}
