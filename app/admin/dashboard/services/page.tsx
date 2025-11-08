"use client"

import { useEffect, useState } from "react"

type Service = {
  id: string
  name: string
  nameEn: string | null
  description: string | null
  descriptionEn: string | null
  fullDescription: string | null
  fullDescriptionEn: string | null
  benefits: string | null
  benefitsEn: string | null
  imageUrl: string | null
  duration: number
  price: number
  category: string
  active: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [activeTab, setActiveTab] = useState<"es" | "en">("es")

  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    description: "",
    descriptionEn: "",
    fullDescription: "",
    fullDescriptionEn: "",
    benefits: "",
    benefitsEn: "",
    imageUrl: "",
    duration: 60,
    price: 0,
    category: "facial",
    active: true,
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services")
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error("Error fetching services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingService
        ? `/api/admin/services/${editingService.id}`
        : "/api/admin/services"

      const response = await fetch(url, {
        method: editingService ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchServices()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving service:", error)
    }
  }

  const deleteService = async (id: string) => {
    if (!confirm("¿Estás segura de eliminar este servicio?")) return

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchServices()
      }
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  const toggleServiceStatus = async (id: string, active: boolean) => {
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      })

      if (response.ok) {
        fetchServices()
      }
    } catch (error) {
      console.error("Error toggling service status:", error)
    }
  }

  const startEditing = (service: Service) => {
    setEditingService(service)

    // Convert benefits from JSON array to line-separated text
    let benefitsText = ""
    let benefitsEnText = ""

    try {
      if (service.benefits) {
        const benefitsArray = JSON.parse(service.benefits)
        benefitsText = Array.isArray(benefitsArray) ? benefitsArray.join('\n') : ""
      }
    } catch (e) {
      benefitsText = service.benefits || ""
    }

    try {
      if (service.benefitsEn) {
        const benefitsEnArray = JSON.parse(service.benefitsEn)
        benefitsEnText = Array.isArray(benefitsEnArray) ? benefitsEnArray.join('\n') : ""
      }
    } catch (e) {
      benefitsEnText = service.benefitsEn || ""
    }

    setFormData({
      name: service.name,
      nameEn: service.nameEn || "",
      description: service.description || "",
      descriptionEn: service.descriptionEn || "",
      fullDescription: service.fullDescription || "",
      fullDescriptionEn: service.fullDescriptionEn || "",
      benefits: benefitsText,
      benefitsEn: benefitsEnText,
      imageUrl: service.imageUrl || "",
      duration: service.duration,
      price: service.price,
      category: service.category,
      active: service.active,
    })
    setIsCreating(true)
  }

  const resetForm = () => {
    setEditingService(null)
    setIsCreating(false)
    setFormData({
      name: "",
      nameEn: "",
      description: "",
      descriptionEn: "",
      fullDescription: "",
      fullDescriptionEn: "",
      benefits: "",
      benefitsEn: "",
      imageUrl: "",
      duration: 60,
      price: 0,
      category: "facial",
      active: true,
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Cargando servicios...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Servicios</h1>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
          >
            + Nuevo Servicio
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editingService ? "Editar Servicio" : "Nuevo Servicio"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="facial">Facial</option>
                  <option value="body">Corporal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración (minutos)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: parseInt(e.target.value) })
                  }
                  required
                  min="15"
                  step="15"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio ($)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseFloat(e.target.value) })
                  }
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Servicio activo
                </label>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de la Imagen
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="/images/nombre-servicio.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ej: /images/dermaplaning.jpg - La imagen debe estar en la carpeta public/images/
              </p>
              {formData.imageUrl && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Vista previa:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-32 w-auto rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Language Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  type="button"
                  onClick={() => setActiveTab("es")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "es"
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Español
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("en")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "en"
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  English
                </button>
              </nav>
            </div>

            {/* Spanish Fields */}
            {activeTab === "es" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Servicio (Español)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción Corta (Español)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    placeholder="Descripción breve para la lista"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción Completa (Español)
                  </label>
                  <textarea
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    rows={4}
                    placeholder="Descripción detallada del tratamiento"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beneficios (Español) - Uno por línea
                  </label>
                  <textarea
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    rows={5}
                    placeholder="Deja la piel más suave&#10;Mejora la textura&#10;Estimula la renovación celular"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Escribe cada beneficio en una línea nueva</p>
                </div>
              </div>
            )}

            {/* English Fields */}
            {activeTab === "en" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name (English)
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description (English)
                  </label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    rows={2}
                    placeholder="Brief description for the list"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description (English)
                  </label>
                  <textarea
                    value={formData.fullDescriptionEn}
                    onChange={(e) => setFormData({ ...formData, fullDescriptionEn: e.target.value })}
                    rows={4}
                    placeholder="Detailed description of the treatment"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benefits (English) - One per line
                  </label>
                  <textarea
                    value={formData.benefitsEn}
                    onChange={(e) => setFormData({ ...formData, benefitsEn: e.target.value })}
                    rows={5}
                    placeholder="Leaves skin softer&#10;Improves texture&#10;Stimulates cellular renewal"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Write each benefit on a new line</p>
                </div>
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
              >
                {editingService ? "Guardar Cambios" : "Crear Servicio"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duración
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
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
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    {service.description && (
                      <div className="text-sm text-gray-500">{service.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 capitalize">{service.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{service.duration} min</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">${service.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleServiceStatus(service.id, service.active)}
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        service.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {service.active ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => startEditing(service)}
                        className="text-teal-600 hover:text-teal-900 font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
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
      </div>
    </div>
  )
}
