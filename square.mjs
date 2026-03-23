import fs from 'fs';
import path from 'path';

const dir = 'd:/Programacion/lcb-landing-page/src/components';

// 1. PredicasList.tsx
let predicasPath = path.join(dir, 'PredicasList.tsx');
let predicas = fs.readFileSync(predicasPath, 'utf8');
predicas = predicas.replace(/rounded-full hover:bg-black-dark/g, 'rounded-none uppercase font-bold tracking-widest hover:bg-neutral-800');
predicas = predicas.replace(/rounded-full bg-white\/20/g, 'rounded-none bg-white/20'); // inside CTA
fs.writeFileSync(predicasPath, predicas, 'utf8');

// 2. EventosList.tsx
let eventosPath = path.join(dir, 'EventosList.tsx');
let eventos = fs.readFileSync(eventosPath, 'utf8');
eventos = eventos.replace(/rounded-full hover:bg-white/g, 'rounded-none uppercase font-bold tracking-widest hover:bg-gray-200'); // CTA
eventos = eventos.replace(/rounded-full shadow-lg shadow-white\/20"([^>]*?)>Próximo evento/g, 'rounded-none shadow-lg shadow-white/20"$1>Próximo evento'); // tag
fs.writeFileSync(eventosPath, eventos, 'utf8');

// 3. DevocionalList.tsx
let devocionalPath = path.join(dir, 'DevocionalList.tsx');
let devocional = fs.readFileSync(devocionalPath, 'utf8');
devocional = devocional.replace(/rounded-full shadow-sm hover:shadow-md transition-all duration-500 hover:bg-black-dark/g, 'rounded-none uppercase font-bold tracking-widest shadow-sm hover:shadow-md transition-all duration-500 hover:bg-neutral-800'); // CTA
fs.writeFileSync(devocionalPath, devocional, 'utf8');

// 4. ContactSection.tsx
let contactPath = path.join(dir, 'ContactSection.tsx');
let contact = fs.readFileSync(contactPath, 'utf8');
contact = contact.replace(/rounded-xl hover:bg-neutral-800/g, 'rounded-none uppercase font-bold tracking-widest hover:bg-neutral-800 text-xs'); // Submit form
// Make social icons rounded-none
contact = contact.replace(/w-10 h-10 rounded-full/g, 'w-10 h-10 rounded-none');
contact = contact.replace(/w-11 h-11 rounded-xl/g, 'w-11 h-11 rounded-none');
fs.writeFileSync(contactPath, contact, 'utf8');

// 5. ConvencionesSection.tsx
let convencionesPath = path.join(dir, 'ConvencionesSection.tsx');
let convenciones = fs.readFileSync(convencionesPath, 'utf8');
convenciones = convenciones.replace(/rounded-full bg-gray-100 hover:bg-gray-200/g, 'rounded-none bg-gray-100 hover:bg-gray-200'); // Chevron
convenciones = convenciones.replace(/rounded-full bg-black hover:bg-black-dark/g, 'rounded-none bg-black hover:bg-neutral-800'); // Chevron
convenciones = convenciones.replace(/rounded-full border border-white\/20/g, 'rounded-none border border-white/20'); // Hashtag
fs.writeFileSync(convencionesPath, convenciones, 'utf8');

// 6. ChurchActivitiesSection.tsx
let activitiesPath = path.join(dir, 'ChurchActivitiesSection.tsx');
let activities = fs.readFileSync(activitiesPath, 'utf8');
activities = activities.replace(/rounded-full shadow-lg hover:bg-accent border border-white\/10 hover:border-accent-light/g, 'rounded-none shadow-lg hover:bg-white hover:text-black hover:!fill-black border border-white/10'); // Chevrons
fs.writeFileSync(activitiesPath, activities, 'utf8');

// 7. SedesCarousel.tsx
let sedesPath = path.join(dir, 'SedesCarousel.tsx');
let sedes = fs.readFileSync(sedesPath, 'utf8');
sedes = sedes.replace(/rounded-full shadow-lg hover:bg-gray-50/g, 'rounded-none shadow-lg hover:bg-gray-100'); // Chevrons
fs.writeFileSync(sedesPath, sedes, 'utf8');

// 8. Footer.tsx
let footerPath = path.join(dir, 'Footer.tsx');
let footer = fs.readFileSync(footerPath, 'utf8');
footer = footer.replace(/rounded-xl flex items-center/g, 'rounded-none flex items-center'); // Footer social icons
fs.writeFileSync(footerPath, footer, 'utf8');

console.log("Replaced all rounded corners on buttons and CTAs to rounded-none!");
