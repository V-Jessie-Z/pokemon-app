# Pokémon Bestiary

A modern Pokémon encyclopedia built using Next.js 15, TypeScript, Prisma, PostgreSQL (Neon), Server Actions, Zod, and Shadcn/UI. Browse and search Pokémon with a fast, responsive UI and clean developer experience.

---

## 🚀 Features

- 🔍 Browse and search Pokémon
- ⚡ Fast server-side logic via Server Actions
- 🛠️ Integrated PostgreSQL via Prisma ORM
- ✅ Schema validation with Zod
- 🎨 Beautiful UI using Tailwind and Shadcn/UI


## 📸 Screenshots

- Landing Page
![Landing Page](./public/Home.png)

- Pokemon Grid Page
![Pokemon Grid Page](./public/PokemonList.png)

- Pokemon Card Page
![Pokemon Card Page](./public/Card.png)
---

## 🧱 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Database**: PostgreSQL (via Neon)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev)
- **Fonts**: [Geist](https://vercel.com/font)
- **Deployment**: [Vercel](https://vercel.com)

---

## 📦 Getting Started

### 1. Clone the Repository

git clone https://github.com/V-Jessie-Z/pokemon-app.git
cd pokemon-app

### 2. Install dependencies

- npm install
# or
- yarn install
# or
- pnpm install

### 3. Environment Variables

- Create an env. file in the root directory of the project
- DATABASE_URL="postgresql://neondb_owner:npg_lQO81FvNPkBm@ep-yellow-frost-a44dkxnw-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

## 🧠Prisma 

### 1. Generate Prisma Client

- npx prisma generate

### 2. Run migration

- npx prisma migrate dev --name init
  
- PS. If you get an error, try restarting your visual studio code so that the enviromental variables can load
- If that doesn't work run this:
#### npx prisma migrate dev --name init --url="postgresql://neondb_owner:npg_lQO81FvNPkBm@ep-yellow-frost-a44dkxnw-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"


### 3. Inspect the databse

- npx prisma studio


## 💻Running the App Locally

- npm run dev
# or
- yarn dev
# or
- pnpm dev
# or
-bun dev


✅ Then visit: http://localhost:3000

