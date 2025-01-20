# Country Information Display App
## Project overview
Create a modern single-page application (SPA) that combines country information display with AI-powered features.
## Setup instructions
- clone the repository `git clone https://github.com/andrewpatasik/countryinfoapp.git` or `gh repo clone andrewpatasik/countryinfoapp`
- `cd` into the repository and run `yarn` or `npm install` at the terminal
- run `yarn run dev` or `npm run dev` and visit `http://localhost:3000` to open the app
## Available features
- Sign-in using Google OAuth
- See collection of countries and it's detail
- Responsive screen on mobile
- [Not Complete] Chat with AI (result only on terminal)
## Technical decisions and architecture
This project built using React ecosystem which are:
- Next.js
- Tailwind CSS/Shadcn UI
- Typescript
- React hooks

The other tools that being used:
- Apollo Client/GraphQL
- Next Auth

The decisions to use Next.js is because the framework comes with optimization out of the box, paired with shadcn UI the development process will be more productive and optimized. Typescript is used to maintain the typed-safe of the code which makes the code less bug and to catch error easily. 

Next.js also effective to run Node-based or Server-side code for the task which using NVIDIA NIM API, by creating route handlers to create the API and the client-side can call the API easily.

Shadcn UI is a component-based library which has a vast of React-based component, Shadcn UI makes the view of the app looks proper and clean out of the box on all screen size.

Apollo Client is state management to simplified GraphQL data management to implement Next Auth for Google authentication.
## Future improvements
There are aspects that could be improved, such as implementing **aggregator pattern** for modules/components into one main file, so when it gets imported in file, it will be bundled into one line to make the code structure more clean. 

The next improvement should be **error handling** for page render states to show proper error page, another improvement is implementing **skeleton** loader for card component when the data is on loading.

The next one is implementing **pagination** for data fetching to make the app execution time faster.

On the chatbot with AI part, there are some parts that still missing such as response from the API is not displayed yet, then there should be typing animation when data stream is coming from the API response.