import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";
import { checkAuth, getPetsByUserId } from "@/lib/server-utils";

export default async function Layout({ children }: { children: React.ReactNode }) {

	const session = await checkAuth()

	// console.log(session.user);	

	const pets = await getPetsByUserId(session.user.id)
	

	// const response = await fetch("https://bytegrad.com/course-assets/projects/petsoft/api/pets")
	// if (!response.ok) {
	// 	throw new Error("Could not fetch pets")
	// }
	// const data: Pet[] = await response.json()

	return (
		<>
			<BackgroundPattern />

			<div className="flex flex-col min-h-screen max-w-[1050px] mx-auto px-4">
				<AppHeader />
				
				<SearchContextProvider>
					<PetContextProvider data={pets}>
						{children}
					</PetContextProvider>
				</SearchContextProvider>

				<AppFooter />
			</div>

			<Toaster position="top-right"/>
		</>
	)
}
