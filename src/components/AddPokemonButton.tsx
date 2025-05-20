'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { fetchAndStoreManyPokemon } from '@/actions/pokemonActions'

export function AddManyPokemonButton() {
  const [isPendingTransition, startTransition] = useTransition()
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleClick = () => {
    setIsPending(true)
    startTransition(async () => {
      await fetchAndStoreManyPokemon()
      setMessage('✅ 100 Pokémon added successfully! Refresh to explore them.')
      router.refresh()
      setIsPending(false)
    })
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleClick}
        disabled={isPending || isPendingTransition}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending || isPendingTransition ? 'Adding...' : 'Add Pokémon'}
      </button>
      {message && (
        <p className="text-sm text-green-700 bg-white px-3 py-1 rounded shadow">
          {message}
        </p>
      )}
    </div>
  )
}
