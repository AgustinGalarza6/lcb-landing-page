# La Casa de la Bendición - Landing Page

Landing page oficial de La Casa de la Bendición construida con Next.js 15, React 19, TypeScript, Tailwind CSS y Payload CMS.

## Características

- 📖 **Predicas**: Videos de YouTube con apuntes, fecha, hora y predicador
- 📅 **Eventos**: Calendario de eventos durante el año
- ✝️ **Contenido Devocional**: Apuntes y reflexiones de los pastores
- 📍 **Ubicación y Contacto**: Información de la sede
- 💳 **Sistema de Pagos**: Para manillas y artículos de convenciones

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **CMS**: Payload CMS
- **Base de Datos**: SQLite

## Comenzar

1. Instalar dependencias:
```bash
npm install
```

2. Copiar el archivo de variables de entorno:
```bash
cp .env.example .env
```

3. Configurar las variables de entorno en `.env`

4. Ejecutar el servidor de desarrollo:
```bash
npm run dev
```

5. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador

6. Acceder al panel admin de Payload CMS en [http://localhost:3000/admin](http://localhost:3000/admin)

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run generate:types` - Genera los tipos de TypeScript desde Payload CMS

## Estructura del Proyecto

```
la-casa-de-la-bendicion/
├── src/
│   ├── app/
│   │   ├── (frontend)/    # Páginas públicas
│   │   └── (payload)/     # Panel de administración
│   ├── collections/       # Colecciones de Payload CMS
│   ├── components/        # Componentes de React
│   ├── globals/           # Configuraciones globales de Payload
│   └── lib/               # Utilidades y helpers
├── public/                # Archivos estáticos
└── package.json
```

## Licencia

Proyecto privado - La Casa de la Bendición © 2026
