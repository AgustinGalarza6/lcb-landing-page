import payload from "payload";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const seed = async () => {
  try {
    const configPath = path.resolve(dirname, "../src/payload.config.ts");
    const config = await import(pathToFileURL(configPath).href).then((m) => m.default);
    
    await payload.init({
      config,
    });

    console.log("🌱 Iniciando seed de datos...\n");

    // ============================================
    // PRÉDICAS
    // ============================================
    console.log("📖 Creando prédicas...");
    const predicas = [
      {
        titulo: "El Poder de la Fe",
        descripcion: "Una poderosa enseñanza sobre cómo la fe mueve montañas y transforma vidas.",
        youtubeVideoId: "dQw4w9WgXcQ",
        predicador: "Pastor Juan Rodríguez",
        fecha: "2026-02-15",
        versiculo: "Hebreos 11:1",
        destacada: true,
      },
      {
        titulo: "Viviendo en Gracia",
        descripcion: "Descubre cómo vivir bajo la gracia de Dios cada día.",
        youtubeVideoId: "3JZ_D3ELwOQ",
        predicador: "Pastora María González",
        fecha: "2026-02-08",
        versiculo: "Efesios 2:8-9",
        destacada: true,
      },
      {
        titulo: "El Amor de Dios",
        descripcion: "Reflexión profunda sobre el amor incondicional de Dios por la humanidad.",
        youtubeVideoId: "kJQP7kiw5Fk",
        predicador: "Pastor Juan Rodríguez",
        fecha: "2026-02-01",
        versiculo: "Juan 3:16",
        destacada: false,
      },
      {
        titulo: "Adoración en Espíritu y Verdad",
        descripcion: "Cómo adorar a Dios de la manera que Él desea.",
        youtubeVideoId: "L_jWHffIx5E",
        predicador: "Pastor Carlos Méndez",
        fecha: "2026-01-25",
        versiculo: "Juan 4:23-24",
        destacada: false,
      },
      {
        titulo: "La Oración que Transforma",
        descripcion: "Descubre el poder de una vida de oración constante.",
        youtubeVideoId: "9bZkp7q19f0",
        predicador: "Pastora María González",
        fecha: "2026-01-18",
        versiculo: "1 Tesalonicenses 5:17",
        destacada: true,
      },
      {
        titulo: "Identidad en Cristo",
        descripcion: "Encuentra tu verdadera identidad como hijo de Dios.",
        youtubeVideoId: "60ItHLz5WEA",
        predicador: "Pastor Juan Rodríguez",
        fecha: "2026-01-11",
        versiculo: "2 Corintios 5:17",
        destacada: false,
      },
      {
        titulo: "El Propósito de Dios para tu Vida",
        descripcion: "Descubre el plan perfecto que Dios tiene preparado para ti.",
        youtubeVideoId: "fJ9rUzIMcZQ",
        predicador: "Pastor Carlos Méndez",
        fecha: "2026-01-04",
        versiculo: "Jeremías 29:11",
        destacada: false,
      },
      {
        titulo: "Venciendo las Pruebas",
        descripcion: "Cómo mantener la fe en medio de las dificultades.",
        youtubeVideoId: "JGwWNGJdvx8",
        predicador: "Pastora María González",
        fecha: "2025-12-28",
        versiculo: "Santiago 1:2-4",
        destacada: false,
      },
    ];

    for (const predica of predicas) {
      await payload.create({
        collection: "predicas",
        data: predica,
      });
    }
    console.log(`✅ ${predicas.length} prédicas creadas\n`);

    // ============================================
    // EVENTOS
    // ============================================
    console.log("📅 Creando eventos...");
    const eventos = [
      {
        titulo: "Culto de Celebración",
        descripcion: "Únete a nosotros para un tiempo de adoración y alabanza poderoso.",
        fecha: "2026-02-28T19:00:00.000Z",
        hora: "7:00 PM - 9:00 PM",
        lugar: "Sede Central",
        direccion: "Av. Libertador 1234, Buenos Aires",
        tipoEvento: "culto",
        destacado: true,
        requiereInscripcion: false,
      },
      {
        titulo: "Noche de Jóvenes",
        descripcion: "Evento especial para jóvenes con música en vivo, testimonios y enseñanza.",
        fecha: "2026-03-05T20:00:00.000Z",
        hora: "8:00 PM - 11:00 PM",
        lugar: "Sede Central",
        direccion: "Av. Libertador 1234, Buenos Aires",
        tipoEvento: "juvenil",
        destacado: true,
        requiereInscripcion: true,
      },
      {
        titulo: "Retiro Espiritual de Fin de Semana",
        descripcion: "Retiro de tres días para renovar tu espíritu y conectarte con Dios.",
        fecha: "2026-03-15T09:00:00.000Z",
        fechaFin: "2026-03-17T18:00:00.000Z",
        hora: "Viernes 9:00 AM - Domingo 6:00 PM",
        lugar: "Centro de Retiros El Shaddai",
        direccion: "Ruta 9 Km 45, Pilar, Buenos Aires",
        tipoEvento: "retiro",
        destacado: true,
        requiereInscripcion: true,
        linkInscripcion: "https://forms.gle/ejemplo",
      },
      {
        titulo: "Reunión de Oración Matutina",
        descripcion: "Comienza tu día orando junto a la comunidad.",
        fecha: "2026-03-01T06:00:00.000Z",
        hora: "6:00 AM - 7:30 AM",
        lugar: "Sede Central",
        direccion: "Av. Libertador 1234, Buenos Aires",
        tipoEvento: "oracion",
        destacado: false,
        requiereInscripcion: false,
      },
      {
        titulo: "Conferencia: El Espíritu Santo Hoy",
        descripcion: "Serie de conferencias sobre la obra del Espíritu Santo en la iglesia moderna.",
        fecha: "2026-03-20T19:30:00.000Z",
        fechaFin: "2026-03-22T21:00:00.000Z",
        hora: "7:30 PM - 9:00 PM",
        lugar: "Auditorio Principal",
        direccion: "Av. Libertador 1234, Buenos Aires",
        tipoEvento: "conferencia",
        destacado: true,
        requiereInscripcion: false,
      },
      {
        titulo: "Cena de Matrimonios",
        descripcion: "Una noche especial para fortalecer los matrimonios de nuestra iglesia.",
        fecha: "2026-04-12T20:00:00.000Z",
        hora: "8:00 PM - 11:00 PM",
        lugar: "Salón de Eventos",
        direccion: "Av. Santa Fe 2456, Buenos Aires",
        tipoEvento: "especial",
        destacado: false,
        requiereInscripcion: true,
      },
    ];

    for (const evento of eventos) {
      await payload.create({
        collection: "eventos",
        data: evento as any,
      });
    }
    console.log(`✅ ${eventos.length} eventos creados\n`);

    // ============================================
    // CONVENCIONES
    // ============================================
    console.log("🎪 Creando convenciones...");
    const convenciones = [
      {
        titulo: "Avivamiento 2026",
        subtitulo: "Un derramamiento del Espíritu Santo",
        descripcion:
          "Únete a nosotros para tres días de adoración intensa, enseñanza poderosa y manifestaciones del Espíritu Santo. Conferencistas internacionales compartirán la Palabra de Dios. Esperamos más de 5,000 personas de todo el país.",
        fechaInicio: "2026-07-10T18:00:00.000Z",
        fechaFin: "2026-07-12T22:00:00.000Z",
        lugar: "Estadio Luna Park",
        direccionCompleta: "Av. Eduardo Madero 470, San Nicolás, Buenos Aires",
        ciudad: "Buenos Aires",
        pais: "Argentina",
        capacidad: 5000,
        conferencistas: [
          {
            nombre: "Pastor Marcos Witt",
            ministerio: "CanZion Institute",
            biografia: "Reconocido pastor, cantante y conferencista internacional con más de 30 años de ministerio.",
          },
          {
            nombre: "Pastora Christine Caine",
            ministerio: "A21 Campaign",
            biografia: "Activista, autora y conferencista conocida por su trabajo contra la trata de personas.",
          },
          {
            nombre: "Pastor Claudio Freidzon",
            ministerio: "Rey de Reyes",
            biografia: "Pastor principal de una de las iglesias más grandes de Argentina.",
          },
        ],
        agenda: [
          {
            dia: "2026-07-10",
            hora: "6:00 PM",
            actividad: "Apertura y Adoración",
            descripcionActividad: "Tiempo de alabanza y bienvenida",
            conferencista: "Equipo de Adoración LCB",
          },
          {
            dia: "2026-07-10",
            hora: "8:00 PM",
            actividad: "Primera Conferencia",
            descripcionActividad: "El fuego del Espíritu Santo",
            conferencista: "Pastor Claudio Freidzon",
          },
          {
            dia: "2026-07-11",
            hora: "10:00 AM",
            actividad: "Sesión Matutina",
            descripcionActividad: "Taller de oración intercesora",
            conferencista: "Pastora Christine Caine",
          },
          {
            dia: "2026-07-11",
            hora: "7:00 PM",
            actividad: "Noche de Milagros",
            descripcionActividad: "Sanidades y liberación",
            conferencista: "Pastor Marcos Witt",
          },
          {
            dia: "2026-07-12",
            hora: "6:00 PM",
            actividad: "Cierre y Comisión",
            descripcionActividad: "Envío y bendición",
            conferencista: "Todos los conferencistas",
          },
        ],
        costoGeneral: 3500,
        costoEstudiantes: 2000,
        moneda: "ARS",
        requiereInscripcion: true,
        linkInscripcion: "https://lcb.com.ar/avivamiento2026",
        destacada: true,
        activa: true,
        versiculo: "Hechos 2:17",
        textoVersiculo:
          "Y en los postreros días, dice Dios, derramaré de mi Espíritu sobre toda carne, y vuestros hijos y vuestras hijas profetizarán.",
        hashtag: "#Avivamiento2026",
        redesSociales: {
          facebook: "https://facebook.com/events/avivamiento2026",
          instagram: "@lcb.avivamiento",
          youtube: "https://youtube.com/live/avivamiento2026",
        },
      },
      {
        titulo: "Cumbre de Liderazgo",
        subtitulo: "Formando líderes del Reino",
        descripcion:
          "Convención enfocada en el desarrollo de líderes cristianos. Talleres prácticos, networking y enseñanza de alto nivel para pastores, líderes de ministerios y todos aquellos que desean crecer en su llamado.",
        fechaInicio: "2026-09-05T09:00:00.000Z",
        fechaFin: "2026-09-06T18:00:00.000Z",
        lugar: "Centro de Convenciones Hilton",
        direccionCompleta: "Av. Macacha Güemes 351, Puerto Madero, Buenos Aires",
        ciudad: "Buenos Aires",
        pais: "Argentina",
        capacidad: 1500,
        conferencistas: [
          {
            nombre: "Dr. John Maxwell",
            ministerio: "The John Maxwell Team",
            biografia: "Experto en liderazgo #1 en América, autor de más de 100 libros.",
          },
          {
            nombre: "Pastor Cash Luna",
            ministerio: "Casa de Dios",
            biografia: "Pastor principal de Casa de Dios en Guatemala, una de las iglesias más grandes de Latinoamérica.",
          },
        ],
        agenda: [
          {
            dia: "2026-09-05",
            hora: "9:00 AM",
            actividad: "Sesión 1: Los 5 Niveles del Liderazgo",
            conferencista: "Dr. John Maxwell",
          },
          {
            dia: "2026-09-05",
            hora: "2:00 PM",
            actividad: "Taller: Gestión de Equipos Ministeriales",
            conferencista: "Pastor Cash Luna",
          },
          {
            dia: "2026-09-06",
            hora: "9:00 AM",
            actividad: "Sesión 2: Liderazgo en Tiempos de Crisis",
            conferencista: "Dr. John Maxwell",
          },
          {
            dia: "2026-09-06",
            hora: "3:00 PM",
            actividad: "Panel: Preguntas y Respuestas",
            conferencista: "Todos los conferencistas",
          },
        ],
        costoGeneral: 8500,
        costoEstudiantes: 5000,
        moneda: "ARS",
        requiereInscripcion: true,
        linkInscripcion: "https://lcb.com.ar/cumbre-liderazgo",
        destacada: true,
        activa: true,
        versiculo: "Proverbios 11:14",
        textoVersiculo: "Donde no hay dirección sabia, caerá el pueblo; mas en la multitud de consejeros hay seguridad.",
        hashtag: "#CumbreLiderazgoLCB",
      },
      {
        titulo: "Encuentro Familiar",
        subtitulo: "Familias bajo la bendición de Dios",
        descripcion:
          "Convención especial para toda la familia. Actividades para niños, adolescentes y adultos. Talleres para padres, matrimonios y crianza de hijos bajo principios bíblicos.",
        fechaInicio: "2026-05-20T10:00:00.000Z",
        fechaFin: "2026-05-20T19:00:00.000Z",
        lugar: "Parque de la Ciudad",
        direccionCompleta: "Av. Fernández de la Cruz 4500, Villa Soldati, Buenos Aires",
        ciudad: "Buenos Aires",
        pais: "Argentina",
        capacidad: 3000,
        conferencistas: [
          {
            nombre: "Pastor Dante Gebel",
            ministerio: "River Church",
            biografia: "Reconocido comunicador y pastor, conocido por su mensaje enfocado en la familia.",
          },
        ],
        costoGeneral: 0,
        moneda: "FREE",
        requiereInscripcion: true,
        linkInscripcion: "https://lcb.com.ar/encuentro-familiar",
        destacada: false,
        activa: true,
        hashtag: "#EncuentroFamiliarLCB",
      },
    ];

    for (const convencion of convenciones) {
      await payload.create({
        collection: "convenciones",
        data: convencion as any,
      });
    }
    console.log(`✅ ${convenciones.length} convenciones creadas\n`);

    // ============================================
    // DEVOCIONALES
    // ============================================
    console.log("📝 Creando devocionales...");
    const devocionales = [
      {
        titulo: "Un Nuevo Amanecer",
        autor: "Pastor Juan Rodríguez",
        fecha: "2026-02-22",
        extracto: "Cada día es una nueva oportunidad que Dios nos da para comenzar de nuevo.",
        contenido: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: "Las misericordias de Dios son nuevas cada mañana. No importa lo que haya sucedido ayer, hoy es un nuevo día lleno de oportunidades para experimentar Su gracia.",
                  },
                ],
              },
            ],
          },
        },
        versiculoPrincipal: "Lamentaciones 3:22-23",
        textoVersiculo:
          "Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.",
        categoria: "diaria",
      },
      {
        titulo: "Fortaleza en la Debilidad",
        autor: "Pastora María González",
        fecha: "2026-02-20",
        extracto: "Cuando somos débiles, entonces somos fuertes en Cristo.",
        contenido: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: "Pablo descubrió que en su debilidad, el poder de Dios se perfeccionaba. Nuestras limitaciones son oportunidades para que Dios muestre Su gloria.",
                  },
                ],
              },
            ],
          },
        },
        versiculoPrincipal: "2 Corintios 12:9",
        textoVersiculo:
          "Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad. Por tanto, de buena gana me gloriaré más bien en mis debilidades, para que repose sobre mí el poder de Cristo.",
        categoria: "ensenanza",
      },
      {
        titulo: "El Cultivo de la Paz Interior",
        autor: "Pastor Carlos Méndez",
        fecha: "2026-02-18",
        extracto: "La paz de Dios sobrepasa todo entendimiento cuando confiamos en Él.",
        contenido: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: "En medio de las tormentas de la vida, podemos experimentar una paz profunda que viene de Dios. Esta paz no depende de nuestras circunstancias, sino de nuestra relación con Él.",
                  },
                ],
              },
            ],
          },
        },
        versiculoPrincipal: "Filipenses 4:6-7",
        textoVersiculo:
          "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.",
        categoria: "oracion",
      },
      {
        titulo: "Testimonio de Restauración",
        autor: "Hermana Ana Martínez",
        fecha: "2026-02-16",
        extracto: "Cómo Dios restauró mi vida después de años de dolor.",
        contenido: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: "Durante años viví en oscuridad, pero el amor de Dios me encontró en mi momento más bajo. Hoy puedo decir que Él restauró todo lo que el enemigo había robado.",
                  },
                ],
              },
            ],
          },
        },
        versiculoPrincipal: "Joel 2:25",
        textoVersiculo:
          "Y os restituiré los años que comió la oruga, el saltón, el revoltón y la langosta, mi gran ejército que envié contra vosotros.",
        categoria: "testimonio",
      },
      {
        titulo: "El Ayuno que Agrada a Dios",
        autor: "Pastor Juan Rodríguez",
        fecha: "2026-02-14",
        extracto: "El verdadero ayuno va más allá de abstenerse de comida.",
        contenido: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: "El ayuno que Dios escogió no es solo dejar de comer, sino buscar justicia, compartir con los necesitados y vivir en humildad delante de Él.",
                  },
                ],
              },
            ],
          },
        },
        versiculoPrincipal: "Isaías 58:6-7",
        textoVersiculo:
          "¿No es más bien el ayuno que yo escogí, desatar las ligaduras de impiedad, soltar las cargas de opresión, y dejar ir libres a los quebrantados, y que rompáis todo yugo?",
        categoria: "estudio",
      },
    ];

    for (const devocional of devocionales) {
      await payload.create({
        collection: "devocionales",
        data: devocional as any,
      });
    }
    console.log(`✅ ${devocionales.length} devocionales creados\n`);

    // ============================================
    // SEDES
    // ============================================
    console.log("🏛️ Creando sedes...");
    const sedes = [
      {
        nombre: "Sede Central",
        ciudad: "Buenos Aires",
        direccion: "Av. Libertador 1234",
        codigoPostal: "C1425",
        telefono: "+54 11 4567-8900",
        email: "central@lcb.com.ar",
        horariosCultos: [
          { dia: "Domingo", hora: "10:00 AM" },
          { dia: "Domingo", hora: "6:00 PM" },
          { dia: "Miércoles", hora: "7:30 PM" },
        ],
        pastor: "Pastor Juan Rodríguez",
        principal: true,
      },
      {
        nombre: "Sede Norte",
        ciudad: "San Isidro",
        direccion: "Av. Centenario 567",
        codigoPostal: "B1642",
        telefono: "+54 11 4732-1100",
        email: "norte@lcb.com.ar",
        horariosCultos: [
          { dia: "Domingo", hora: "11:00 AM" },
          { dia: "Viernes", hora: "8:00 PM" },
        ],
        pastor: "Pastora María González",
        principal: false,
      },
      {
        nombre: "Sede Sur",
        ciudad: "Lomas de Zamora",
        direccion: "Av. Hipólito Yrigoyen 890",
        codigoPostal: "B1832",
        telefono: "+54 11 4292-3400",
        email: "sur@lcb.com.ar",
        horariosCultos: [
          { dia: "Domingo", hora: "10:30 AM" },
          { dia: "Jueves", hora: "7:00 PM" },
        ],
        pastor: "Pastor Carlos Méndez",
        principal: false,
      },
    ];

    for (const sede of sedes) {
      await payload.create({
        collection: "sedes",
        data: sede as any,
      });
    }
    console.log(`✅ ${sedes.length} sedes creadas\n`);

    // ============================================
    // HERO SECTION
    // ============================================
    console.log("🎯 Actualizando Hero Section...");
    await payload.updateGlobal({
      slug: "hero-section",
      data: {
        titulo: "Bienvenidos a\nLa Casa de la Bendición",
        subtitulo: "Donde el amor de Dios transforma vidas y familias",
        versiculo: "Jeremías 29:11",
        textoVersiculo: "Porque yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza.",
      },
    });
    console.log("✅ Hero Section actualizado\n");

    // ============================================
    // CONTACT INFO
    // ============================================
    console.log("📞 Actualizando Información de Contacto...");
    await payload.updateGlobal({
      slug: "contact-info",
      data: {
        telefono: "+54 11 4567-8900",
        email: "contacto@lcb.com.ar",
        direccion: "Av. San Martín 3555, B1847EZT Rafael Calzada, Provincia de Buenos Aires",
        ciudad: "Rafael Calzada",
        redesSociales: {
          facebook: "https://www.facebook.com/lcbcentral?locale=es_LA",
          instagram: "https://www.instagram.com/lcbcentral/",
          youtube: "https://www.youtube.com/@LCBCENTRAL",
        },
      } as any,
    });
    console.log("✅ Información de Contacto actualizada\n");

    console.log("✨ ¡Seed completado exitosamente!");
    console.log("\n📊 Resumen:");
    console.log(`   - ${predicas.length} Prédicas`);
    console.log(`   - ${eventos.length} Eventos`);
    console.log(`   - ${convenciones.length} Convenciones`);
    console.log(`   - ${devocionales.length} Devocionales`);
    console.log(`   - ${sedes.length} Sedes`);
    console.log("   - 1 Hero Section");
    console.log("   - 1 Contact Info\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error durante el seed:");
    console.error(error);
    process.exit(1);
  }
};

seed();
