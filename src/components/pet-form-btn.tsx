import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";


export default function PetFormBtn({actionType}) {

    const {pending} = useFormStatus()

    return (
        <Button className='mt-5 self-end' disabled={pending} type='submit'>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
        </Button>
    )
}
