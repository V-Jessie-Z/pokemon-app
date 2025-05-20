// app/api/add-pokemon/route.ts
import { NextResponse } from 'next/server'
import { fetchAndStoreManyPokemon } from '@/actions/pokemonActions'

export async function POST() {
  const results = await fetchAndStoreManyPokemon(100)
  console.log('💾 Stored Pokémon:', results.map(p => p?.name))

  return NextResponse.json({ success: true, count: results.length })
}
