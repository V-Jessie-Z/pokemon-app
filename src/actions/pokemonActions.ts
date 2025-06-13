'use server';


import axios from 'axios'
import { prisma } from '@/lib/prisma'
import { PokemonSchema } from '@/lib/zodSchemas'


//Function to fetch Pokemon data from the API and save it to the database
export async function fetchAndStoreManyPokemon(limit: number = 100) {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

  //Fetches array of Pokemon data from API
  const promises = Array.from({ length: limit }, (_, i) => i + 1).map(async (id) => {
    try {
      const res = await axios.get(`${baseUrl}${id}`)
      console.log(`✅ Fetched Pokémon #${id}: ${res.data.name}`)

      //Validates data using Zod
      const parsed = PokemonSchema.safeParse(res.data)

      if (parsed.success) {
        const { name, abilities, height, weight, types, sprites } = parsed.data
        
        //Saves each Pokemon to the database using PRISMA
        const saved = await prisma.pokemon.upsert({
          where: { name },
          update: {
            height,
            weight,
            abilities: abilities.map(a => a.ability.name).join(', '),
            types: types.map(t => t.type.name).join(', '),
            image: sprites.front_default ?? '',
          },
          create: {
            name,
            height,
            weight,
            abilities: abilities.map(a => a.ability.name).join(', '),
            types: types.map(t => t.type.name).join(', '),
            image: sprites.front_default ?? '',
          },
        })

        console.log(`💾 Saved to DB: ${saved.name}`)
        return saved
        //Error handling
      } else {
        console.warn(`❌ Zod validation failed for Pokémon #${id}`, parsed.error.format())
        return null
      }
    } catch (err) {
      console.error(`❌ Error fetching or saving Pokémon #${id}`, err)
      return null
    }
  })

  //Return saved Pokemon
  const results = await Promise.all(promises)
  console.log(`✅ Done: ${results.filter(Boolean).length} Pokémon saved to DB`)
  return results.filter(Boolean)
}



//Function that deletes all Pokemon data from the database
export async function deleteAllPokemon() {
  try {
    const deleted = await prisma.pokemon.deleteMany({})
    console.log(`🗑️ Deleted ${deleted.count} Pokémon from DB`)
    return deleted
  } catch (error) {
    console.error('❌ Failed to delete Pokémon:', error)
    throw error
  }
}