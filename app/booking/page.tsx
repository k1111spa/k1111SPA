"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import dayjs from "dayjs"

type Service = {
  id: string
  name: string
  description: string | null
  duration: number
  price: number
  category: string
  active: boolean
}

type Availability = {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  active: boolean
}

type BlockedDate = {
  id: string
  date: string
}

const translations = {
  en: {
    title: "Book Your Appointment",
    subtitle: "Choose your service and preferred time",
    step1: "Select Service",
    step2: "Choose Date & Time",
    step3: "Your Information",
    step4: "Confirmation",
    facial: "Facial Treatments",
    body: "Body Treatments",
    duration: "Duration",
    price: "Price",
    minutes: "min",
    selectDate: "Select Date",
    selectTime: "Select Time",
    availableTimes: "Available Times",
    noTimesAvailable: "No times available for this date",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    notes: "Special Requests or Notes (Optional)",
    previous: "Previous",
    next: "Next",
    bookNow: "Book Appointment",
    thankYou: "Thank you!",
    confirmationMessage: "Your appointment request has been submitted successfully. We will contact you shortly to confirm.",
    appointmentDetails: "Appointment Details",
    backToHome: "Back to Home",
    loading: "Loading...",
    invalidDate: "Please select a valid date",
    invalidTime: "Please select a time",
    fillRequired: "Please fill all required fields",
  },
  es: {
    title: "Reserva tu Cita",
    subtitle: "Elige tu servicio y hora preferida",
    step1: "Seleccionar Servicio",
    step2: "Elegir Fecha y Hora",
    step3: "Tu Información",
    step4: "Confirmación",
    facial: "Tratamientos Faciales",
    body: "Tratamientos Corporales",
    duration: "Duración",
    price: "Precio",
    minutes: "min",
    selectDate: "Seleccionar Fecha",
    selectTime: "Seleccionar Hora",
    availableTimes: "Horarios Disponibles",
    noTimesAvailable: "No hay horarios disponibles para esta fecha",
    name: "Nombre Completo",
    email: "Correo Electrónico",
    phone: "Teléfono",
    notes: "Solicitudes Especiales o Notas (Opcional)",
    previous: "Anterior",
    next: "Siguiente",
    bookNow: "Reservar Cita",
    thankYou: "¡Gracias!",
    confirmationMessage: "Tu solicitud de cita ha sido enviada exitosamente. Te contactaremos pronto para confirmar.",
    appointmentDetails: "Detalles de la Cita",
    backToHome: "Volver al Inicio",
    loading: "Cargando...",
    invalidDate: "Por favor selecciona una fecha válida",
    invalidTime: "Por favor selecciona una hora",
    fillRequired: "Por favor completa todos los campos requeridos",
  },
}

export default function BookingPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<"en" | "es">("es")
  const t = translations[language]

  const [step, setStep] = useState(1)
  const [services, setServices] = useState<Service[]>([])
  const [availability, setAvailability] = useState<Availability[]>([])
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedDate && selectedService) {
      calculateAvailableTimes()
    }
  }, [selectedDate, selectedService, availability])

  const fetchData = async () => {
    try {
      const [servicesRes, availabilityRes, blockedDatesRes] = await Promise.all([
        fetch("/api/booking/services"),
        fetch("/api/booking/availability"),
        fetch("/api/booking/blocked-dates"),
      ])

      const servicesData = await servicesRes.json()
      const availabilityData = await availabilityRes.json()
      const blockedDatesData = await blockedDatesRes.json()

      setServices(servicesData.filter((s: Service) => s.active))
      setAvailability(availabilityData.filter((a: Availability) => a.active))
      setBlockedDates(blockedDatesData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateAvailableTimes = () => {
    if (!selectedDate || !selectedService) return

    const date = dayjs(selectedDate)
    const dayOfWeek = date.day()

    const dayAvailability = availability.find((a) => a.dayOfWeek === dayOfWeek)
    if (!dayAvailability) {
      setAvailableTimes([])
      return
    }

    const isBlocked = blockedDates.some(
      (bd) => dayjs(bd.date).format("YYYY-MM-DD") === selectedDate
    )
    if (isBlocked) {
      setAvailableTimes([])
      return
    }

    const times: string[] = []
    const [startHour, startMinute] = dayAvailability.startTime.split(":").map(Number)
    const [endHour, endMinute] = dayAvailability.endTime.split(":").map(Number)

    let currentTime = dayjs().hour(startHour).minute(startMinute)
    const endTime = dayjs().hour(endHour).minute(endMinute)

    while (currentTime.isBefore(endTime)) {
      const endAppointmentTime = currentTime.add(selectedService.duration, "minute")
      if (endAppointmentTime.isBefore(endTime) || endAppointmentTime.isSame(endTime)) {
        times.push(currentTime.format("HH:mm"))
      }
      currentTime = currentTime.add(30, "minute")
    }

    setAvailableTimes(times)
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setStep(2)
  }

  const handleDateTimeNext = () => {
    if (!selectedDate) {
      setError(t.invalidDate)
      return
    }
    if (!selectedTime) {
      setError(t.invalidTime)
      return
    }
    setError("")
    setStep(3)
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError(t.fillRequired)
      return
    }

    setSubmitting(true)
    setError("")

    try {
      const endTime = dayjs(selectedTime, "HH:mm")
        .add(selectedService!.duration, "minute")
        .format("HH:mm")

      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService!.id,
          date: selectedDate,
          startTime: selectedTime,
          endTime,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes,
        }),
      })

      if (response.ok) {
        setStep(4)
      } else {
        const data = await response.json()
        setError(data.error || "Error creating appointment")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("Error creating appointment")
    } finally {
      setSubmitting(false)
    }
  }

  const facialServices = services.filter((s) => s.category === "facial")
  const bodyServices = services.filter((s) => s.category === "body")

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="text-2xl text-teal-700">{t.loading}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KLIFE1111-logo-OrZz7hBKj2TTuXjj6DRAtgi1p9IYZE.png"
            alt="K Life Spa"
            width={200}
            height={100}
            className="mx-auto mb-4"
            style={{
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 8px rgba(125, 211, 192, 0.5)) drop-shadow(0 0 15px rgba(179, 224, 220, 0.3)) brightness(1.05)'
            }}
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>

          {/* Language Toggle */}
          <div className="mt-4 flex justify-center space-x-2">
            <button
              onClick={() => setLanguage("es")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                language === "es"
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Español
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                language === "en"
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? "bg-teal-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > s ? "bg-teal-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? "text-teal-700 font-semibold" : "text-gray-600"}>
              {t.step1}
            </span>
            <span className={step >= 2 ? "text-teal-700 font-semibold" : "text-gray-600"}>
              {t.step2}
            </span>
            <span className={step >= 3 ? "text-teal-700 font-semibold" : "text-gray-600"}>
              {t.step3}
            </span>
            <span className={step >= 4 ? "text-teal-700 font-semibold" : "text-gray-600"}>
              {t.step4}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            {facialServices.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.facial}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {facialServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-left border-2 border-transparent hover:border-teal-500"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.name}
                      </h3>
                      {service.description && (
                        <p className="text-gray-600 mb-4">{service.description}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                          {t.duration}: {service.duration} {t.minutes}
                        </span>
                        <span className="text-2xl font-bold text-teal-600">
                          ${service.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bodyServices.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.body}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bodyServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-left border-2 border-transparent hover:border-teal-500"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.name}
                      </h3>
                      {service.description && (
                        <p className="text-gray-600 mb-4">{service.description}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                          {t.duration}: {service.duration} {t.minutes}
                        </span>
                        <span className="text-2xl font-bold text-teal-600">
                          ${service.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && selectedService && (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedService.name}
              </h3>
              <p className="text-gray-600">
                {t.duration}: {selectedService.duration} {t.minutes} - ${selectedService.price}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.selectDate}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={dayjs().format("YYYY-MM-DD")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.availableTimes}
                  </label>
                  {availableTimes.length === 0 ? (
                    <p className="text-gray-500 italic">{t.noTimesAvailable}</p>
                  ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                            selectedTime === time
                              ? "bg-teal-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                {t.previous}
              </button>
              <button
                onClick={handleDateTimeNext}
                className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
              >
                {t.next}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Client Information */}
        {step === 3 && (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedService?.name}
              </h3>
              <p className="text-gray-600">
                {dayjs(selectedDate).format("MMMM D, YYYY")} - {selectedTime}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phone} *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.notes}
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                {t.previous}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold disabled:bg-gray-400"
              >
                {submitting ? t.loading : t.bookNow}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.thankYou}</h2>
            <p className="text-lg text-gray-600 mb-8">{t.confirmationMessage}</p>

            <div className="bg-teal-50 p-6 rounded-lg mb-8 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.appointmentDetails}
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Service:</span> {selectedService?.name}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {dayjs(selectedDate).format("MMMM D, YYYY")}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {selectedTime}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {selectedService?.duration} {t.minutes}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${selectedService?.price}
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
            >
              {t.backToHome}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
