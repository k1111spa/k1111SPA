"use client"

import { useState } from "react"

export default function TestFormPage() {
  const [formResult, setFormResult] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormResult("Enviando...")

    const formData = new FormData(event.currentTarget)
    formData.append("access_key", "df27a237-4c41-4f23-bd2f-1fcb9879891f")
    formData.append("to", "k1111marketing@gmail.com")
    formData.append("replyto", formData.get("email") as string)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setFormResult("✅ ¡Mensaje enviado exitosamente! Revisa k1111marketing@gmail.com")
        event.currentTarget.reset()
      } else {
        setFormResult("❌ Error: " + (data.message || "Error desconocido"))
      }
    } catch (error) {
      setFormResult("❌ Error al enviar: " + error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
          🧪 Prueba de Formulario
        </h1>
        <p className="text-center text-gray-600 mb-8">
          K Life Spa - Test de Web3Forms
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="subject" value="🧪 PRUEBA - Formulario K Life Spa" />
          <input type="hidden" name="from_name" value="Sistema de Pruebas" />

          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Ej: Juan Pérez"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Ej: juan@ejemplo.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Ej: 305-123-4567"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
              Servicio de Interés
            </label>
            <select
              id="service"
              name="service"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            >
              <option value="Dermaplaning">Dermaplaning</option>
              <option value="Hidrafacial">Hidrafacial</option>
              <option value="Microdermoabrasión">Microdermoabrasión</option>
              <option value="Peeling Químico">Peeling Químico</option>
              <option value="Masaje Relajante">Masaje Relajante</option>
              <option value="Masaje Descontracturante">Masaje Descontracturante</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Este es un mensaje de prueba para verificar que el formulario funciona correctamente..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all transform hover:scale-[1.02] font-semibold text-lg shadow-lg"
          >
            🚀 Enviar Prueba
          </button>

          {formResult && (
            <div className={`text-center p-4 rounded-lg font-semibold ${
              formResult.includes("✅")
                ? "bg-green-100 text-green-800 border-2 border-green-300"
                : formResult.includes("❌")
                ? "bg-red-100 text-red-800 border-2 border-red-300"
                : "bg-blue-100 text-blue-800 border-2 border-blue-300"
            }`}>
              {formResult}
            </div>
          )}
        </form>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-2">📋 Información:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✉️ Email de destino: <strong>k1111marketing@gmail.com</strong></li>
            <li>🔑 Access Key: <code className="bg-gray-200 px-2 py-1 rounded">df27...91f</code></li>
            <li>🌐 Servicio: Web3Forms (Gratis)</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-teal-600 hover:text-teal-800 font-medium"
          >
            ← Volver a la página principal
          </a>
        </div>
      </div>
    </div>
  )
}
