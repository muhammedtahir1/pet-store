import { z } from "zod"
import { DEFAULT_PET_IMAGE } from "./constants"

export const petIdSchema = z.string().cuid();

export const petFormSchema = z.object({
	name: z.string().trim().min(1, {
		message: "Name is required"
	}).max(50),

	ownerName : z.string().trim().min(1, {
		message: "Owner name is required"
	}).max(50),

	imageUrl : z.union([z.literal(""), 
		z.string().trim().url({
			message: "Invalid url"
		})
	]),

	age: z.coerce.number().int().positive().max(99),
	notes : z.union([
		z.literal(""),
		z.string().trim().max(500)
	])
}).transform((data)=> ({
	...data, 
	imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
}))

export type TPetForm = z.infer<typeof petFormSchema>