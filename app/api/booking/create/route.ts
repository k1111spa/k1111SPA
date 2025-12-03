import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import dayjs from "dayjs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { serviceId, date, startTime, endTime, name, email, phone, notes, userId, status } = body

    // Si viene userId directamente (desde admin), no requiere name/email/phone
    const isAdminBooking = !!userId

    // Validate required fields
    if (!serviceId || !date || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Si no es booking de admin, requiere datos del cliente
    if (!isAdminBooking && (!name || !email || !phone)) {
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

    // Si es booking de admin, usar userId directamente
    let finalUserId = userId

    if (!isAdminBooking) {
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
      finalUserId = user.id
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: finalUserId,
        serviceId,
        date: new Date(date),
        startTime,
        endTime,
        status: status || "pending", // Admin puede pasar estado directamente
        notes: notes || null,
      },
      include: {
        service: true,
        user: true,
      },
    })

    // Solo enviar email si NO es booking de admin (booking de cliente)
    if (!isAdminBooking) {
      // Send admin notification email
      // Web3Forms free plan sends to configured email (k1111marketing@gmail.com)
      // Client receives on-screen confirmation with all details
      const formattedDate = dayjs(date).format("MMMM D, YYYY")

      try {
        const emailPayload = {
          access_key: "df27a237-4c41-4f23-bd2f-1fcb9879891f",
          subject: "Nueva Cita - K Life Spa / New Appointment Request",
          from_name: "K Life Spa Booking System",
          name: name,
          email: email,
          message: `NUEVA SOLICITUD DE CITA / NEW APPOINTMENT REQUEST

CLIENT INFORMATION / INFORMACION DEL CLIENTE:
Name / Nombre: ${name}
Email / Correo: ${email}
Phone / Telefono: ${phone}

APPOINTMENT DETAILS / DETALLES DE LA CITA:
Service / Servicio: ${appointment.service.name}
Date / Fecha: ${formattedDate}
Time / Hora: ${startTime}
Duration / Duracion: ${appointment.service.duration} minutes/minutos
Price / Precio: $${appointment.service.price}

${notes ? `Special Notes / Notas Especiales: ${notes}` : ''}

STATUS / ESTADO: Pending Confirmation / Pendiente de Confirmacion

ACTION REQUIRED / ACCION REQUERIDA:
Please log in to your admin panel to confirm or reject this appointment:
Por favor ingresa a tu panel de administracion para confirmar o rechazar esta cita:

${process.env.NEXTAUTH_URL || 'https://k1111spa.life'}/admin/dashboard/appointments

IMPORTANT: The client is waiting for your confirmation!
IMPORTANTE: El cliente esta esperando tu confirmacion!

Contact the client at / Debes contactar al cliente en:
Email: ${email}
Phone: ${phone}

K Life 1111 Spa - Booking System`
        }

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(emailPayload),
        })

        const data = await response.json()
        console.log("Email sent:", data)
      } catch (emailError) {
        console.error("Error sending emails:", emailError)
        // Don't fail the appointment creation if email fails
      }
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
