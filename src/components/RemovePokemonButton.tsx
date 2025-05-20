'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteAllPokemon } from '@/actions/pokemon'

export function DeleteAllPokemonButton() {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete ALL Pokémon?")
    if (!confirmDelete) return

    setIsPending(true)
    deleteAllPokemon().then(() => {
      setMessage('🗑️ All 100 Pokémon deleted successfully. Refresh to start again.')
      router.refresh()
      setIsPending(false)
    })
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {isPending ? 'Removing...' : 'Remove All Pokémon'}
      </button>
      {message && (
        <p className="text-sm text-red-700 bg-white px-3 py-1 rounded shadow">
          {message}
        </p>
      )}
    </div>
  )
}
