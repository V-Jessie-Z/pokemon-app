"use client";

import Link from "next/link";

export default function PokemonHome() {
  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover relative overflow-hidden px-4 sm:px-8"
      style={{
        backgroundImage: "url('/home.jpeg')",
        paddingTop: "40px",
      }}
    >
      {/* Backdrop Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Main Content */}
      <div className="z-10 relative text-center text-white max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white/20 backdrop-blur-md shadow-xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-wider text-yellow-300 drop-shadow-lg animate-bounce">
          Catch. Train. Explore.
        </h1>

        <br />

        <p className="mt-4 text-base sm:text-xl text-white/90 font-medium leading-relaxed">
          Step into a world where dreams become battles, and battles become legends. Pokémon trainers roam far and wide, catching powerful creatures, forming lifelong bonds, and challenging the greatest to become Champions. From the fiery roar of Charizard to the electric shock of Pikachu, each Pokémon is waiting to prove itself — with you as its partner.
        </p>

        {/* Pokeball Divider */}
        <div className="my-6 flex justify-center items-center">
          <img
            src="/Pokeball.png"
            className="w-24 sm:w-40 h-24 sm:h-40"
            alt="Pokeball"
          />
        </div>

        <p className="mt-4 text-base sm:text-xl text-white/90 font-medium leading-relaxed">
          Pokémon are mysterious creatures with extraordinary powers. Some breathe fire, others control time, and some are as small as a key. They live in harmony with humans, helping with everything from battles to construction to companionship. Each one has a type, a story, and a soul — making the Pokémon world endlessly rich and fascinating.
        </p>

        <br />

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-6 flex-wrap">
          <Link href="/pokemon">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full shadow-md transition-all animate-pop">
              View Pokédex
            </button>
          </Link>
        </div>
      </div>

      {/* Floating Images */}
      <img
        src="/Salamence.png"
        alt="Flying Salamence"
        className="absolute left-4 sm:left-20 top-20 sm:top-32 w-24 sm:w-80 animate-float z-10"
      />
      <img
        src="/Charizard.png"
        alt="Charizard in battle stance"
        className="absolute right-4 sm:right-10 top-14 sm:top-20 w-24 sm:w-80 animate-float-slow z-10"
      />

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pop {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-pop {
          animation: pop 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}
