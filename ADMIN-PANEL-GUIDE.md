# K Life Spa - Admin Panel Guide / Guía del Panel de Administración

## English

### Admin Panel Access
- **URL:** http://localhost:3000/admin/login
- **Email:** k1111marketing@gmail.com
- **Password:** kimberly123

### Features

#### 1. Dashboard
- View pending appointments count
- See today's appointments
- Total appointments statistics
- Active services count
- Quick access to all admin sections

#### 2. Appointments Management (`/admin/dashboard/appointments`)
- View all appointments with client details
- Filter by status: Pending, Confirmed, Completed, Cancelled
- Approve or reject pending appointments
- Mark appointments as completed
- Delete appointments
- See client contact information (name, email, phone)

#### 3. Calendar View (`/admin/dashboard/calendar`)
- Monthly, weekly, and daily calendar views
- Color-coded appointments by status:
  - 🟡 Yellow: Pending
  - 🟢 Green: Confirmed
  - 🔵 Blue: Completed
  - 🔴 Red: Cancelled
- Click on any appointment to see full details

#### 4. Services Management (`/admin/dashboard/services`)
- Create new services (facial or body treatments)
- Edit existing services
- Enable/disable services
- Delete services
- Set duration (in minutes) and price for each service

**Default Services:**
- **Facial Treatments:**
  - Deep Facial Cleansing - 60 min - $75
  - Anti-Aging Treatment - 90 min - $120
  - Facial Hydration - 60 min - $85
  - Chemical Peeling - 75 min - $100

- **Body Treatments:**
  - Venus Legacy - 60 min - $150
  - Relaxing Massage - 90 min - $100
  - Reductive Treatment - 75 min - $110

#### 5. Availability Management (`/admin/dashboard/availability`)
- **Business Hours:** Set working hours for each day of the week
- **Blocked Dates:** Block specific dates for vacations, holidays, or personal time
- Enable/disable specific days
- Add reasons for blocked dates (optional)

**Default Business Hours:**
- Monday - Friday: 9:00 AM - 5:00 PM
- Saturday: 10:00 AM - 2:00 PM
- Sunday: Closed

### Technical Stack
- **Framework:** Next.js 16.0.0 with App Router
- **Authentication:** NextAuth.js v5
- **Database:** Prisma ORM with SQLite
- **Calendar:** react-big-calendar
- **Styling:** Tailwind CSS
- **Email:** Web3Forms (contact form)

### Database Commands
```bash
# Generate Prisma Client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate

# Seed database
pnpm prisma:seed

# Open Prisma Studio (database GUI)
pnpm prisma studio
```

---

## Español

### Acceso al Panel de Administración
- **URL:** http://localhost:3000/admin/login
- **Email:** k1111marketing@gmail.com
- **Contraseña:** kimberly123

### Características

#### 1. Dashboard
- Ver conteo de citas pendientes
- Ver citas de hoy
- Estadísticas de citas totales
- Conteo de servicios activos
- Acceso rápido a todas las secciones del admin

#### 2. Gestión de Citas (`/admin/dashboard/appointments`)
- Ver todas las citas con detalles del cliente
- Filtrar por estado: Pendiente, Confirmada, Completada, Cancelada
- Aprobar o rechazar citas pendientes
- Marcar citas como completadas
- Eliminar citas
- Ver información de contacto del cliente (nombre, email, teléfono)

#### 3. Vista de Calendario (`/admin/dashboard/calendar`)
- Vistas de calendario mensual, semanal y diaria
- Citas codificadas por color según estado:
  - 🟡 Amarillo: Pendiente
  - 🟢 Verde: Confirmada
  - 🔵 Azul: Completada
  - 🔴 Rojo: Cancelada
- Haz clic en cualquier cita para ver los detalles completos

#### 4. Gestión de Servicios (`/admin/dashboard/services`)
- Crear nuevos servicios (tratamientos faciales o corporales)
- Editar servicios existentes
- Activar/desactivar servicios
- Eliminar servicios
- Establecer duración (en minutos) y precio para cada servicio

**Servicios por Defecto:**
- **Tratamientos Faciales:**
  - Limpieza Facial Profunda - 60 min - $75
  - Tratamiento Antiedad - 90 min - $120
  - Hidratación Facial - 60 min - $85
  - Peeling Químico - 75 min - $100

- **Tratamientos Corporales:**
  - Venus Legacy - 60 min - $150
  - Masaje Relajante - 90 min - $100
  - Tratamiento Reductivo - 75 min - $110

#### 5. Gestión de Disponibilidad (`/admin/dashboard/availability`)
- **Horario de Atención:** Establecer horas de trabajo para cada día de la semana
- **Fechas Bloqueadas:** Bloquear fechas específicas para vacaciones, feriados o tiempo personal
- Activar/desactivar días específicos
- Añadir razones para fechas bloqueadas (opcional)

**Horario por Defecto:**
- Lunes - Viernes: 9:00 AM - 5:00 PM
- Sábado: 10:00 AM - 2:00 PM
- Domingo: Cerrado

### Stack Técnico
- **Framework:** Next.js 16.0.0 con App Router
- **Autenticación:** NextAuth.js v5
- **Base de Datos:** Prisma ORM con SQLite
- **Calendario:** react-big-calendar
- **Estilos:** Tailwind CSS
- **Email:** Web3Forms (formulario de contacto)

### Comandos de Base de Datos
```bash
# Generar Prisma Client
pnpm prisma:generate

# Ejecutar migraciones
pnpm prisma:migrate

# Poblar base de datos
pnpm prisma:seed

# Abrir Prisma Studio (GUI de base de datos)
pnpm prisma studio
```

---

## Important Notes / Notas Importantes

### Security / Seguridad
⚠️ **IMPORTANT:** Change the default admin password after first login!
⚠️ **IMPORTANTE:** ¡Cambia la contraseña de admin por defecto después del primer ingreso!

### Production Deployment / Despliegue en Producción
Before deploying to production, make sure to:
Antes de desplegar a producción, asegúrate de:

1. Change `DATABASE_URL` to a production database (PostgreSQL recommended)
   Cambiar `DATABASE_URL` a una base de datos de producción (PostgreSQL recomendado)

2. Update `NEXTAUTH_SECRET` with a secure random string
   Actualizar `NEXTAUTH_SECRET` con un string aleatorio seguro

3. Set `NEXTAUTH_URL` to your production domain
   Establecer `NEXTAUTH_URL` a tu dominio de producción

4. Configure proper email service for notifications
   Configurar servicio de email apropiado para notificaciones

### Support / Soporte
For issues or questions, contact:
Para problemas o preguntas, contactar:
- Email: k1111marketing@gmail.com
