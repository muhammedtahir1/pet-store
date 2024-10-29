## Full stack project

#### Resources
1. Component / UI Library
    - radix ui
    - Shadcn
    - Material ui
    - magic ui

2. State management
    - Context API
    - Zustand
    - Redux

-> Context api - all the states will be at one place i.e inside a context provider 
    - you can use this in the files that needs interactivity
    - pros : every page need not be client component, only the necessary ones will be - with the help of context provider

-> Revalidate Path - 
    - import from next/cache
    - to reload the page after making changes in the database
        because the ui will be changed only after a reload

-> useFormStatus -
    - integrated with server actions
    - const {pending} = useFormStatus()
    - gives pending state to display while the data is being manipulated ex: add & then loading button

-> useOptimistic - 
    - it is similar to useState
    - why do we need to use this? 
        - in a full stack application, when the user performs CRUD operation, the actions will take some time to store the data into the database, then later fetch the updated data and optimize the UI. So this is a bad user experience to wait for so long.
    - what we do to solve this problem?
        - in most of the cases the operation is going to be successfull, so we just display the data within a fraction of time, while in the backend the actual data processes.

    - working
        1. it takes two parameters - initial data, 2nd is a function that contains the prev(state) data and the new data
        2. it returns the prev data combining with new data

        ```tsx
            const [optimisticList, setOptimisticList] = useOptimistic(data, (state, newData)=>{
                return [...state, newData]
            })

            // use setOptimisticList before any server action
            handleAdd(newData){
                setOptimisticList(newData)
                // ...server action
            }

            // use optimisticList 
        ```

        - Note : 
            Even if something goes wrong in the database, and the ui changes are already made using optimistic ui. No worries it will check whether the data has been successfully added into the db, if not it will remove the ui.
        - Downside :
            It will be glitchy when you try to access the data very fast - right after the ui is changed using optimistic ui. Its because it will take some time to revalidate the path, and store the actual data. It will be absolutely fine after that


-> Omit - 
    It is a typescript feature which is used to omit few things from an existing type, and use this new type somewhere else
    Ex: Here it omits id from type Pet

    ```tsx
    addPet(newPet : Omit<Pet, "id">)    

    // getting one thing out of a type
    deletePet(petId : Pet["id"])
    ```

3. User database model

- Hashed Password:
    If you store the email & password directly in the database, and the database is compromised - the person will get the access to the user details (which is not good)

    So hashing password means - the password is stored in some strange string, and there will be a secret key to decode that string. So the password of the user will be safe even the data gets leaked (unless the hacker gets hold to the secret key that is used to decode the hashedPassword)

    - hackers may find the original password ex: through brute force 

    - NPM package -> bcrypt : used to hash passwords (to safely store a password)  


- Types of relations in prisma - 3
    1. One-to-one (also called 1-1 relations)
    2. One-to-many (also called 1-n relations)
    3. Many-to-many (also called m-n relations)

    - Ex: One to many
    ```tsx

    model User{
        id      @id     @default(cuid()) 
        ...
        pets    Pet[]
    }

    model Pet {
        ...
        User    User    @relation(fields: [userId], references: [id])
        userId  String
    }

    ```

- Difference between (after modifying the schema)
    prisma db push      and      prisma migrate dev
    (written in notes)

4. Next Auth