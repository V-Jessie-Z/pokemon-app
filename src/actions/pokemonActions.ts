'use server'

import axios from 'axios'
import { prisma } from '@/lib/prisma'
import { PokemonSchema } from '@/lib/zodSchemas'

export async function fetchAndStoreManyPokemon(limit: number = 1000) {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

  const promises = Array.from({ length: limit }, (_, i) => i + 1).map(async (id) => {
    try {
      const res = await axios.get(`${baseUrl}${id}`)
      console.log(`✅ Fetched Pokémon #${id}: ${res.data.name}`)

      const parsed = PokemonSchema.safeParse(res.data)

      if (parsed.success) {
        const { name, abilities, height, weight, types, sprites } = parsed.data

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
      } else {
        console.warn(`❌ Zod validation failed for Pokémon #${id}`, parsed.error.format())
        return null
      }
    } catch (err) {
      console.error(`❌ Error fetching or saving Pokémon #${id}`, err)
      return null
    }
  })

  const results = await Promise.all(promises)
  console.log(`✅ Done: ${results.filter(Boolean).length} Pokémon saved to DB`)
  return results.filter(Boolean)
}
