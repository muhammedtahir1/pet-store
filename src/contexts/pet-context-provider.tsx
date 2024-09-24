"use client";

import { Pet } from "@/lib/types";
import { useState , createContext} from "react"

type PetContextProviderProps = {
    data: Pet[],
    children : React.ReactNode
}

type TPetContext = {
    pets : Pet[],
    selectedPetId : string | null;
    selectedPet : Pet | undefined ;
    handleChangeSelectedPetId : (id : string) => void;
    numberOfPets : number
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({data , children} : PetContextProviderProps) {

    // state
    const [pets, setPets] = useState(data)
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

    // derived state
    const selectedPet = pets.find((pet) => pet.id === selectedPetId)
    const numberOfPets = pets.length

    // event handlers / actions
    const handleChangeSelectedPetId = (id : string) => {
        setSelectedPetId(id)
    }

  return (
    <PetContext.Provider value={{
        pets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
        numberOfPets
    }}>
        {children}
    </PetContext.Provider>
  )
}
