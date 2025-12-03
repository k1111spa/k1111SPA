import { NextResponse } from "next/server"

// GET: Prueba rápida de email
export async function GET() {
  try {
    const emailData = new FormData()
    emailData.append("access_key", "df27a237-4c41-4f23-bd2f-1fcb9879891f")
    emailData.append("subject", "🧪 TEST - K Life Spa Email Funcionando")
    emailData.append("from_name", "K Life Spa Test")
    emailData.append("name", "Sistema de Prueba")
    emailData.append("email", "test@k1111spa.life")
    emailData.append(
      "message",
      `✅ PRUEBA DE EMAIL - K LIFE SPA

Este es un correo de PRUEBA para verificar que Web3Forms funciona.

Fecha/Hora: ${new Date().toISOString()}

Si recibes este correo en k1111marketing@gmail.com, el sistema de emails está funcionando correctamente.

El problema podría ser:
1. Los correos llegan a SPAM
2. La cita se creó desde el admin (no envía email)
3. Error en el formulario de booking del cliente`
    )

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: emailData,
    })

    const data = await response.json()

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      web3formsResponse: data,
      message: response.ok
        ? "Email enviado! Revisa k1111marketing@gmail.com (incluyendo SPAM)"
        : "Error al enviar email",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({
      error: "Failed to send test email",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json()

    if (type === "client") {
      // Send test client confirmation email
      const clientEmailData = new FormData()
      clientEmailData.append("access_key", "df27a237-4c41-4f23-bd2f-1fcb9879891f")
      clientEmailData.append("subject", "TEST - Appointment Confirmation - K Life Spa")
      clientEmailData.append("from_name", "K Life Spa")
      clientEmailData.append("email", email)
      clientEmailData.append("name", "Test Client")

      clientEmailData.append(
        "message",
        `This is a TEST email from K Life Spa booking system.

Dear Test Client,

Thank you for your appointment request at K Life Spa!

APPOINTMENT DETAILS (TEST):
- Service: Venus Legacy
- Date: December 15, 2024
- Time: 10:00 AM
- Duration: 60 minutes
- Price: $150

Your appointment request has been received and is pending confirmation.

Best regards,
Kimberly Alcantara
K Life 1111 Spa
Phone: 305.680.6500
Location: Coral Gables

---

Este es un email de PRUEBA del sistema de reservas de K Life Spa.

Estimado/a Cliente de Prueba,

¡Gracias por tu solicitud de cita en K Life Spa!

DETALLES DE LA CITA (PRUEBA):
- Servicio: Venus Legacy
- Fecha: 15 de Diciembre, 2024
- Hora: 10:00 AM
- Duración: 60 minutos
- Precio: $150

Tu solicitud de cita ha sido recibida y está pendiente de confirmación.

Saludos cordiales,
Kimberly Alcantara
K Life 1111 Spa
Teléfono: 305.680.6500
Ubicación: Coral Gables`
      )

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: clientEmailData,
      })

      const data = await response.json()
      return NextResponse.json({ success: true, data })
    }

    if (type === "admin") {
      // Send test admin notification email
      const adminEmailData = new FormData()
      adminEmailData.append("access_key", "df27a237-4c41-4f23-bd2f-1fcb9879891f")
      adminEmailData.append("subject", "🔔 TEST - New Appointment Request - K Life Spa")
      adminEmailData.append("from_name", "K Life Spa Booking System")

      adminEmailData.append(
        "message",
        `TEST EMAIL - NEW APPOINTMENT REQUEST

CLIENT INFORMATION:
Name: Test Client
Email: ${email}
Phone: (305) 555-1234

APPOINTMENT DETAILS:
Service: Venus Legacy
Date: December 15, 2024
Time: 10:00 AM - 11:00 AM
Duration: 60 minutes
Price: $150

Special Notes: This is a test booking to verify the email system is working correctly.

STATUS: Pending Confirmation

Please log in to your admin panel to confirm or reject this appointment:
http://localhost:3000/admin/dashboard/appointments

---

EMAIL DE PRUEBA - NUEVA SOLICITUD DE CITA

INFORMACIÓN DEL CLIENTE:
Nombre: Cliente de Prueba
Email: ${email}
Teléfono: (305) 555-1234

DETALLES DE LA CITA:
Servicio: Venus Legacy
Fecha: 15 de Diciembre, 2024
Hora: 10:00 AM - 11:00 AM
Duración: 60 minutos
Precio: $150

Notas Especiales: Esta es una reserva de prueba para verificar que el sistema de emails funciona correctamente.

ESTADO: Pendiente de Confirmación

Por favor ingresa a tu panel de administración para confirmar o rechazar esta cita:
http://localhost:3000/admin/dashboard/appointments`
      )

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: adminEmailData,
      })

      const data = await response.json()
      return NextResponse.json({ success: true, data })
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  } catch (error) {
    console.error("Error sending test email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
