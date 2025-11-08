"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"

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
  reason: string | null
}

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState<Availability[]>([])
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [loading, setLoading] = useState(true)

  const [editingAvailability, setEditingAvailability] = useState<Availability | null>(null)
  const [isCreatingAvailability, setIsCreatingAvailability] = useState(false)
  const [isCreatingBlock, setIsCreatingBlock] = useState(false)

  const [availabilityForm, setAvailabilityForm] = useState({
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "17:00",
    active: true,
  })

  const [blockForm, setBlockForm] = useState({
    date: "",
    reason: "",
  })

  const daysOfWeek = [
    { value: 0, label: "Domingo" },
    { value: 1, label: "Lunes" },
    { value: 2, label: "Martes" },
    { value: 3, label: "Miércoles" },
    { value: 4, label: "Jueves" },
    { value: 5, label: "Viernes" },
    { value: 6, label: "Sábado" },
  ]

  useEffect(() => {
    fetchAvailability()
    fetchBlockedDates()
  }, [])

  const fetchAvailability = async () => {
    try {
      const response = await fetch("/api/admin/availability")
      if (response.ok) {
        const data = await response.json()
        setAvailability(data)
      }
    } catch (error) {
      console.error("Error fetching availability:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBlockedDates = async () => {
    try {
      const response = await fetch("/api/admin/blocked-dates")
      if (response.ok) {
        const data = await response.json()
        setBlockedDates(data)
      }
    } catch (error) {
      console.error("Error fetching blocked dates:", error)
    }
  }

  const handleAvailabilitySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingAvailability
        ? `/api/admin/availability/${editingAvailability.id}`
        : "/api/admin/availability"

      const response = await fetch(url, {
        method: editingAvailability ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(availabilityForm),
      })

      if (response.ok) {
        fetchAvailability()
        resetAvailabilityForm()
      }
    } catch (error) {
      console.error("Error saving availability:", error)
    }
  }

  const handleBlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/admin/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockForm),
      })

      if (response.ok) {
        fetchBlockedDates()
        resetBlockForm()
      }
    } catch (error) {
      console.error("Error creating blocked date:", error)
    }
  }

  const deleteAvailability = async (id: string) => {
    if (!confirm("¿Eliminar este horario?")) return

    try {
      const response = await fetch(`/api/admin/availability/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchAvailability()
      }
    } catch (error) {
      console.error("Error deleting availability:", error)
    }
  }

  const deleteBlockedDate = async (id: string) => {
    if (!confirm("¿Eliminar este bloqueo?")) return

    try {
      const response = await fetch(`/api/admin/blocked-dates/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchBlockedDates()
      }
    } catch (error) {
      console.error("Error deleting blocked date:", error)
    }
  }

  const toggleAvailabilityStatus = async (id: string, active: boolean) => {
    try {
      const response = await fetch(`/api/admin/availability/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      })

      if (response.ok) {
        fetchAvailability()
      }
    } catch (error) {
      console.error("Error toggling availability:", error)
    }
  }

  const startEditingAvailability = (item: Availability) => {
    setEditingAvailability(item)
    setAvailabilityForm({
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      active: item.active,
    })
    setIsCreatingAvailability(true)
  }

  const resetAvailabilityForm = () => {
    setEditingAvailability(null)
    setIsCreatingAvailability(false)
    setAvailabilityForm({
      dayOfWeek: 1,
      startTime: "09:00",
      endTime: "17:00",
      active: true,
    })
  }

  const resetBlockForm = () => {
    setIsCreatingBlock(false)
    setBlockForm({
      date: "",
      reason: "",
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Disponibilidad y Horarios</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Business Hours Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Horario de Atención</h2>
            {!isCreatingAvailability && (
              <button
                onClick={() => setIsCreatingAvailability(true)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-semibold"
              >
                + Añadir Horario
              </button>
            )}
          </div>

          {/* Availability Form */}
          {isCreatingAvailability && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {editingAvailability ? "Editar Horario" : "Nuevo Horario"}
              </h3>
              <form onSubmit={handleAvailabilitySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Día de la Semana
                  </label>
                  <select
                    value={availabilityForm.dayOfWeek}
                    onChange={(e) =>
                      setAvailabilityForm({
                        ...availabilityForm,
                        dayOfWeek: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {daysOfWeek.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hora Inicio
                    </label>
                    <input
                      type="time"
                      value={availabilityForm.startTime}
                      onChange={(e) =>
                        setAvailabilityForm({ ...availabilityForm, startTime: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hora Fin
                    </label>
                    <input
                      type="time"
                      value={availabilityForm.endTime}
                      onChange={(e) =>
                        setAvailabilityForm({ ...availabilityForm, endTime: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active-availability"
                    checked={availabilityForm.active}
                    onChange={(e) =>
                      setAvailabilityForm({ ...availabilityForm, active: e.target.checked })
                    }
                    className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="active-availability" className="text-sm font-medium text-gray-700">
                    Activo
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-semibold"
                  >
                    {editingAvailability ? "Guardar" : "Crear"}
                  </button>
                  <button
                    type="button"
                    onClick={resetAvailabilityForm}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Availability List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {availability.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No hay horarios configurados
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {availability
                  .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                  .map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {daysOfWeek.find((d) => d.value === item.dayOfWeek)?.label}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.startTime} - {item.endTime}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleAvailabilityStatus(item.id, item.active)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              item.active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.active ? "Activo" : "Inactivo"}
                          </button>
                          <button
                            onClick={() => startEditingAvailability(item)}
                            className="text-teal-600 hover:text-teal-900 text-sm font-medium"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deleteAvailability(item.id)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Blocked Dates Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Fechas Bloqueadas</h2>
            {!isCreatingBlock && (
              <button
                onClick={() => setIsCreatingBlock(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
              >
                + Bloquear Fecha
              </button>
            )}
          </div>

          {/* Block Form */}
          {isCreatingBlock && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bloquear Fecha</h3>
              <form onSubmit={handleBlockSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    value={blockForm.date}
                    onChange={(e) => setBlockForm({ ...blockForm, date: e.target.value })}
                    required
                    min={dayjs().format("YYYY-MM-DD")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo (opcional)
                  </label>
                  <input
                    type="text"
                    value={blockForm.reason}
                    onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })}
                    placeholder="Ej: Vacaciones, Día festivo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                  >
                    Bloquear
                  </button>
                  <button
                    type="button"
                    onClick={resetBlockForm}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Blocked Dates List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {blockedDates.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No hay fechas bloqueadas</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {blockedDates
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {dayjs(item.date).format("DD/MM/YYYY")}
                          </p>
                          {item.reason && (
                            <p className="text-sm text-gray-600">{item.reason}</p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteBlockedDate(item.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
