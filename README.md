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

4. Next Auth - Authjs (now)

note: a lot of boiler plate & configuration to set up auth js

#### Flow - LOGIN
- The user is already created in the database
    - now, we need to send the form data / user data from login form to the server.
    - the formData is then verified with the gmail & hashed password present in the database
    - the hashed password is decrypted to compare it with the formData
    - if the user credentials are credible
- next auth has a function called signIn -> helps to set a cookie env into the client browser and send a JSON web token
    - so that the user does not have to repeatedly enter its credentials, while requesting the authenticated route.
    - the server will directly check the token present in the clients browser, if its legit, the user will be allowed to access authenticated routes.


#### next auth config
check auth.ts files
```tsx
// auth.ts
import NextAuth, { NextAuthConfig } from "next-auth"

const config = {
    pages: {
        signIn: "/login",
    },
    session: {
        maxAge: 30 * 24 * 60 * 60,
        strategy: "jwt"
    },
    callbacks: {
        authorized: ({request})=> {
            const isTryingToAccessApp = request.nextUrl.pathname.includes("/app")
            if(isTryingToAccessApp){
                return false
            }else{
                return true
            }
        }
    },
    providers: [],

} satisfies NextAuthConfig

export const {auth} = NextAuth(config)
```

- Generate auth secret from OpenSSL using git bash - command
-> openssl rand -base64 32

-> Pros of using Server actions 
- "action" attribute
- progressive enhancement
- does not have 

-> Authjs
- Note: 
    - It just provides `login / signIn` and `signOut` functions
    - it does not provide function to create a new user i.e `signUp`
        - we need to manually create a user and give him a cookie token using `signIn` function


5. Connect pet -> users
    - in prisma schema
    - 



6. difference btw 
    - server-only package : it is an npm package and it is used to make sure that the component code runs only on server.
    used as ->  import "server-only"

    - use server : Inbuild and makes the component as server action, which will run only on server

7. Loading state 
    - while using action attribute
    - hook -> useFormStatus()

    ```tsx
        const {pending} = useFormStatus()

        <Button disabled={pending}>
            login/signin
        </Button>
    ```

8. Loading state (2)
    - using useTransition hook
    - it gives pending state (boolean), while some function is being performed
        - how to use
        - wrap startTransition function onto any function
        - then use isPending state on the button

    
    ```tsx
        const [isPending, startTransition] = useTransition()

        <Button 
            disabled={isPending}
            
            onClick(()=>{
                startTransition(async ()=> {
                    await logOut()
                })
            })
        >
            SignOut
        </Button>
    ```

9. Hook to display error message
    - useFormState()
    - kinda complex

