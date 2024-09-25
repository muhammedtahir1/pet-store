"use client"

import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { usePetContext } from '@/lib/hooks'

type PetFormProps = {
    actionType : 'add' | "edit",
    onFormSubmission: ()=> void;
}

export default function PetForm({
    actionType,
    onFormSubmission,
} : PetFormProps) {


    const {handleAddPet, selectedPet, handleEditPet} = usePetContext()

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const pet = {
            name : formData.get("name") as string,
            ownerName : formData.get("ownerName") as string,
            imageUrl : formData.get("imageUrl") as string || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
            age : +(formData.get("age") as string),
            notes : formData.get("notes") as string,
        }
        
        if(actionType === "add"){
            handleAddPet(pet);
        }
        else if(actionType === "edit") {
            handleEditPet(selectedPet!.id, pet)
        }

        onFormSubmission();

    }


  return (
    <form className='flex flex-col'  onSubmit={handleSubmit}>
        <div className='space-y-3'>
        <div className='space-y-1'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' name='name'  type='text' required defaultValue={
                actionType === "edit" ? selectedPet?.name : ""
            }/>
        </div>
        <div className='space-y-1'>
            <Label htmlFor='ownerName'>Owner Name</Label>
            <Input id='ownerName' name='ownerName' type='text' required defaultValue={
                actionType === "edit" ? selectedPet?.ownerName : ""
            }/>
        </div>
        <div className='space-y-1'>
            <Label htmlFor='imageUrl'>Image Url</Label>
            <Input id='imageUrl' name='imageUrl' type='text' defaultValue={
                actionType === "edit" ? selectedPet?.imageUrl : ""
            }/>
        </div>
        <div className='space-y-1'>
            <Label htmlFor='age'>Age</Label>
            <Input id='age' name='age' type='number' required defaultValue={
                actionType === "edit" ? selectedPet?.age : ""
            }/>
        </div>
        <div className='space-y-1'>
            <Label htmlFor='notes'>Notes</Label>
            <Textarea id='notes' name='notes' rows={3} required defaultValue={
                actionType === "edit" ? selectedPet?.notes : ""
            }/>
        </div>
        </div>

        <Button className='mt-5 self-end' type='submit'>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
        </Button>


    </form>
  )
}