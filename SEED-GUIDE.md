# Guía de Seed de Datos - La Casa de la Bendición

## 📦 Contenido del Seed

El script `seed-complete.ts` crea datos de ejemplo completos para todas las collections:

### Collections incluidas:
- **8 Prédicas** con predicadores variados y versículos
- **6 Eventos** (cultos, retiros, conferencias, actividades juveniles)
- **3 Convenciones** masivas con agendas completas y conferencistas
- **5 Devocionales** con diferentes categorías
- **3 Sedes** (Central, Norte, Sur)
- **Hero Section** actualizado
- **Contact Info** actualizado

## 🚀 Cómo ejecutar el seed

### 1. Asegúrate de tener la base de datos inicializada

```bash
npm run dev
```

Esto generará el archivo `database.db` si no existe.

### 2. Ejecuta el seed

```bash
npm run seed
```

### 3. Verifica los datos

Accede al admin panel en `http://localhost:3000/admin` y revisa que todas las collections tengan datos.

## 🎪 Nueva Sección: Convenciones

Se agregó una **nueva collection especializada** para eventos masivos con características avanzadas:

### Características de Convenciones:

#### Información Básica
- Título y subtítulo (lema del evento)
- Descripción completa
- Imágenes principal y secundaria
- Fechas de inicio y fin
- Ubicación detallada (lugar, ciudad, país)

#### Información Logística
- Capacidad estimada de asistentes
- Costos (general, estudiantes)
- Moneda (ARS, USD, FREE)
- Requerimientos de inscripción

#### Conferencistas
Array de conferencistas con:
- Nombre
- Ministerio/Iglesia
- Biografía
- Foto

#### Agenda del Evento
Array de actividades con:
- Día y hora
- Actividad
- Descripción
- Conferencista asignado

#### Marketing
- Versículo tema
- Hashtag para redes sociales
- Links a redes sociales del evento (Facebook, Instagram, YouTube)

#### Control
- Checkbox "Destacada" (para mostrar prominentemente)
- Checkbox "Activa" (para ocultar eventos pasados)

## 🎨 Componente Frontend: ConvencionesSection

### Uso en la página principal

```tsx
import ConvencionesSection from "@/components/ConvencionesSection";

export default async function HomePage() {
  // Fetch convenciones desde Payload
  const convenciones = await payload.find({
    collection: "convenciones",
    where: {
      activa: {
        equals: true,
      },
    },
    sort: "-fechaInicio",
  });

  return (
    <>
      {/* ... otros componentes ... */}
      <ConvencionesSection convenciones={convenciones.docs} />
      {/* ... otros componentes ... */}
    </>
  );
}
```

### Características del componente:

#### Layout Responsive
- **Convenciones destacadas**: Layout de 2 columnas (imagen + contenido)
- **Otras convenciones**: Grid de cards (1-3 columnas según pantalla)

#### Información mostrada
- Título y subtítulo
- Descripción
- Fecha y lugar
- Capacidad
- Precio (con soporte para entrada gratis)
- Lista de conferencistas
- Hashtag del evento

#### Animaciones
- Fade-in al hacer scroll (Framer Motion)
- Hover effects en cards
- Transiciones suaves

#### CTAs
- Botón primario: "Inscribirme ahora"
- Botón secundario: "Más información"
- Ambos linkean a la sección de contacto

## 📊 Datos de Ejemplo Incluidos

### Convención "Avivamiento 2026"
- **Fecha**: 10-12 Julio 2026
- **Lugar**: Estadio Luna Park, Buenos Aires
- **Capacidad**: 5,000 personas
- **Conferencistas**: Marcos Witt, Christine Caine, Claudio Freidzon
- **Precio**: $3,500 (General) / $2,000 (Estudiantes)
- **Estado**: Destacada y Activa

### Convención "Cumbre de Liderazgo"
- **Fecha**: 5-6 Septiembre 2026
- **Lugar**: Centro de Convenciones Hilton, Buenos Aires
- **Capacidad**: 1,500 personas
- **Conferencistas**: John Maxwell, Cash Luna
- **Precio**: $8,500 (General) / $5,000 (Estudiantes)
- **Estado**: Destacada y Activa

### Convención "Encuentro Familiar"
- **Fecha**: 20 Mayo 2026
- **Lugar**: Parque de la Ciudad, Buenos Aires
- **Capacidad**: 3,000 personas
- **Conferencista**: Dante Gebel
- **Precio**: Gratis
- **Estado**: Activa (no destacada)

## 🎯 Diferencias: Eventos vs Convenciones

### Eventos
- Para actividades regulares de la iglesia
- Cultos, retiros pequeños, reuniones de oración
- Menos campos requeridos
- Gestión más simple

### Convenciones
- Para eventos masivos ministeriales
- Múltiples conferencistas, agenda detallada
- Sistema de costos más robusto
- Marketing y promoción avanzados
- Gestión de capacidad

## 🔄 Regenerar datos

Si necesitas limpiar y volver a generar los datos:

1. Detén el servidor
2. Elimina `database.db`
3. Inicia el servidor: `npm run dev`
4. Ejecuta el seed: `npm run seed`

## 📝 Personalización

Para modificar los datos de ejemplo, edita el archivo:
```
scripts/seed-complete.ts
```

Los datos están organizados por sección y son fáciles de modificar.

## ⚠️ Notas Importantes

- El seed **NO elimina** datos existentes, solo agrega nuevos
- Los IDs de YouTube en las prédicas son de ejemplo (usa IDs reales cuando tengas el contenido)
- Las imágenes no están incluidas en el seed (usa el admin panel para subirlas)
- Ajusta los precios según la moneda de tu región

## 🆘 Soporte

Si encuentras problemas:
1. Verifica que la base de datos esté inicializada
2. Revisa los logs en la consola
3. Asegúrate de que todas las collections estén en `payload.config.ts`
4. Verifica que el script esté en formato ESM (extensión `.ts` con `type: "module"` en package.json)
