"use client";

import Link from "next/link"
import Logo from "./logo"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const AppHeader = () => {
	const activePath = usePathname()

	const routes = [
		{
			'label': 'Dashboard',
			'path': "/app/dashboard"
		},
		{
			'label': 'Account',
			'path': "/app/account"
		},
	]

	return (


		<header className="flex items-center justify-between border-b border-white/10 py-2">
			<Logo />

			<nav>
				<ul className="flex gap-2 text-xs">
					{routes.map((route) => (
						<li key={route.path}>
							<Link className={cn("text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition", {
								'bg-black/10' : activePath === route.path
							})
							} href={route.path}>{route.label}</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader