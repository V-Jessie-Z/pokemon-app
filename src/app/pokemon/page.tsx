import { getAllPokemon } from "@/actions/pokemon"
import { AddManyPokemonButton } from "@/components/AddPokemonButton"

type Pokemon = {
  id: number
  name: string
  image: string
  types: string
  weight: number
  height: number
  abilities: string

}

export default async function PokemonList() {
  const pokemons: Pokemon[] = await getAllPokemon()

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://wallpapercave.com/wp/MTFGvNm.jpg')",
      }}
    >
           <br></br>
      <main className="p-4 max-w-5xl mx-auto  bg-white/50 rounded-xl mt-10">
   
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Pokémon List</h1>

        <div className="mb-8 text-center">
          <AddManyPokemonButton />
        </div>

        {pokemons.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No Pokémon found. Use the button above to add some.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pokemons.map((p) => (
              <div
                key={p.id}
                className="border rounded-xl p-4 shadow-sm bg-white bg-opacity-80 backdrop-blur-sm hover::"
              >
                <img
                  src={p.image || '/placeholder.png'}
                  alt={p.name}
                  className="w-20 h-20 mx-auto mb-2 object-contain"
                />
                <h3 className="text-lg text-center font-medium capitalize">{p.name}</h3>
                <p className="text-sm text-gray-700">Height: {p.height/10} m</p>
                <p className="text-sm text-gray-700">Weight : {p.weight/10} kg</p>
                <p className="text-sm text-gray-700">Type(s): {p.types}</p>
                 <p className="text-sm text-gray-700">Abilities: {p.abilities}</p>
                
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
