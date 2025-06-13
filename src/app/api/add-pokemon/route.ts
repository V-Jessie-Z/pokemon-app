
export const runtime = 'nodejs';
import { NextResponse } from 'next/server'
import { fetchAndStoreManyPokemon } from '@/actions/pokemonActions'

//Handles POST request to API, automates seeding process
export async function POST() {
  const results = await fetchAndStoreManyPokemon(100)
  console.log('💾 Stored Pokémon:', results.map(p => p?.name))

  return NextResponse.json({ success: true, count: results.length })
}
