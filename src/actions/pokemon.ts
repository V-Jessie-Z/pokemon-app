'use server'

import { prisma } from '@/lib/prisma'

export async function getAllPokemon() {
  try {
    const pokemons = await prisma.pokemon.findMany({
      orderBy: { id: 'asc' },
    })
    return pokemons
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    return []
  }
}
