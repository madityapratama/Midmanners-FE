import { Search, Gamepad2, Menu, Sword, Coins, Gem } from "lucide-react";
import Image from "next/image"; // Import Image dari Next.js untuk optimasi gambar
import { useRouter } from 'next/router';

export default function LandingPage() {
  // Fungsi untuk scroll ke about section dengan smooth
  function scrollToAbout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }
  const router = useRouter();

  // Fungsi untuk navigasi ke halaman Sign Up
  const handleLogin = () => {
    router.push('/auth/login')
  };

  const handleSignUp = () => {
    router.push('/auth/signUp')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-zinc-900 to-indigo-800 text-white">
      {/* Header sticky */}
      <header className="sticky top-0 z-50 bg-transparent flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-3xl font-bold font-calsans">MIDMANNERS</div>
        <nav className="hidden md:flex space-x-6 text-sm uppercase tracking-wide items-center">
          <a
            href="#about"
            onClick={scrollToAbout}
            className="hover:text-indigo-500 font-poppins font-semibold"
          >
            About
          </a>
          <button
            onClick={handleLogin}
            className="bg-zinc-900 hover:bg-indigo-500 text-white px-4 py-2 rounded-full font-semibold font-poppins transition"
          >
            LOGIN
          </button>
        </nav>
        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-20 max-w-7xl mx-auto">
        {/* Left Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-3xl uppercase tracking-widest text-indigo-200 font-calsans">
            Marketplace Game
          </p>
          <h1 className="text-9xl font-black text-indigo-200 mt-2 mb-4 font-calsans">
            Trade
            <br />
            With Trust
          </h1>
          <p className="text-indigo-200 mb-6 font-poppins">
            Platform terpercaya untuk jual beli item game online. Transaksi aman, cepat, 
            dan dengan harga terbaik di pasar.
          </p>
          <button 
            onClick={handleSignUp}
            className="bg-zinc-950 hover:bg-indigo-500 px-6 py-3 rounded-full font-semibold transition font-poppins"
          >
            Let's Get Started
          </button>
        </div>

        {/* Right Illustration - Gambar jual beli item game */}
        <div className="w-full md:w-1/2 flex justify-center relative mb-10 md:mb-0">
          <div className="rounded-3xl p-6 border-4 border-cyan-500 bg-[#2a1c45] relative overflow-hidden w-96 h-96 flex items-center justify-center">
            {/* Ilustrasi jual beli item game */}
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-600 p-4 rounded-full">
                  <Sword size={40} className="text-white" />
                </div>
                <div className="bg-pink-500 p-4 rounded-full -ml-4">
                  <Coins size={40} className="text-white" />
                </div>
                <div className="bg-cyan-500 p-4 rounded-full -ml-4">
                  <Gem size={40} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Item Game Terpopuler</h3>
              <p className="text-indigo-200">Skin, Currency, Account, dan banyak lagi!</p>
            </div>
            
            {/* Efek background */}
            <div className="w-40 h-40 rounded-full bg-purple-600 blur-2xl absolute -top-10 -left-10 opacity-30"></div>
            <div className="w-40 h-40 rounded-full bg-pink-400 blur-2xl absolute -bottom-10 -right-10 opacity-30"></div>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto px-6 py-20 mt-20 bg-gradient-to-tr from-indigo-800 via-zinc-900 to-indigo-950 shadow-lg relative overflow-hidden text-center"
      >
        <h2 className="text-7xl font-bold font-calsans mb-6 text-indigo-200 drop-shadow-lg">
          About Us
        </h2>
        <p className="text-indigo-200 font-poppins max-w-3xl text-lg leading-relaxed mb-8">
          MIDMANNERS adalah platform terpercaya untuk jual beli item game online. 
          Kami menyediakan sistem escrow yang aman, harga kompetitif, dan 
          dukungan untuk berbagai game populer. Bergabunglah dengan komunitas kami!
        </p>
        <button 
          onClick={handleSignUp}
          className="bg-zinc-950 hover:bg-indigo-500 px-8 py-4 rounded-full font-semibold font-poppins transition shadow-lg"
        >
          Join the Community
        </button>

        {/* Decorative Blurs */}
        <div className="w-60 h-60 rounded-full bg-pink-500 blur-3xl absolute top-[-100px] left-[-100px] opacity-30"></div>
        <div className="w-60 h-60 rounded-full bg-purple-700 blur-3xl absolute bottom-[-100px] right-[-100px] opacity-30"></div>
      </section>
    </div>
  );
}