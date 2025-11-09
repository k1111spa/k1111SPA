"use client"

export default function ManualPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📖 Manual de Uso</h1>
        <p className="text-gray-600">Guía completa para administrar tu sitio web</p>
      </div>

      {/* Sección: Servicios */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-teal-600 mb-4 flex items-center gap-2">
          💆‍♀️ Administrar Servicios
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ver tus servicios</h3>
            <p className="text-gray-700 mb-2">En el Dashboard, haz clic en el botón "Servicios". Verás dos secciones:</p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
              <li><strong>Tratamientos Faciales</strong> - Todos los servicios faciales</li>
              <li><strong>Tratamientos Corporales</strong> - Todos los servicios corporales</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Crear un nuevo servicio</h3>
            <ol className="list-decimal list-inside text-gray-700 ml-4 space-y-1">
              <li>Haz clic en el botón verde "Crear Nuevo Servicio"</li>
              <li>Llena el formulario con la información del servicio</li>
              <li>Selecciona si es "facial" o "body" en Categoría</li>
              <li>Haz clic en "Guardar"</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Editar un servicio existente</h3>
            <ol className="list-decimal list-inside text-gray-700 ml-4 space-y-1">
              <li>Busca el servicio en la lista</li>
              <li>Haz clic en el botón azul "Editar"</li>
              <li>Modifica la información que necesites</li>
              <li>Haz clic en "Actualizar"</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cambiar imagen de un servicio</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
              <p className="text-blue-900 font-semibold mb-2">📸 Pasos para subir una imagen:</p>
              <ol className="list-decimal list-inside text-blue-800 space-y-2">
                <li>Ve a <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">PostImages.org</a></li>
                <li>Haz clic en "Choose images" y selecciona tu foto</li>
                <li>Espera a que se suba</li>
                <li>Haz clic en "Direct link" y copia la URL completa</li>
                <li>Vuelve al admin, edita el servicio</li>
                <li>Pega la URL en el campo "URL de la Imagen"</li>
                <li>Haz clic en "Actualizar"</li>
              </ol>
            </div>
            <p className="text-sm text-gray-600 italic">💡 Tip: La URL debe terminar en .jpg o .png</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Activar/Desactivar un servicio</h3>
            <p className="text-gray-700 mb-2">Haz clic en el botón de estado (verde "Activo" o gris "Inactivo"):</p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
              <li><span className="text-green-600 font-semibold">Activo</span> - El servicio aparece en la página principal y en booking</li>
              <li><span className="text-gray-600 font-semibold">Inactivo</span> - El servicio está oculto para los clientes</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eliminar un servicio</h3>
            <p className="text-gray-700 mb-2">Haz clic en el botón rojo "Eliminar"</p>
            <p className="text-red-600 text-sm font-semibold">⚠️ Cuidado: Esta acción no se puede deshacer</p>
          </div>
        </div>
      </div>

      {/* Sección: Contenido Bilingüe */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
          🌐 Contenido en Español e Inglés
        </h2>

        <div className="space-y-4">
          <p className="text-gray-700">
            Al crear o editar un servicio, verás dos pestañas: <strong>Español</strong> e <strong>Inglés</strong>
          </p>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Campos importantes:</h3>
            <ul className="list-disc list-inside text-purple-800 space-y-1 ml-2">
              <li><strong>Nombre:</strong> Nombre del servicio (ej: "Hidrafacial")</li>
              <li><strong>Descripción corta:</strong> Resumen breve para la lista de servicios</li>
              <li><strong>Descripción completa:</strong> Texto largo que aparece en la página principal</li>
              <li><strong>Beneficios:</strong> Lista de beneficios (uno por línea)</li>
            </ul>
          </div>

          <p className="text-sm text-gray-600 italic">
            💡 Tip: Llena ambos idiomas para que tu sitio sea bilingüe. Si solo llenas español, no pasa nada, el inglés mostrará los valores en español.
          </p>
        </div>
      </div>

      {/* Sección: Citas */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
          📅 Administrar Citas
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ver citas</h3>
            <p className="text-gray-700 mb-2">En el Dashboard, haz clic en "Ver Citas":</p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
              <li><span className="text-yellow-600 font-semibold">Pendientes</span> - Nuevas solicitudes de citas</li>
              <li><span className="text-green-600 font-semibold">Confirmadas</span> - Citas que ya confirmaste</li>
              <li><span className="text-gray-600 font-semibold">Completadas</span> - Citas terminadas</li>
              <li><span className="text-red-600 font-semibold">Canceladas</span> - Citas canceladas</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cambiar estado de una cita</h3>
            <ol className="list-decimal list-inside text-gray-700 ml-4 space-y-1">
              <li>Busca la cita en la lista</li>
              <li>Haz clic en el menú desplegable de estado</li>
              <li>Selecciona el nuevo estado</li>
              <li>La cita se actualiza automáticamente</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ver detalles de una cita</h3>
            <p className="text-gray-700">Cada cita muestra:</p>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
              <li>Nombre del cliente</li>
              <li>Email y teléfono</li>
              <li>Servicio solicitado</li>
              <li>Fecha y hora</li>
              <li>Notas especiales (si hay)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sección: Calendario */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
          🗓️ Calendario
        </h2>

        <div className="space-y-4">
          <p className="text-gray-700">
            El calendario te muestra todas tus citas en una vista mensual
          </p>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Usar el calendario</h3>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
              <li>Navega entre meses con las flechas</li>
              <li>Las citas aparecen en el día correspondiente</li>
              <li>Los colores indican el estado de cada cita</li>
              <li>Haz clic en una cita para ver más detalles</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sección: Disponibilidad */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
          ⏰ Configurar Disponibilidad
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Horarios de trabajo</h3>
            <p className="text-gray-700 mb-2">Define qué días y horarios trabajas:</p>
            <ol className="list-decimal list-inside text-gray-700 ml-4 space-y-1">
              <li>Ve a "Disponibilidad" en el Dashboard</li>
              <li>Configura la hora de inicio y fin para cada día</li>
              <li>Activa/Desactiva días específicos</li>
              <li>Los clientes solo podrán reservar en estos horarios</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bloquear fechas</h3>
            <p className="text-gray-700 mb-2">¿Vacaciones o día libre?</p>
            <ol className="list-decimal list-inside text-gray-700 ml-4 space-y-1">
              <li>Ve a la sección "Fechas Bloqueadas"</li>
              <li>Selecciona la fecha que quieres bloquear</li>
              <li>Agrega un motivo (opcional)</li>
              <li>Los clientes no podrán reservar esa fecha</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Sección: Dónde se ven los cambios */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl shadow-md p-6 mb-6 border-2 border-teal-200">
        <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2">
          🌟 ¿Dónde se ven los cambios?
        </h2>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cuando editas un servicio:</h3>
            <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
              <li>
                <strong>Página Principal</strong> - El servicio se actualiza en la sección de tratamientos con la nueva imagen, descripción y beneficios
              </li>
              <li>
                <strong>Página de Booking</strong> - Los clientes ven el servicio actualizado cuando van a reservar
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4">
            <p className="text-green-700 font-semibold flex items-center gap-2">
              ✅ Los cambios son <strong>INSTANTÁNEOS</strong> - No necesitas hacer nada más
            </p>
          </div>
        </div>
      </div>

      {/* Sección: Consejos */}
      <div className="bg-yellow-50 rounded-xl shadow-md p-6 border-2 border-yellow-200">
        <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
          💡 Consejos útiles
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span><strong>Revisa tu email regularmente</strong> - Las citas nuevas generan notificaciones</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span><strong>Mantén los precios actualizados</strong> - Es más fácil cambiarlos aquí que explicar diferencias a los clientes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span><strong>Usa imágenes de buena calidad</strong> - Las fotos profesionales atraen más clientes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span><strong>Desactiva servicios temporalmente</strong> - En lugar de eliminar, usa el botón "Inactivo"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <span><strong>Llena todos los campos</strong> - Más información = más confianza de los clientes</span>
          </li>
        </ul>
      </div>

      {/* Botón volver */}
      <div className="mt-8 text-center">
        <a
          href="/admin/dashboard"
          className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold shadow-lg"
        >
          ← Volver al Dashboard
        </a>
      </div>
    </div>
  )
}
