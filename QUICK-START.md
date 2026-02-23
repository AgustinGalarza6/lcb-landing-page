# 🚀 Quick Start - Sistema de Convenciones

## ✅ ¿Qué se implementó?

1. **Nueva Collection:** `Convenciones` - Para eventos masivos ministeriales
2. **Componente Frontend:** `ConvencionesSection` - Landing premium
3. **Seed Completo:** Datos de prueba para todas las collections
4. **Documentación:** Guías de uso y configuración

---

## 🏃 Inicio Rápido

### 1. Generar datos de prueba

```bash
npm run seed
```

**Esto creará:**
- ✅ 8 Prédicas
- ✅ 6 Eventos  
- ✅ 3 Convenciones masivas
- ✅ 5 Devocionales
- ✅ 3 Sedes
- ✅ Configuración global

### 2. Ver el admin panel

```bash
npm run dev
```

Ir a: `http://localhost:3000/admin`

Navega a **"Convenciones"** en el sidebar para ver las 3 convenciones creadas:
- Avivamiento 2026 (Luna Park, 5000 personas)
- Cumbre de Liderazgo (Hilton, 1500 personas)
- Encuentro Familiar (Parque, 3000 personas, GRATIS)

### 3. Usar el componente en tu página

```tsx
// src/app/(frontend)/page.tsx
import ConvencionesSection from "@/components/ConvencionesSection";

export default async function HomePage() {
  const convenciones = await payload.find({
    collection: "convenciones",
    where: { activa: { equals: true } },
    sort: "-fechaInicio",
  });

  return (
    <>
      {/* tus otros componentes */}
      <ConvencionesSection convenciones={convenciones.docs} />
    </>
  );
}
```

---

## 📋 Características de Convenciones

### ✨ Lo que puedes gestionar:

#### Información Básica
- Título y subtítulo (lema)
- Descripción completa  
- Fechas (inicio/fin)
- Ubicación (lugar, ciudad, país)
- Capacidad de asistentes

#### Conferencistas
- Nombre y ministerio
- Biografía
- Foto

#### Agenda Completa
- Día y hora
- Actividad y descripción
- Conferencista asignado

#### Precios
- General y estudiantes
- Soporte para ARS, USD o GRATIS

#### Marketing
- Hashtag para redes
- Links a Facebook, Instagram, YouTube
- Versículo tema

#### Control
- **Destacada:** Mostrar con layout grande
- **Activa:** Ocultar eventos pasados

---

## 🎨 Componente Frontend

### Layout Destacado
Para convenciones marcadas como "Destacada":
- **2 columnas (50/50)**
- Imagen grande + Info completa
- Grid de datos (fecha, lugar, precio, capacidad)
- Lista de conferencistas
- 2 CTAs (Inscripción + Más info)

### Layout Card
Para convenciones regulares:
- **Grid responsive (1-3 columnas)**
- Card con imagen arriba
- Info resumida
- 1 CTA principal

### Animaciones
- ✅ Fade-in al scroll (Framer Motion)
- ✅ Delays progresivos
- ✅ Hover effects
- ✅ Transiciones suaves

---

## 📊 Diferencias: Eventos vs Convenciones

| | **Eventos** | **Convenciones** |
|---|---|---|
| **Escala** | Local, regular | Masiva, especial |
| **Duración** | Horas | Días (agenda) |
| **Conferencistas** | 0-1 simple | Múltiples con detalles |
| **Precio** | Simple | Categorías (general/estudiantes) |
| **Capacidad** | No gestionada | Con cupos |
| **Marketing** | Básico | Avanzado (hashtag, redes) |
| **Uso** | Cultos, retiros | Convenciones, conferencias |

---

## 📁 Archivos Creados

```
├── src/
│   ├── collections/
│   │   └── Convenciones.ts          ✅ Collection definition
│   ├── components/
│   │   └── ConvencionesSection.tsx  ✅ Frontend component
│   └── payload.config.ts            ✅ Actualizado
├── scripts/
│   └── seed-complete.ts             ✅ Seed con datos
├── SEED-GUIDE.md                    ✅ Guía detallada
├── IMPLEMENTACION-RESUMEN.md        ✅ Resumen técnico
└── QUICK-START.md                   ✅ Este archivo
```

---

## 🎯 Próximos Pasos Sugeridos

1. **Ejecuta el seed:** `npm run seed`
2. **Revisa el admin:** Agrega imágenes reales a las convenciones
3. **Prueba el componente:** Intégralo en tu página principal
4. **Personaliza:** Ajusta colores, textos y layout según tu marca
5. **Crea tu primera convención:** Usa el admin panel

---

## 📚 Documentación Completa

- **`SEED-GUIDE.md`** - Guía detallada del seed y uso
- **`IMPLEMENTACION-RESUMEN.md`** - Documentación técnica completa

---

## 🆘 Troubleshooting

### No se crean los datos al correr el seed
- Asegúrate de que el server de dev haya corrido al menos una vez (`npm run dev`)
- Verifica que existe el archivo `database.db`

### No aparece "Convenciones" en el admin
- Regenera los tipos: `npm run generate:types`
- Reinicia el servidor

### Errores de TypeScript en el componente
- Asegúrate de haber ejecutado `npm run generate:types`
- Los tipos de `Convenciones` deben estar en `src/payload-types.ts`

---

## 💡 Tips

- Marca solo 1-2 convenciones como "Destacada" para mejor UX
- Desactiva convenciones pasadas con el checkbox "Activa"
- Agrega hashtags únicos para cada convención
- Completa la agenda con detalle para informar mejor a los asistentes
- Usa imágenes de alta calidad (1920x1080px) para mejor apariencia

---

## 🎉 ¡Todo listo!

El sistema está completamente implementado y funcional. Empieza corriendo el seed y explora el admin panel.

**¿Necesitas ayuda?** Revisa los archivos de documentación en la raíz del proyecto.
