
export const runtime = 'nodejs';
import { NextResponse } from 'next/server'
import { fetchAndStoreManyPokemon } from '@/actions/pokemonActions'
import { prisma } from '@/lib/prisma';

//Handles POST request to API, automates seeding process
export async function POST() {
  const results = await fetchAndStoreManyPokemon(100)
  console.log('💾 Stored Pokémon:', results.map(p => p?.name))

  return NextResponse.json({ success: true, count: results.length })
}

export async function GET() {
  try {
    const pokemons = await prisma.pokemon.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(pokemons);
  } catch (error) {
    console.error("❌ Failed to fetch Pokémon:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }}

  