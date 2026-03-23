import fs from 'fs';
import path from 'path';

const dir = 'd:/Programacion/lcb-landing-page/src/components';

// --- EventosList.tsx ---
let eventosPath = path.join(dir, 'EventosList.tsx');
let eventos = fs.readFileSync(eventosPath, 'utf8');

// Colors
eventos = eventos.replace(/bg-primary/g, 'bg-white');
eventos = eventos.replace(/text-white/g, 'text-primary');
eventos = eventos.replace(/text-white\/60/g, 'text-secondary');
eventos = eventos.replace(/bg-white\/5/g, 'bg-gray-50');
eventos = eventos.replace(/border-white\/5/g, 'border-gray-100');
eventos = eventos.replace(/border-white\/10/g, 'border-gray-100');
eventos = eventos.replace(/hover:bg-white\/10/g, 'hover:bg-gray-100');
eventos = eventos.replace(/hover:border-white\/30/g, 'hover:border-gray-200');
eventos = eventos.replace(/shadow-white\/20/g, 'shadow-black/5');
eventos = eventos.replace(/border-white\/20/g, 'border-gray-200');

// Header Hide Logic
eventos = eventos.replace(
  /{title && \(/g, // wait, there is no {title && (
  ""
);
eventos = eventos.replace(
  /<motion\.div\n\s+initial={{ opacity: 0, y: 20 }}\n\s+whileInView={{ opacity: 1, y: 0 }}/,
  "{!showAll && (\n          <motion.div\n            initial={{ opacity: 0, y: 20 }}\n            whileInView={{ opacity: 1, y: 0 }}"
);
// We need to close the curly brace after the header closing div.
// Header ends right before grid div: <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
eventos = eventos.replace(
  /<\/motion\.div>\n\n\s+{.*Grid/i,
  "</motion.div>\n        )}\n\n        {/* Grid"
);

// Fix CTA
eventos = eventos.replace(/hover:bg-white text-black-dark/g, 'hover:bg-neutral-800 text-white');

fs.writeFileSync(eventosPath, eventos, 'utf8');


// --- PredicasList.tsx ---
let predicasPath = path.join(dir, 'PredicasList.tsx');
let predicas = fs.readFileSync(predicasPath, 'utf8');

// Colors
predicas = predicas.replace(/bg-primary/g, 'bg-white');
predicas = predicas.replace(/text-white/g, 'text-primary');
predicas = predicas.replace(/text-white\/60/g, 'text-secondary');
predicas = predicas.replace(/bg-white\/5/g, 'bg-gray-50');
predicas = predicas.replace(/border-white\/10/g, 'border-gray-100');
predicas = predicas.replace(/hover:bg-white\/10/g, 'hover:bg-gray-100');
predicas = predicas.replace(/hover:border-white\/30/g, 'hover:border-gray-200');
predicas = predicas.replace(/shadow-white\/20/g, 'shadow-black/5');
predicas = predicas.replace(/border-white\/20/g, 'border-gray-200');

// The "Mensajes que transforman" line is bg-primary already and text-primary.
// But we replaced bg-primary to bg-white. Let's fix that back to black for the line:
predicas = predicas.replace(/w-8 h-px bg-white/g, 'w-8 h-px bg-black'); // since we want black lines on bg-white
predicas = predicas.replace(/w-16 h-16 rounded-none bg-white flex items-center justify-center/g, 'w-16 h-16 rounded-none bg-primary flex items-center justify-center');
predicas = predicas.replace(/fill-primary text-primary/g, 'fill-white text-white');

// Header Hide Logic
predicas = predicas.replace(
  /<motion\.div\n\s+initial={{ opacity: 0, x: -30 }}\n\s+whileInView={{ opacity: 1, x: 0 }}/,
  "{!showAll && (\n          <motion.div\n            initial={{ opacity: 0, x: -30 }}\n            whileInView={{ opacity: 1, x: 0 }}"
);
predicas = predicas.replace(
  /<\/motion\.div>\n\n\s+{.*Featured/i,
  "</motion.div>\n        )}\n\n        {/* Featured"
);

fs.writeFileSync(predicasPath, predicas, 'utf8');

console.log("Converted EventosList and PredicasList to white theme and hid headers when showAll is true!");
