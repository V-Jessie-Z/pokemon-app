import { getAllPokemon } from "@/actions/pokemon"
import { AddManyPokemonButton } from "@/components/AddPokemonButton"



type Pokemon = {
  id: number
  name: string
  image: string
  types: string
  abilities: string
}

export default async function HomePage() {
  const pokemons: Pokemon[] = await getAllPokemon()

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pokémon List</h1>

      <div className="mb-8">
        <AddManyPokemonButton />
      </div>

      {pokemons.length === 0 ? (
        <p className="text-muted-foreground">
          No Pokémon found. Use the button above to add some.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pokemons.map((p) => (
            <div key={p.id} className="border rounded-xl p-4 shadow-sm bg-white">
              <img
                src={p.image || '/placeholder.png'}
                alt={p.name}
                className="w-20 h-20 mx-auto mb-2 object-contain"
              />
              <h3 className="text-lg text-center font-medium capitalize">{p.name}</h3>
              <p className="text-sm text-gray-700">Type(s): {p.types}</p>
              <p className="text-sm text-gray-700">Abilities: {p.abilities}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
