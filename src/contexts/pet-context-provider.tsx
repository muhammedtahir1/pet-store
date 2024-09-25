"use client";

import { addPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import { useState, createContext } from "react"

type PetContextProviderProps = {
    data: Pet[],
    children: React.ReactNode
}

type TPetContext = {
    pets: Pet[],
    selectedPetId: string | null;
    selectedPet: Pet | undefined;
    handleCheckoutPet: (id: string) => void;
    handleChangeSelectedPetId: (id: string) => void;
    handleAddPet: (newPet: Omit<Pet, "id">) => void;
    handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => void;
    numberOfPets: number
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider(
    { data : pets, children }: PetContextProviderProps) {

    // state
    // const [pets, setPets] = useState(data)
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

    // derived state
    const selectedPet = pets.find((pet) => pet.id === selectedPetId)
    const numberOfPets = pets.length

    // event handlers / actions

    const handleEditPet = (petId: string, newPetData: Omit<Pet, "id">) => {
        setPets((prev) =>
            prev.map((pet) => {
                if (pet.id === petId) {
                    return {
                        id: petId,
                        ...newPetData,
                    }
                }
                return pet
            }))
    }

    const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
        // setPets((prev) => [...prev, {
        //     id: Date.now().toString(),
        //     ...newPet
        // },
        // ])
        
        await addPet(newPet);

    }

    const handleCheckoutPet = (id: string) => {
        setPets((prev) => prev.filter(pet => pet.id !== id))
        setSelectedPetId(null)
    }

    const handleChangeSelectedPetId = (id: string) => {
        setSelectedPetId(id)
    }

    return (
        <PetContext.Provider value={{
            pets,
            selectedPetId,
            selectedPet,
            handleChangeSelectedPetId,
            handleCheckoutPet,
            handleAddPet,
            handleEditPet,
            numberOfPets
        }}>
            {children}
        </PetContext.Provider>
    )
}
