import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import dayjs from "dayjs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { serviceId, date, startTime, endTime, name, email, phone, notes } = body

    // Validate required fields
    if (!serviceId || !date || !startTime || !endTime || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check for double booking - validate if time slot is already taken
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: new Date(date),
        status: {
          in: ["pending", "confirmed"], // Only check pending and confirmed appointments
        },
        OR: [
          {
            // New appointment starts during existing appointment
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } },
            ],
          },
          {
            // New appointment ends during existing appointment
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } },
            ],
          },
          {
            // New appointment completely contains existing appointment
            AND: [
              { startTime: { gte: startTime } },
              { endTime: { lte: endTime } },
            ],
          },
        ],
      },
    })

    if (existingAppointment) {
      return NextResponse.json(
        { error: "This time slot is already booked. Please choose another time." },
        { status: 409 }
      )
    }

    // Check if user exists, if not create one
    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          phone,
        },
      })
    } else {
      // Update user info if they exist
      user = await prisma.user.update({
        where: { email },
        data: {
          name,
          phone,
        },
      })
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        serviceId,
        date: new Date(date),
        startTime,
        endTime,
        status: "pending",
        notes: notes || null,
      },
      include: {
        service: true,
        user: true,
      },
    })

    // Send admin notification email
    // Web3Forms free plan sends to configured email (k1111marketing@gmail.com)
    // Client receives on-screen confirmation with all details
    const formattedDate = dayjs(date).format("MMMM D, YYYY")

    try {
      const emailData = new FormData()
      emailData.append("access_key", "df27a237-4c41-4f23-bd2f-1fcb9879891f")
      emailData.append("subject", "🔔 Nueva Cita - K Life Spa / New Appointment Request")
      emailData.append("from_name", "K Life Spa Booking System")
      emailData.append("name", name)
      emailData.append("email", email)

      emailData.append(
        "message",
        `🔔 NUEVA SOLICITUD DE CITA / NEW APPOINTMENT REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT INFORMATION / INFORMACIÓN DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name / Nombre: ${name}
Email / Correo: ${email}
Phone / Teléfono: ${phone}

APPOINTMENT DETAILS / DETALLES DE LA CITA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service / Servicio: ${appointment.service.name}
Date / Fecha: ${formattedDate}
Time / Hora: ${startTime}
Duration / Duración: ${appointment.service.duration} minutes/minutos
Price / Precio: $${appointment.service.price}

${notes ? `Special Notes / Notas Especiales:\n${notes}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` : ''}
STATUS / ESTADO: ⏳ Pending Confirmation / Pendiente de Confirmación

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTION REQUIRED / ACCIÓN REQUERIDA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please log in to your admin panel to confirm or reject this appointment:
Por favor ingresa a tu panel de administración para confirmar o rechazar esta cita:

👉 ${process.env.NEXTAUTH_URL || 'https://k1111spa.life'}/admin/dashboard/appointments

IMPORTANT: The client is waiting for your confirmation!
IMPORTANTE: ¡El cliente está esperando tu confirmación!

You should contact the client at:
Debes contactar al cliente en:
📧 ${email}
📱 ${phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

K Life 1111 Spa - Booking System
Automated Notification / Notificación Automática`
      )

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: emailData,
      })

      const data = await response.json()
      console.log("Email sent:", data)
    } catch (emailError) {
      console.error("Error sending emails:", emailError)
      // Don't fail the appointment creation if email fails
    }


    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
