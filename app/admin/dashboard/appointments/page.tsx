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

// Generar opciones de hora en intervalos de 30 minutos
const generateTimeOptions = (): string[] => {
  const times: string[] = []
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      times.push(time)
    }
  }
  return times
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [newStartTime, setNewStartTime] = useState<string>("")
  const [saving, setSaving] = useState(false)

  const timeOptions = generateTimeOptions()

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

  const updateAppointmentTime = async () => {
    if (!editingAppointment || !newStartTime) return

    setSaving(true)
    try {
      // Calcular nueva hora de fin basada en la duración del servicio
      const newEndTime = dayjs(`2000-01-01 ${newStartTime}`)
        .add(editingAppointment.service.duration, "minute")
        .format("HH:mm")

      const response = await fetch(`/api/admin/appointments/${editingAppointment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startTime: newStartTime,
          endTime: newEndTime
        }),
      })

      if (response.ok) {
        fetchAppointments()
        setEditingAppointment(null)
        setNewStartTime("")
      } else {
        const error = await response.json()
        alert(error.error || "Error al actualizar la hora")
      }
    } catch (error) {
      console.error("Error updating appointment time:", error)
      alert("Error al actualizar la hora")
    } finally {
      setSaving(false)
    }
  }

  const openEditTimeModal = (appointment: Appointment) => {
    setEditingAppointment(appointment)
    setNewStartTime(appointment.startTime)
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
        <div className="flex flex-wrap gap-2">
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
                        {formatTo12Hour(appointment.startTime)} - {formatTo12Hour(appointment.endTime)}
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
                      <div className="flex flex-wrap gap-2">
                        {appointment.status === "pending" && (
                          <>
                            <button
                              onClick={() => openEditTimeModal(appointment)}
                              className="text-purple-600 hover:text-purple-900 font-medium"
                              title="Editar hora antes de confirmar"
                            >
                              ✏️ Editar Hora
                            </button>
                            <button
                              onClick={() =>
                                updateAppointmentStatus(appointment.id, "confirmed")
                              }
                              className="text-green-600 hover:text-green-900 font-medium"
                            >
                              ✓ Confirmar
                            </button>
                            <button
                              onClick={() =>
                                updateAppointmentStatus(appointment.id, "cancelled")
                              }
                              className="text-red-600 hover:text-red-900 font-medium"
                            >
                              ✗ Rechazar
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
                            ✓ Completar
                          </button>
                        )}
                        <button
                          onClick={() => deleteAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          🗑️ Eliminar
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

      {/* Modal para editar hora */}
      {editingAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ✏️ Editar Hora de Cita
            </h2>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Cliente:</strong> {editingAppointment.user.name || "Sin nombre"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Servicio:</strong> {editingAppointment.service.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Duración:</strong> {editingAppointment.service.duration} minutos
              </p>
              <p className="text-sm text-gray-600">
                <strong>Fecha:</strong> {dayjs(editingAppointment.date).format("DD/MM/YYYY")}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Hora actual:</strong> {formatTo12Hour(editingAppointment.startTime)} - {formatTo12Hour(editingAppointment.endTime)}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nueva hora de inicio:
              </label>
              <select
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {formatTo12Hour(time)}
                  </option>
                ))}
              </select>
              {newStartTime && (
                <p className="mt-2 text-sm text-teal-600">
                  Nueva hora: {formatTo12Hour(newStartTime)} - {formatTo12Hour(
                    dayjs(`2000-01-01 ${newStartTime}`)
                      .add(editingAppointment.service.duration, "minute")
                      .format("HH:mm")
                  )}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingAppointment(null)
                  setNewStartTime("")
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                onClick={updateAppointmentTime}
                disabled={saving || !newStartTime}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
