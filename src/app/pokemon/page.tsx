"use client"

import { useEffect, useState } from "react"
import { getAllPokemon } from "@/actions/pokemon"
import { AddManyPokemonButton } from "@/components/AddPokemonButton"
import { DeleteAllPokemonButton } from "@/components/RemovePokemonButton"


type Pokemon = {
  id: number
  name: string
  image: string
  types: string 
  weight: number
  height: number
  abilities: string
}

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [selectedType, setSelectedType] = useState<string>("All")

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getAllPokemon()
      setPokemons(data)
    }
    fetchPokemon()
  }, [])

  // Extract unique types
  const allTypes = Array.from(
    new Set(
      pokemons.flatMap((p) =>
        p.types.split(",").map((t) => t.trim())
      )
    )
  )

  // Filtered by selected type
  const filteredPokemons =
    selectedType === "All"
      ? pokemons
      : pokemons.filter((p) =>
          p.types.split(",").map((t) => t.trim()).includes(selectedType)
        )

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/MTFGvNm.jpg')",
      }}
    >
      <br />
      <main className="p-4 max-w-5xl mx-auto bg-white/50 rounded-xl mt-10 relative">
        <div
          className={
            selectedPokemon
              ? "filter blur-sm brightness-50 transition-all duration-300"
              : "transition-all duration-300"
          }
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-black">
            Pokémon List
          </h1>

       <div className="mb-4 flex justify-center items-center gap-4 flex-wrap">
  <select
    className="border border-gray-300 rounded-md p-2 text-black"
    value={selectedType}
    onChange={(e) => setSelectedType(e.target.value)}
  >
    <option value="All">All Types</option>
    {allTypes.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>

  {pokemons.length === 0 && <AddManyPokemonButton />}
  {pokemons.length > 0 && <DeleteAllPokemonButton />}
</div>


          {filteredPokemons.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No Pokémon found. Press the Add button.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredPokemons.map((p) => (
                <div
                  key={p.id}
                  className="cursor-pointer border rounded-xl p-4 shadow-md bg-white bg-opacity-90 backdrop-blur-sm hover:scale-105 transition-transform"
                  onClick={() => setSelectedPokemon(p)}
                >
                  <img
                    src={p.image || "/placeholder.png"}
                    alt={p.name}
                    className="w-36 h-36 mx-auto mb-2 object-contain"
                  />
                  <h3 className="text-lg text-center font-medium capitalize">
                    {p.name}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedPokemon && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
            <div className="relative w-[420px] h-[590px]">
              <img
                src="/poke-card.png"
                alt="Pokémon card"
                className="absolute inset-0 w-full h-full object-contain z-20"
              />

              <button
                className="absolute top-6 right-8 z-20 text-white text-xl hover:text-red-500"
                onClick={() => setSelectedPokemon(null)}
              >
                ✕
              </button>

              <div className="absolute top-[63px] left-1/2 transform -translate-x-1/2 w-[350px] h-[230px] z-10">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <img
                    src="/poke-background.jpg"
                    alt="Pokemon background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
                  />
                  <img
                    src={selectedPokemon.image || "/placeholder.png"}
                    alt={selectedPokemon.name}
                    className="relative z-20 w-full h-full opacity-300 object-contain p-4"
                  />
                </div>
              </div>

              <h2 className="absolute top-[25px] left-1/2 transform -translate-x-1/2 text-xl drop-shadow-lg font-bold capitalize text-black z-20 ">
                {selectedPokemon.name}
              </h2>

              <div className="absolute bottom-[150px] left-1/2 transform -translate-x-1/2 w-[85%] text-sm text-black font-medium z-20 space-y-1">
                <p>
                  <span className="text-gray-800 font-bold">Height:</span>{" "}
                  {selectedPokemon.height / 10} m
                </p>
                <p>
                  <span className="text-gray-800 font-bold">Weight:</span>{" "}
                  {selectedPokemon.weight / 10} kg
                </p>
                <p>
                  <span className="text-gray-800 font-bold">Type(s):</span>{" "}
                  {selectedPokemon.types}
                </p>
                <p>
                  <span className="text-gray-800 font-bold">Abilities:</span>{" "}
                  {selectedPokemon.abilities}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
