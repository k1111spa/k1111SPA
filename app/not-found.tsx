import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 px-4">
      <div className="text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KLIFE1111-logo-OrZz7hBKj2TTuXjj6DRAtgi1p9IYZE.png"
            alt="K Life 1111 Logo"
            width={300}
            height={150}
            className="mx-auto w-full max-w-xs h-auto"
            style={{
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 25px rgba(125, 211, 192, 0.7)) drop-shadow(0 0 50px rgba(179, 224, 220, 0.5)) brightness(1.15)'
            }}
          />
        </div>

        {/* 404 Message */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-4 border-white/60">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Página No Encontrada
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Lo sentimos, la página que buscas no existe.
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-teal-400"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-teal-400 to-teal-300"></div>
            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-teal-300 to-teal-400"></div>
            <div className="w-2 h-2 rounded-full bg-teal-400"></div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-full hover:from-teal-700 hover:to-teal-600 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver al Inicio
            </Link>

            <Link
              href="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-600 border-2 border-teal-600 rounded-full hover:bg-teal-50 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reservar Cita
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-gray-600">
          <p className="text-lg">¿Necesitas ayuda?</p>
          <p className="text-xl font-bold text-teal-600 mt-2">📞 305.680.6500</p>
          <p className="text-lg mt-1">📍 Coral Gables</p>
        </div>
      </div>
    </div>
  )
}
