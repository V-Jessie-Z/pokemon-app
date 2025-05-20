"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Function triggered when button is clicked
  const handleClick = () => {
    setLoading(true) // Show loading animation

    // After 2 seconds, navigate to /pokemon page
    setTimeout(() => {
      router.push("/pokemon")
    }, 2000)
  }

  return (
    <main
 
      className="relative min-h-screen bg-cover bg-center text-black flex justify-center pt-55 overflow-hidden"
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/wp12857066.jpg')",
      }}
    >
     
      <div className="bg-white/0 p-10 rounded-xl text-center max-w-xl shadow-lg ">
        {/* Page title */}
        <h1 className="text-5xl text-white font-extrabold mb-6 drop-shadow-lg">
          Welcome to the PokéWorld
        </h1>
        <br />

        {/* Button to trigger loading animation and navigate to Pokémon list */}
        <button
          onClick={handleClick}
          className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full shadow-2xl transition duration-300 animate-glow"
        >
          View Pokémon List
        </button>
      </div>

      {/* Show loading animation only when loading state is true */}
      {loading && (
        <>
          {/* Loading Bar */}
          <div className="absolute bottom-4 left-10 right-10 h-4 bg-gray-300 rounded-full overflow-hidden z-40">
       
            <div className="h-full bg-yellow-400 animate-loading-bar" />
          </div>

          {/* Pikachu running GIF that animates across the screen */}
          <img
            src="https://media.tenor.com/SH31iAEWLT8AAAAi/pikachu-running.gif"
            alt="Pikachu Running"
            className="absolute bottom-10 left-[-100px] w-24 animate-pikachu-run z-50"
          />
        </>
      )}
    </main>
  )
}
