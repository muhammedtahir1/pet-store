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