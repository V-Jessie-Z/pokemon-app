import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pokemons = await prisma.pokemon.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(pokemons);
  } catch (error) {
    console.error("❌ Failed to fetch Pokémon:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
