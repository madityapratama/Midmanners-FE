import React from "react";
import { Gamepad2, Sparkles, Users2, Globe2, Info, Home } from "lucide-react";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0e1a36] to-[#1a274e] text-white flex flex-col items-center justify-center">
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <h1 className="text-3xl font-extrabold text-orange-400">MIDMANNERS</h1>
        <nav className="space-x-6 text-white text-lg flex items-center">
          <a href="#" className="flex items-center gap-1 hover:text-orange-400 transition"><Home size={20}/>Home</a>
          <a href="#" className="flex items-center gap-1 hover:text-orange-400 transition"><Sparkles size={20}/>Sign up</a>
          <a href="#" className="flex items-center gap-1 hover:text-orange-400 transition"><Info size={20}/>About</a>
          <a href="#" className="flex items-center gap-1 hover:text-orange-400 transition"><Gamepad2 size={20}/>Service</a>
          <a href="#" className="flex items-center gap-1 hover:text-orange-400 transition"><Globe2 size={20}/>Contact</a>
          <a href="#" className="flex items-center gap-1 hover:text-orange-400 transition"><Users2 size={20}/>Community</a>
        </nav>
      </header>

      <section className="text-center mt-16 max-w-3xl">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-pink-500 to-purple-500 mb-6">
          E-SPORT GAME
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Temukan dunia game yang kompetitif dan menyenangkan bersama komunitas kami.
          Ikuti turnamen, tingkatkan skill-mu, dan jadilah legenda di dunia e-sport!
        </p>
        <button onClick={()=>{router.push('auth/login')}} className="text-lg px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg transition">
          Get Started Now
        </button>
      </section>

      <section className="mt-20">
        <img
          src="/controller-illustration.png"
          alt="Game Controller"
          className="w-full max-w-md mx-auto animate-fade-in"
        />
      </section>
    </main>
  );
}
