# 1337 take-home

<p align="center">
  <a href="https://tretton37.com/who-we-are" target="blank"><img src="./public/logo.svg" width="120" alt="1337 Logo" /></a>
</p>

## Install and run

```bash
# Install
npm install
# or
yarn

# Run
npm run dev
# or
yarn dev
```

> Notera att du måste lägga till en **.env.local** fil i roten av projektet med en **url** och **token** key.

## Tech stack

1. Typescript
2. Next.js
3. SCSS
4. TailwindCSS
5. Axios

Jag valde denna stack för att jag har en väldigt stor preferens för Typescript över Javascript då det hjälper mig vara säker i koden jag skriver och nästan alltid slutar i att jag blir klar snabbare. Next.js gör mitt liv som React utvecklare mycket enklare och producerar en bättre slutprodukt mot slut användaren, i just denna uppgift verkade det också ganska logiskt att använda det då jag kommer ha många statiska sidor för alla kollegor. SCSS var vald då det gör allt CSS gör men mer och bättre, så att använda vanlig CSS verkar som en dålig idé samt att det inte finns något extra steg för att använda det förutom att installera **sass** från NPM. Tailwind används enbart i [Toolbar.tsx](./components/Toolbar.tsx.tsx) och [List.tsx](./components/List.tsx) för att jag valde att använda ListBox komponenten från [HeadlessUI](https://headlessui.dev/react/listbox) för att spara tid. Axios gör det bara enklare att jobba med API endpoints.

## Important files

1. [index.tsx](./pages/index.tsx) - Fetches all colleagues with the specified filters and sort specifications
2. [[email].tsx](./pages/[email].tsx) - Statically renders all colleagues pages
3. [Colleague.ts](./types/Colleague.ts) - Defines the structure of a colleague

## Features and functional requirements

Inte allting var implementerat som exempelvis tests då jag valde att fokusera på att göra en snygg hemsida som funkade bra. Jag har ingen direkt support mot färgblinda förutom att majoriteten av sidan är svart och vit vilket gör det enklare för någon med syn nedsättning att använda den. Sidan är helt responsiv och funkar på alla storlekar, detta var relativt enkelt då jag har mycket erfarenhet med att bygga responsiva layouts och kunde därmed följa många bra **best practices** jag lärt mig genom åren. Det finns **screen reader** support på ett par ställen så som bilder med en **alt** tag, HTML taggar med semantic mening men även i [List.tsx](./components/List.tsx) filen använder jag mig utav **sr-only** klassen för att beskriva vad denna listan är till för. Man kan sortera alla kollegor med deras namn men även filtrera dem med deras kontor, båda dessa kan kombineras. Jag hann inte lägga till så att man kan toggla mellan en list och grid view. Hela projektet är hostat med Vercel som sätter upp CI/CD från detta GitHub repo.
