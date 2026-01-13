# Configuración de Email con Gmail

## Pasos para configurar el envío de emails:

### 1. Habilitar la verificación en 2 pasos en Gmail
1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. En el menú izquierdo, selecciona "Seguridad"
3. En "Cómo inicias sesión en Google", selecciona "Verificación en 2 pasos"
4. Sigue los pasos para activarla

### 2. Generar una contraseña de aplicación
1. Ve a https://myaccount.google.com/apppasswords
2. En "Seleccionar app", elige "Correo"
3. En "Seleccionar dispositivo", elige "Otro (nombre personalizado)"
4. Escribe "La Casa de la Bendición Web" (o el nombre que prefieras)
5. Haz clic en "Generar"
6. **Copia la contraseña de 16 caracteres** que aparece (sin espacios)

### 3. Configurar las variables de entorno
1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza `your-app-password-here` con la contraseña que copiaste:
   ```
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   ```
   (Nota: la contraseña debe ir sin espacios: `abcdefghijklmnop`)

### 4. Reiniciar el servidor
```bash
npm run dev
```

## Variables de entorno configuradas:

- `EMAIL_USER`: weareonelcb@gmail.com (email que envía)
- `EMAIL_PASSWORD`: Contraseña de aplicación de Gmail
- `EMAIL_TO`: weareonelcb@gmail.com (email que recibe los mensajes)

## Probar el formulario:

1. Ve a http://localhost:3000
2. Desplázate hasta la sección "Contacto"
3. Completa el formulario y envía
4. Deberías recibir el email en weareonelcb@gmail.com

## Importante:

⚠️ **NUNCA subas el archivo `.env` a GitHub**. Ya está en `.gitignore` por seguridad.

## Solución de problemas:

Si el email no se envía:
1. Verifica que la contraseña de aplicación esté correcta (sin espacios)
2. Asegúrate de que la verificación en 2 pasos esté activa
3. Revisa la consola del navegador y del servidor para ver errores
4. Verifica que el email en `EMAIL_USER` sea correcto

## Personalización:

El template del email se puede modificar en:
`src/app/api/contact/route.ts`
