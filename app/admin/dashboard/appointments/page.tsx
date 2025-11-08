"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"

type Appointment = {
  id: string
  date: string
  startTime: string
  endTime: string
  status: string
  notes: string | null
  user: {
    name: string | null
    email: string
    phone: string | null
  }
  service: {
    name: string
    duration: number
  }
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/admin/appointments")
      if (response.ok) {
        const data = await response.json()
        setAppointments(data)
      }
    } catch (error) {
      console.error("Error fetching appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchAppointments()
      }
    } catch (error) {
      console.error("Error updating appointment:", error)
    }
  }

  const deleteAppointment = async (id: string) => {
    if (!confirm("¿Estás segura de eliminar esta cita?")) return

    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchAppointments()
      }
    } catch (error) {
      console.error("Error deleting appointment:", error)
    }
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true
    return apt.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "confirmed":
        return "Confirmada"
      case "cancelled":
        return "Cancelada"
      case "completed":
        return "Completada"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Cargando citas...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "all"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todas ({appointments.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "pending"
                ? "bg-yellow-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pendientes ({appointments.filter((a) => a.status === "pending").length})
          </button>
          <button
            onClick={() => setFilter("confirmed")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "confirmed"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Confirmadas ({appointments.filter((a) => a.status === "confirmed").length})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Completadas ({appointments.filter((a) => a.status === "completed").length})
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay citas {filter !== "all" && `con estado: ${getStatusText(filter)}`}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha y Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.user.name || "Sin nombre"}
                      </div>
                      <div className="text-sm text-gray-500">{appointment.user.email}</div>
                      {appointment.user.phone && (
                        <div className="text-sm text-gray-500">{appointment.user.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{appointment.service.name}</div>
                      <div className="text-sm text-gray-500">
                        {appointment.service.duration} min
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {dayjs(appointment.date).format("DD/MM/YYYY")}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.startTime} - {appointment.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {getStatusText(appointment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        {appointment.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                updateAppointmentStatus(appointment.id, "confirmed")
                              }
                              className="text-green-600 hover:text-green-900 font-medium"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={() =>
                                updateAppointmentStatus(appointment.id, "cancelled")
                              }
                              className="text-red-600 hover:text-red-900 font-medium"
                            >
                              Rechazar
                            </button>
                          </>
                        )}
                        {appointment.status === "confirmed" && (
                          <button
                            onClick={() =>
                              updateAppointmentStatus(appointment.id, "completed")
                            }
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            Completar
                          </button>
                        )}
                        <button
                          onClick={() => deleteAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
