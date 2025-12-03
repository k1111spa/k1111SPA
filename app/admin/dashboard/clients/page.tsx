"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"

type Client = {
  id: string
  name: string | null
  email: string
  phone: string | null
  createdAt: string
  _count: {
    appointments: number
  }
}

type ClientDetail = Client & {
  appointments: {
    id: string
    date: string
    startTime: string
    endTime: string
    status: string
    service: {
      name: string
      duration: number
    }
  }[]
}

type Service = {
  id: string
  name: string
  duration: number
  price: number
  category: string
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

// Generar opciones de hora
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

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Estados para crear/editar cliente
  const [isCreating, setIsCreating] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [saving, setSaving] = useState(false)

  // Estados para ver detalles del cliente
  const [selectedClient, setSelectedClient] = useState<ClientDetail | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  // Estados para crear cita
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [appointmentForm, setAppointmentForm] = useState({
    serviceId: "",
    date: "",
    startTime: "09:00"
  })
  const [savingAppointment, setSavingAppointment] = useState(false)

  const timeOptions = generateTimeOptions()

  useEffect(() => {
    fetchClients()
    fetchServices()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/admin/clients")
      if (response.ok) {
        const data = await response.json()
        setClients(data)
      }
    } catch (error) {
      console.error("Error fetching clients:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services")
      if (response.ok) {
        const data = await response.json()
        setServices(data.filter((s: Service) => s.category))
      }
    } catch (error) {
      console.error("Error fetching services:", error)
    }
  }

  const fetchClientDetails = async (clientId: string) => {
    setLoadingDetails(true)
    try {
      const response = await fetch(`/api/admin/clients/${clientId}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedClient(data)
      }
    } catch (error) {
      console.error("Error fetching client details:", error)
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = editingClient
        ? `/api/admin/clients/${editingClient.id}`
        : "/api/admin/clients"

      const response = await fetch(url, {
        method: editingClient ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        fetchClients()
        resetForm()
      } else {
        const error = await response.json()
        alert(error.error || "Error al guardar cliente")
      }
    } catch (error) {
      console.error("Error saving client:", error)
      alert("Error al guardar cliente")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este cliente? Se eliminarán también todas sus citas.")) return

    try {
      const response = await fetch(`/api/admin/clients/${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        fetchClients()
        if (selectedClient?.id === id) {
          setSelectedClient(null)
        }
      }
    } catch (error) {
      console.error("Error deleting client:", error)
    }
  }

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClient) return

    setSavingAppointment(true)
    try {
      const service = services.find(s => s.id === appointmentForm.serviceId)
      if (!service) return

      const endTime = dayjs(`2000-01-01 ${appointmentForm.startTime}`)
        .add(service.duration, "minute")
        .format("HH:mm")

      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedClient.id,
          serviceId: appointmentForm.serviceId,
          date: appointmentForm.date,
          startTime: appointmentForm.startTime,
          endTime: endTime,
          status: "confirmed" // Citas creadas por admin se confirman directamente
        })
      })

      if (response.ok) {
        setIsCreatingAppointment(false)
        setAppointmentForm({ serviceId: "", date: "", startTime: "09:00" })
        fetchClientDetails(selectedClient.id)
        alert("Cita creada exitosamente")
      } else {
        const error = await response.json()
        alert(error.error || "Error al crear cita")
      }
    } catch (error) {
      console.error("Error creating appointment:", error)
      alert("Error al crear cita")
    } finally {
      setSavingAppointment(false)
    }
  }

  const startEditing = (client: Client) => {
    setEditingClient(client)
    setFormData({
      name: client.name || "",
      email: client.email,
      phone: client.phone || ""
    })
    setIsCreating(true)
  }

  const resetForm = () => {
    setIsCreating(false)
    setEditingClient(null)
    setFormData({ name: "", email: "", phone: "" })
  }

  const filteredClients = clients.filter(client => {
    const search = searchTerm.toLowerCase()
    return (
      client.name?.toLowerCase().includes(search) ||
      client.email.toLowerCase().includes(search) ||
      client.phone?.toLowerCase().includes(search)
    )
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "confirmed": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
      case "completed": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Pendiente"
      case "confirmed": return "Confirmada"
      case "cancelled": return "Cancelada"
      case "completed": return "Completada"
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Cargando clientes...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
          >
            + Agregar Cliente
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lista de Clientes */}
        <div>
          {/* Buscador */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Formulario de Cliente */}
          {isCreating && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {editingClient ? "Editar Cliente" : "Nuevo Cliente"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Nombre del cliente"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={!!editingClient}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="email@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="787-123-4567"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? "Guardando..." : editingClient ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lista */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600">
              <h2 className="text-lg font-bold text-white">
                👥 Clientes ({filteredClients.length})
              </h2>
            </div>
            {filteredClients.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                {searchTerm ? "No se encontraron clientes" : "No hay clientes registrados"}
              </div>
            ) : (
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedClient?.id === client.id ? "bg-teal-50" : ""
                    }`}
                    onClick={() => fetchClientDetails(client.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {client.name || "Sin nombre"}
                        </p>
                        <p className="text-sm text-gray-600">{client.email}</p>
                        {client.phone && (
                          <p className="text-sm text-gray-500">{client.phone}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                          {client._count.appointments} citas
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            startEditing(client)
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(client.id)
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
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

        {/* Detalles del Cliente */}
        <div>
          {loadingDetails ? (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center text-gray-500">Cargando detalles...</div>
            </div>
          ) : selectedClient ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600">
                <h2 className="text-lg font-bold text-white">
                  📋 Detalles del Cliente
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedClient.name || "Sin nombre"}
                  </h3>
                  <p className="text-gray-600">{selectedClient.email}</p>
                  {selectedClient.phone && (
                    <p className="text-gray-600">{selectedClient.phone}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Cliente desde: {dayjs(selectedClient.createdAt).format("DD/MM/YYYY")}
                  </p>
                </div>

                {/* Botón para crear cita */}
                {!isCreatingAppointment ? (
                  <button
                    onClick={() => setIsCreatingAppointment(true)}
                    className="w-full mb-6 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    📅 Agendar Nueva Cita
                  </button>
                ) : (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">Nueva Cita</h4>
                    <form onSubmit={handleCreateAppointment} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Servicio
                        </label>
                        <select
                          value={appointmentForm.serviceId}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, serviceId: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Seleccionar servicio...</option>
                          <optgroup label="Tratamientos Faciales">
                            {services.filter(s => s.category === "facial").map(s => (
                              <option key={s.id} value={s.id}>
                                {s.name} ({s.duration} min - ${s.price})
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Tratamientos Corporales">
                            {services.filter(s => s.category === "body").map(s => (
                              <option key={s.id} value={s.id}>
                                {s.name} ({s.duration} min - ${s.price})
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fecha
                        </label>
                        <input
                          type="date"
                          value={appointmentForm.date}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                          required
                          min={dayjs().format("YYYY-MM-DD")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hora
                        </label>
                        <select
                          value={appointmentForm.startTime}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, startTime: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                          {timeOptions.map(time => (
                            <option key={time} value={time}>{formatTo12Hour(time)}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingAppointment(false)
                            setAppointmentForm({ serviceId: "", date: "", startTime: "09:00" })
                          }}
                          className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          disabled={savingAppointment}
                          className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                          {savingAppointment ? "Creando..." : "Crear Cita"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Historial de citas */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Historial de Citas ({selectedClient.appointments.length})
                  </h4>
                  {selectedClient.appointments.length === 0 ? (
                    <p className="text-gray-500 text-sm">No tiene citas registradas</p>
                  ) : (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {selectedClient.appointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">
                                {apt.service.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {dayjs(apt.date).format("DD/MM/YYYY")} • {formatTo12Hour(apt.startTime)} - {formatTo12Hour(apt.endTime)}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(apt.status)}`}>
                              {getStatusText(apt.status)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center text-gray-500">
                <p className="text-4xl mb-2">👈</p>
                <p>Selecciona un cliente para ver sus detalles</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
