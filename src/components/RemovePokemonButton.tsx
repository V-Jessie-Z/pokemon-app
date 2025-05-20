'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteAllPokemon } from '@/actions/pokemon'

export function DeleteAllPokemonButton() {

  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleDelete = () => {
    // Confirm with the user before deleting all Pokémon from the database
    const confirmDelete = confirm("Are you sure you want to delete ALL Pokémon?")
    if (!confirmDelete) return 

    setIsPending(true) // Show loading state (disable button and show "Removing...")

    // Call server action to delete all Pokémon, then handle UI update
    deleteAllPokemon().then(() => {
      setMessage('🗑️ All 100 Pokémon deleted successfully. Refresh to start again.')
      router.refresh()

      // Turn off loading state
      setIsPending(false)
    })
  }

  return (
    <div className="flex items-center gap-4">
      {/* Button to trigger delete action, disabled while deleting */}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {/* Show loading text while deleting, else default text */}
        {isPending ? 'Removing...' : 'Remove All Pokémon'}
      </button>

      {/* Display message confirming deletion */}
      {message && (
        <p className="text-sm text-red-700 bg-white px-3 py-1 rounded shadow">
          {message}
        </p>
      )}
    </div>
  )
}
