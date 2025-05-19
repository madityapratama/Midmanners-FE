import React from "react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white p-6 flex flex-col items-center justify-center">
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold text-orange-400">MIDMANNERS</h1>
        <nav className="space-x-6 text-white text-lg">
          <a href="#" className="hover:text-orange-400 transition">Home</a>
          <a href="#" className="hover:text-orange-400 transition">Sign up</a>
          <a href="#" className="hover:text-orange-400 transition">About</a>
          <a href="#" className="hover:text-orange-400 transition">Service</a>
          <a href="#" className="hover:text-orange-400 transition">Contact</a>
          <a href="#" className="hover:text-orange-400 transition">Community</a>
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
      </section>

      <section className="mt-20">
        <img
          src="/controller-illustration.png"
          alt="Game Controller"
          className="w-full max-w-md mx-auto animate-bounce"
        />
      </section>
    </main>
  );
}