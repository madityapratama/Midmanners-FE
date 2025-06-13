import { Menu, Sword, Coins, Gem, Twitter, Instagram, Facebook, ShieldCheck, Zap, Heart } from "lucide-react";
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
  
  function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <header className="sticky top-0 z-50 bg-transparent flex justify-between items-center px-4 sm:px-6 py-4 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="text-2xl sm:text-3xl font-bold font-calsans">MIDMANNERS</div>
        <nav className=" md:flex space-x-6 text-sm uppercase tracking-wide items-center">
          <a
            href="#about"
            onClick={scrollToAbout}
            className="hover:text-indigo-500 font-poppins font-semibold transition-colors"
          >
            About
          </a>
          <button
            onClick={handleLogin}
            className="bg-zinc-900 hover:bg-indigo-500 text-white px-4 py-2 rounded-full font-semibold font-poppins transition-colors"
          >
            LOGIN
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 py-12 md:py-20 max-w-7xl mx-auto">
        {/* Left Text */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <p className="text-xl sm:text-2xl md:text-3xl uppercase tracking-widest text-indigo-200 font-calsans">
            Marketplace Game
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-indigo-200 mt-2 mb-4 font-calsans leading-tight">
            Trade
            <br />
            With Trust
          </h1>
          <p className="text-indigo-200 mb-6 font-poppins text-sm sm:text-base max-w-md mx-auto md:mx-0">
            Platform terpercaya untuk jual beli item game online. Transaksi aman, cepat, 
            dan dengan harga terbaik di pasar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={handleSignUp}
              className="bg-zinc-950 hover:bg-indigo-500 px-6 py-3 rounded-full font-semibold transition-colors font-poppins"
            >
              Lets Get Started
            </button>
            <button 
              onClick={scrollToAbout}
              className="border border-indigo-500 hover:bg-indigo-500/20 px-6 py-3 rounded-full font-semibold transition-colors font-poppins"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Illustration - Gambar jual beli item game */}
        <div className="w-full md:w-1/2 flex justify-center relative mb-10 md:mb-0">
          <div className="rounded-3xl p-4 sm:p-6 border-4 border-cyan-500 bg-[#2a1c45] relative overflow-hidden w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            {/* Ilustrasi jual beli item game */}
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="bg-purple-600 p-3 sm:p-4 rounded-full">
                  <Sword size={32} className="text-white" />
                </div>
                <div className="bg-pink-500 p-3 sm:p-4 rounded-full -ml-4">
                  <Coins size={32} className="text-white" />
                </div>
                <div className="bg-cyan-500 p-3 sm:p-4 rounded-full -ml-4">
                  <Gem size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Item Game Terpopuler</h3>
              <p className="text-indigo-200 text-sm sm:text-base">Skin, Currency, Account, dan banyak lagi!</p>
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
        className="min-h-screen flex flex-col justify-center items-center mx-auto px-4 sm:px-6 py-20 mt-10 md:mt-20 bg-gradient-to-tr from-indigo-800 via-zinc-900 to-indigo-950 shadow-lg relative overflow-hidden text-center"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-calsans mb-6 text-indigo-200 drop-shadow-lg">
          About Us
        </h2>
        <p className="text-indigo-200 font-poppins max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed mb-8">
          MIDMANNERS adalah platform terpercaya untuk jual beli item game online. 
          Kami menyediakan mekanisme transaksi yang aman, harga kompetitif, dan 
          dukungan untuk berbagai game populer. Bergabunglah dengan komunitas kami!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl px-4">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-indigo-900/50">
            <div className="bg-indigo-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <ShieldCheck size={24} className="text-indigo-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">Aman</h3>
            <p className="text-indigo-200 text-sm">Menggunakan midman untuk melindungi transaksi Anda</p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-indigo-900/50">
            <div className="bg-pink-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Zap size={24} className="text-pink-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">Cepat</h3>
            <p className="text-indigo-200 text-sm">Proses transaksi hanya dalam hitungan menit</p>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-indigo-900/50">
            <div className="bg-cyan-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <Heart size={24} className="text-cyan-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">Terpercaya</h3>
            <p className="text-indigo-200 text-sm">Ribuan transaksi sukses setiap hari</p>
          </div>
        </div>
        <button 
          onClick={handleSignUp}
          className="bg-zinc-950 hover:bg-indigo-500 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold font-poppins transition-colors shadow-lg"
        >
          Join the Community
        </button>

        {/* Decorative Blurs */}
        <div className="w-60 h-60 rounded-full bg-pink-500 blur-3xl absolute top-[-100px] left-[-100px] opacity-30"></div>
        <div className="w-60 h-60 rounded-full bg-purple-700 blur-3xl absolute bottom-[-100px] right-[-100px] opacity-30"></div>
      </section>

      {/* Beautiful Footer */}
      <footer className="bg-zinc-900/80 border-t border-indigo-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold font-calsans mb-4">MIDMANNERS</h3>
              <p className="text-indigo-200 text-sm sm:text-base mb-6">
                Platform terbaik untuk jual beli item game online dengan keamanan dan kenyamanan terjamin.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-indigo-300 hover:text-indigo-500 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-indigo-300 hover:text-indigo-500 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-indigo-300 hover:text-indigo-500 transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider">Links</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    onClick={scrollToTop}
                    className="text-indigo-200 hover:text-indigo-500 text-sm sm:text-base transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    onClick={scrollToAbout}
                    className="text-indigo-200 hover:text-indigo-500 text-sm sm:text-base transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-indigo-200 hover:text-indigo-500 text-sm sm:text-base transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-indigo-200 hover:text-indigo-500 text-sm sm:text-base transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-indigo-200 hover:text-indigo-500 text-sm sm:text-base transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-indigo-200 hover:text-indigo-500 text-sm sm:text-base transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-indigo-200 hover:text-indigo-500 text-sm sm:text-base transition-colors">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-indigo-200 hover:text-indigo-500 text-sm sm:text-base transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-indigo-900/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-indigo-300 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} MIDMANNERS. All rights reserved.
            </p>
            {/* <div className="flex space-x-6">
              <img src="/payment-visa.svg" alt="Visa" className="h-6 opacity-70" />
              <img src="/payment-mastercard.svg" alt="Mastercard" className="h-6 opacity-70" />
              <img src="/payment-paypal.svg" alt="PayPal" className="h-6 opacity-70" />
              <img src="/payment-bitcoin.svg" alt="Bitcoin" className="h-6 opacity-70" />
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}