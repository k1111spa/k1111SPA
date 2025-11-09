import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 px-4 overflow-hidden relative">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="text-center max-w-3xl relative z-10">
        {/* Logo with animation */}
        <div className="mb-8 animate-bounce-slow">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KLIFE1111-logo-OrZz7hBKj2TTuXjj6DRAtgi1p9IYZE.png"
            alt="K Life 1111 Logo"
            width={350}
            height={175}
            className="mx-auto w-full max-w-sm h-auto"
            style={{
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 25px rgba(125, 211, 192, 0.7)) drop-shadow(0 0 50px rgba(179, 224, 220, 0.5)) brightness(1.15)'
            }}
          />
        </div>

        {/* 404 Message */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-4 border-white/60 animate-fade-in-up">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 bg-clip-text text-transparent mb-4 animate-pulse">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Oops! Página No Encontrada
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Parece que te perdiste... ¡Pero no te preocupes!
          </p>

          {/* Promotional Message with animation */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-2xl p-8 mb-8 transform hover:scale-105 transition-transform shadow-xl animate-slide-in relative overflow-hidden">
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>

            <h3 className="text-2xl font-bold mb-4 animate-bounce-gentle">💆‍♀️ ¡Aprovecha tu tiempo aquí!</h3>
            <p className="text-lg mb-6 animate-fade-in-delayed">
              Descubre nuestros tratamientos de belleza y bienestar
            </p>

            {/* Call Now Button - Animated and Prominent */}
            <a
              href="tel:3056806500"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-teal-600 rounded-full font-bold text-2xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.6)] hover:scale-110 transform transition-all animate-pulse-slow mb-6"
            >
              <svg className="w-8 h-8 animate-wiggle" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="flex flex-col items-start">
                <span className="text-sm font-normal">¡Llama Ahora!</span>
                <span className="text-3xl font-black">305.680.6500</span>
              </span>
            </a>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left relative">
              <div className="flex items-start gap-3 animate-slide-in-left hover:scale-110 transition-transform">
                <span className="text-2xl animate-spin-slow">✨</span>
                <div>
                  <p className="font-bold">Tratamientos Faciales</p>
                  <p className="text-sm opacity-90">Dermaplaning, Hidrafacial, Microdermoabrasión</p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-slide-in-right hover:scale-110 transition-transform">
                <span className="text-2xl animate-spin-slow animation-delay-1000">💪</span>
                <div>
                  <p className="font-bold">Tratamientos Corporales</p>
                  <p className="text-sm opacity-90">Venus Legacy, Reafirmación de piel</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-teal-400 to-teal-300"></div>
            <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-teal-300 to-teal-400"></div>
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-full hover:from-teal-700 hover:to-teal-600 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-110 transform animate-float"
            >
              <svg className="w-5 h-5 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver al Inicio
            </Link>

            <Link
              href="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-600 border-2 border-teal-600 rounded-full hover:bg-teal-50 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-110 transform animate-float animation-delay-500"
            >
              <svg className="w-5 h-5 animate-bounce-gentle animation-delay-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reservar Cita Online
            </Link>
          </div>
        </div>

        {/* Location Info */}
        <div className="mt-8 text-gray-700 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-lg">
            <span className="text-2xl">📍</span>
            <span className="font-semibold">Coral Gables, Miami</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }

        .animate-wiggle {
          animation: wiggle 1s infinite;
        }

        .animate-fade-in {
          animation: fade-in-up 1s ease-out;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes fade-in-delayed {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-shine {
          animation: shine 3s infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite ease-in-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 2s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}
