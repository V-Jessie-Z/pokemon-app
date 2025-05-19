'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { fetchAndStoreManyPokemon } from '@/actions/pokemonActions'

export function AddManyPokemonButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      await fetchAndStoreManyPokemon()
      router.refresh() // ✅ refresh the current route
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {isPending ? 'Adding...' : 'Add Pokémon'}
    </button>
  )
}
