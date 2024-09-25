"use client";

import { usePetContext } from '@/lib/hooks'
import { Pet } from '@/lib/types';
import Image from 'next/image'
import React, { useTransition } from 'react'
import PetButton from './pet-button';
import { deletePet } from '@/actions/actions';

export default function PetDetails() {

  const { selectedPet } = usePetContext()

  return (
    <section className='flex flex-col h-full w-full'>

      {!selectedPet ? (
          <EmptyView /> 
      ) : (
        <>
          <TopBar pet={selectedPet} />

          <OtherInfo pet={selectedPet} />

          <Notes pet={selectedPet} />

        </>
      )}


    </section>
  )
}


type Props = {
  pet: Pet;
}


function TopBar({ pet }: Props) {

  const {handleCheckoutPet} = usePetContext();
  const [isPending, startTransition] = useTransition();

  return (
    <div className='flex items-center bg-white px-8 py-5 border-b border-light'>
      <Image
        src={pet?.imageUrl as string}
        alt='Selected pet image'
        width={75}
        height={75}
        className='w-[75px] h-[75px] rounded-full object-cover'
      />
      <h2 className='text-3xl font-semibold ml-5 leading-7'>{pet?.name}</h2>

      <div className='ml-auto space-x-2'>
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton actionType='checkout' disabled={isPending}  onClick={()=> {
          startTransition(async()=> {
            await deletePet(pet.id)
          })
        }}>Checkout</PetButton>
      </div>
    </div>
  )
}

function OtherInfo({ pet }: Props) {
  return (
    <div className='flex justify-around py-10 px-5 text-center'>
      <div>
        <h3 className='text-[13px] font-medium uppercase text-zinc-700'>Owner name</h3>
        <p className='mt-1 text-lg text-zinc-800'>{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className='text-[13px] font-medium uppercase text-zinc-700'>Age</h3>
        <p className='mt-1 text-lg text-zinc-800'>{pet?.age}</p>
      </div>

    </div>
  )
}

function Notes({ pet }: Props) {
  return (
    <section className='flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light'>
      {pet?.notes}
    </section>
  )
} 

function EmptyView(){
  return <p className='h-full flex items-center justify-center text-2xl font-medium'>No pet selected</p>
}