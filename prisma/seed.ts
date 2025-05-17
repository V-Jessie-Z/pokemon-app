// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';


const prisma = new PrismaClient();

// Define the Zod schema
const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  abilities: z.array(z.object({
    ability: z.object({
      name: z.string(),
    }),
  })),
  types: z.array(z.object({
    type: z.object({
      name: z.string(),
    }),
  })),
});

// Fetch and save Pokémon data
async function fetchAndSavePokemon(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  const parsed = pokemonSchema.safeParse(data);

  if (!parsed.success) {
    console.error(`Validation failed for Pokémon ID ${id}`, parsed.error);
    return;
  }

  const { name, abilities, types } = parsed.data;

  await prisma.seed.upsert({
    where: { name },
    update: {},
    create: {
      name,
      abilities: abilities.map((a) => a.ability.name),
      types: types.map((t) => t.type.name),
    },
  });

  console.log(`Saved Pokémon: ${name}`);
}

async function main() {
  for (let i = 1; i <= 10; i++) {
    // Fetch first 10 Pokémon for simplicity
    await fetchAndSavePokemon(i);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
