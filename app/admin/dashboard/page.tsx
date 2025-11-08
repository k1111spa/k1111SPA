"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    pendingAppointments: 0,
    todayAppointments: 0,
    totalAppointments: 0,
    activeServices: 0,
  })

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Citas Pendientes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.pendingAppointments}
              </p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Citas Hoy</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.todayAppointments}
              </p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Citas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalAppointments}
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Servicios Activos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.activeServices}
              </p>
            </div>
            <div className="text-4xl">💆‍♀️</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Acceso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => router.push("/admin/dashboard/appointments")}
            className="p-4 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors text-left"
          >
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-gray-900">Ver Citas</h3>
            <p className="text-sm text-gray-600">Gestionar solicitudes</p>
          </button>

          <button
            onClick={() => router.push("/admin/dashboard/calendar")}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
          >
            <div className="text-3xl mb-2">🗓️</div>
            <h3 className="font-semibold text-gray-900">Calendario</h3>
            <p className="text-sm text-gray-600">Vista mensual</p>
          </button>

          <button
            onClick={() => router.push("/admin/dashboard/services")}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
          >
            <div className="text-3xl mb-2">💆‍♀️</div>
            <h3 className="font-semibold text-gray-900">Servicios</h3>
            <p className="text-sm text-gray-600">Administrar catálogo</p>
          </button>

          <button
            onClick={() => router.push("/admin/dashboard/availability")}
            className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left"
          >
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-semibold text-gray-900">Disponibilidad</h3>
            <p className="text-sm text-gray-600">Horarios y bloqueos</p>
          </button>
        </div>
      </div>
    </div>
  )
}
