'use server';



import { prisma } from '@/lib/prisma'


//Function to get all pokemon data from the database using PRISMA
export async function getAllPokemon() {
  try {
    const pokemons = await prisma.pokemon.findMany({
      orderBy: { id: 'asc' },
    })
    return pokemons
  } catch (error) {
    console.error('❌ Error fetching Pokémon:', error)
    return []
  }
}


//Function to delete all pokemon data from the database using PRISMA
export async function deleteAllPokemon() {
  try {
    const result = await prisma.pokemon.deleteMany({})
    console.log(`🗑️ Deleted ${result.count} Pokémon from DB`)
    return result
  } catch (error) {
    console.error('❌ Error deleting Pokémon:', error)
    throw error
  }
}
