"use client"

import { useEffect, useState } from "react"
import { Calendar, dayjsLocalizer } from "react-big-calendar"
import dayjs from "dayjs"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = dayjsLocalizer(dayjs)

// Función para convertir hora militar a formato 12h AM/PM
const formatTo12Hour = (time24: string | undefined | null): string => {
  if (!time24) return "N/A"
  const parts = time24.split(":")
  if (parts.length < 2) return time24
  const hours = Number(parts[0]) || 0
  const minutes = Number(parts[1]) || 0
  const period = hours >= 12 ? "PM" : "AM"
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
}

type Appointment = {
  id: string
  date: string
  startTime: string
  endTime: string
  status: string
  user: {
    name: string | null
    email: string
  }
  service: {
    name: string
  }
}

type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  status: string
  resource: Appointment
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    fetchAppointments()
    // Actualizar automáticamente cada 30 segundos
    const interval = setInterval(() => {
      fetchAppointments()
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchAppointments = async () => {
    try {
      // Agregar timestamp para evitar cache
      const response = await fetch(`/api/admin/appointments?t=${Date.now()}`, {
        cache: "no-store"
      })
      if (response.ok) {
        const appointments: Appointment[] = await response.json()

        const calendarEvents: CalendarEvent[] = appointments.map((apt) => {
          const [startHour, startMinute] = (apt.startTime || "09:00").split(":").map(Number)
          const [endHour, endMinute] = (apt.endTime || "10:00").split(":").map(Number)

          const dateObj = new Date(apt.date)
          const start = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), startHour, startMinute)
          const end = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), endHour, endMinute)

          return {
            id: apt.id,
            title: `${apt.service?.name || "Servicio"} - ${apt.user?.name || apt.user?.email || "Cliente"}`,
            start,
            end,
            status: apt.status,
            resource: apt,
          }
        })

        setEvents(calendarEvents)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error("Error fetching appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    fetchAppointments()
  }

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#10b981" // green for confirmed

    switch (event.status) {
      case "pending":
        backgroundColor = "#f59e0b" // yellow
        break
      case "confirmed":
        backgroundColor = "#10b981" // green
        break
      case "cancelled":
        backgroundColor = "#ef4444" // red
        break
      case "completed":
        backgroundColor = "#3b82f6" // blue
        break
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Cargando calendario...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendario de Citas</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Última actualización: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold disabled:opacity-50 flex items-center gap-2"
          >
            🔄 Actualizar
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700">Pendiente</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Confirmada</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Completada</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-700">Cancelada</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow-md p-6" style={{ height: "700px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => setSelectedEvent(event)}
          views={["month", "week", "day"]}
          defaultView="month"
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Cita",
            noEventsInRange: "No hay citas en este rango",
          }}
        />
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detalles de la Cita</h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Servicio</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedEvent.resource.service.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Cliente</p>
                <p className="text-lg text-gray-900">
                  {selectedEvent.resource.user.name || "Sin nombre"}
                </p>
                <p className="text-sm text-gray-600">{selectedEvent.resource.user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="text-lg text-gray-900">
                  {dayjs(selectedEvent.start).format("DD/MM/YYYY")}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Horario</p>
                <p className="text-lg text-gray-900">
                  {formatTo12Hour(selectedEvent.resource.startTime)} - {formatTo12Hour(selectedEvent.resource.endTime)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Estado</p>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    selectedEvent.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedEvent.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : selectedEvent.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedEvent.status === "pending"
                    ? "Pendiente"
                    : selectedEvent.status === "confirmed"
                    ? "Confirmada"
                    : selectedEvent.status === "cancelled"
                    ? "Cancelada"
                    : "Completada"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-6 w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
