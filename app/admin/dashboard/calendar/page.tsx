"use client"

import { useEffect, useState } from "react"
import { Calendar, dayjsLocalizer } from "react-big-calendar"
import dayjs from "dayjs"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = dayjsLocalizer(dayjs)

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

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/admin/appointments")
      if (response.ok) {
        const appointments: Appointment[] = await response.json()

        const calendarEvents: CalendarEvent[] = appointments.map((apt) => {
          const [startHour, startMinute] = apt.startTime.split(":").map(Number)
          const [endHour, endMinute] = apt.endTime.split(":").map(Number)

          const start = dayjs(apt.date).hour(startHour).minute(startMinute).toDate()
          const end = dayjs(apt.date).hour(endHour).minute(endMinute).toDate()

          return {
            id: apt.id,
            title: `${apt.service.name} - ${apt.user.name || apt.user.email}`,
            start,
            end,
            status: apt.status,
            resource: apt,
          }
        })

        setEvents(calendarEvents)
      }
    } catch (error) {
      console.error("Error fetching appointments:", error)
    } finally {
      setLoading(false)
    }
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Calendario de Citas</h1>

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
                  {selectedEvent.resource.startTime} - {selectedEvent.resource.endTime}
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
