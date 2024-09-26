"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { useState, createContext, useOptimistic } from "react"
import { toast } from "sonner";

type PetContextProviderProps = {
    data: Pet[],
    children: React.ReactNode
}

type TPetContext = {
    pets: Pet[],
    selectedPetId: Pet['id'] | null;
    selectedPet: Pet | undefined;
    handleCheckoutPet: (id: Pet['id']) => void;
    handleAddPet: (newPet: PetEssentials) => Promise<void>;
    handleEditPet: (petId: Pet['id'], newPetData: PetEssentials) => Promise<void>;
    handleChangeSelectedPetId: (id: Pet['id']) => void;
    numberOfPets: number
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider(
    { data, children }: PetContextProviderProps) {

    // state
    // const [pets, setPets] = useState(data)

    const [optimisticPets, setOptimisticPets] = useOptimistic(data , (state, {action , payload})=> {
        switch(action){
            case "add" : 
                return [...state, {...payload, id: Math.random().toString()}];
            
            case "edit" :
                return state.map((pet)=> {
                    if(pet.id === payload.id){
                        return {...pet, ...payload.newPetData};
                    }
                    return pet;
                });
            
            case "delete" : 
                return state.filter((pet)=> pet.id !== payload.id);
                
            default : 
                return state
        }
    })
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

    // derived state
    const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId)
    const numberOfPets = optimisticPets.length

    // event handlers / actions

    const handleEditPet = async (petId: Pet['id'], newPetData:PetEssentials) => {
        // setPets((prev) =>
        //     prev.map((pet) => {
        //         if (pet.id === petId) {
        //             return {
        //                 id: petId,
        //                 ...newPetData,
        //             }
        //         }
        //         return pet
        //     }))

        setOptimisticPets({action : "edit", payload : {id : petId, newPetData}})

        const error = await editPet(petId, newPetData);
        if (error) {
            toast.warning(error.message);
            return;
        }
    }

    const handleAddPet = async (newPet: PetEssentials) => {
        // setPets((prev) => [...prev, {
        //     id: Date.now().toString(),
        //     ...newPet
        // },
        // ])

        setOptimisticPets({action : "add", payload : newPet})

        const error = await addPet(newPet);
        if (error) {
            toast.warning(error.message);
            return;
        }

    }

    const handleCheckoutPet = async (petId: Pet['id']) => {

        setOptimisticPets({action : "delete", payload : petId})

        const error = await deletePet(petId)
        if(error){
            toast.warning(error.message)
        }
        setSelectedPetId(null)
    }

    const handleChangeSelectedPetId = (id: string) => {
        setSelectedPetId(id)
    }

    return (
        <PetContext.Provider value={{
            pets : optimisticPets,
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
