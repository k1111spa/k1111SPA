# 📧 Configuración de ImprovMX - Email Profesional GRATIS

## 🔑 Tu API Key
```
sk_aa4f1566718e437faf82f3fe485ff9e9
```

## 📋 Pasos para Configurar Email con Dominio

### 1️⃣ Registros DNS a Agregar en tu Dominio

Ve al panel de control donde compraste **k1111spa.com** (GoDaddy, Namecheap, etc.) y agrega estos registros MX:

#### Registros MX (Mail Exchange):
```
Tipo: MX
Host: @
Prioridad: 10
Valor: mx1.improvmx.com

Tipo: MX
Host: @
Prioridad: 20
Valor: mx2.improvmx.com
```

### 2️⃣ Aliases de Email Recomendados

Una vez configurado DNS, crea estos aliases en ImprovMX:

```
contacto@k1111spa.com    → k1111marketing@gmail.com
info@k1111spa.com        → k1111marketing@gmail.com
ventas@k1111spa.com      → k1111marketing@gmail.com
citas@k1111spa.com       → k1111marketing@gmail.com
kimberly@k1111spa.com    → k1111marketing@gmail.com
```

### 3️⃣ Verificación

Después de agregar los registros DNS:
1. Espera 10-30 minutos (propagación DNS)
2. Ve a https://improvmx.com/dashboard
3. Verifica que tu dominio esté activo ✅
4. Envía un email de prueba a: contacto@k1111spa.com
5. Deberías recibirlo en: k1111marketing@gmail.com

---

## 📤 Para ENVIAR Emails desde tu Dominio

### Opción 1: Configurar Gmail (Recomendado)

1. Ve a Gmail → Configuración → Cuentas e importación
2. Click en "Agregar otra dirección de correo"
3. Agrega: `contacto@k1111spa.com`
4. Servidor SMTP de ImprovMX:
   ```
   Servidor: smtp.improvmx.com
   Puerto: 587
   Usuario: contacto@k1111spa.com
   Contraseña: sk_aa4f1566718e437faf82f3fe485ff9e9
   TLS: Activado
   ```

### Opción 2: Usar API de ImprovMX (Programático)

Si quieres enviar emails desde tu aplicación:

```javascript
// Endpoint de ImprovMX
POST https://api.improvmx.com/v3/domains/k1111spa.com/send

Headers:
Authorization: Basic sk_aa4f1566718e437faf82f3fe485ff9e9

Body:
{
  "from": "contacto@k1111spa.com",
  "to": "cliente@ejemplo.com",
  "subject": "Confirmación de cita",
  "text": "Tu cita ha sido confirmada..."
}
```

---

## ✅ Beneficios de ImprovMX

- ✅ **100% Gratis** - Sin límites de emails recibidos
- ✅ **25 aliases** - Múltiples direcciones profesionales
- ✅ **Fácil setup** - Solo 2 registros DNS
- ✅ **SMTP incluido** - Puedes enviar emails también
- ✅ **Sin publicidad** - Emails limpios
- ✅ **Reenvío instantáneo** - Latencia mínima

---

## 🔧 Configuración Adicional (Opcional)

### SPF Record (Mejora deliverability)
```
Tipo: TXT
Host: @
Valor: v=spf1 include:spf.improvmx.com ~all
```

### DKIM (Autenticación de emails)
ImprovMX te dará un registro DKIM específico una vez configures el dominio.

---

## 📞 Soporte

- Dashboard: https://improvmx.com/dashboard
- Docs: https://improvmx.com/guides/
- API Docs: https://improvmx.com/api/

---

## 🎯 Siguiente Paso

**IR A TU PROVEEDOR DE DOMINIO AHORA Y AGREGAR LOS 2 REGISTROS MX** ☝️

En 10 minutos tendrás email profesional funcionando! 🚀
