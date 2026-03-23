import fs from 'fs';
import path from 'path';

const componentsDir = 'd:/Programacion/lcb-landing-page/src/components';
const appDir = 'd:/Programacion/lcb-landing-page/src/app/(frontend)';

// Helper to replace Volver links
function fixVolver(pagePath) {
  let content = fs.readFileSync(pagePath, 'utf8');
  content = content.replace(
    /<Link href="\/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-black mb-10 group">\s*<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" \/>\s*Volver\s*<\/Link>/,
    '<div className="flex justify-end w-full">\n          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-black mb-10 group">\n            Volver\n            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />\n          </Link>\n        </div>'
  );
  // Add ArrowRight import if missing
  if (!content.includes('ArrowRight')) {
    content = content.replace(/import { ArrowLeft } from "lucide-react";/, 'import { ArrowRight } from "lucide-react";');
  } else {
    content = content.replace(/import { ArrowLeft } from "lucide-react";\n/, ''); // remove unused
  }
  fs.writeFileSync(pagePath, content, 'utf8');
}

// 1. Update Page Wrappers (Volver button to the right)
fixVolver(path.join(appDir, 'predicas/page.tsx'));
fixVolver(path.join(appDir, 'eventos/page.tsx'));
fixVolver(path.join(appDir, 'devocionales/page.tsx'));

// 2. Hide CTAs and fix styling in Light components
let predicasL = fs.readFileSync(path.join(componentsDir, 'PredicasListLight.tsx'), 'utf8');
// Hide CTA
predicasL = predicasL.replace(/<motion\.div\n\s+initial={{ opacity: 0, y: 20 }}\n\s+whileInView={{ opacity: 1, y: 0 }}\n\s+viewport={{ once: true }}\n\s+className="text-center pt-8"\n\s+>/, '{!showAll && (\n        <motion.div\n          initial={{ opacity: 0, y: 20 }}\n          whileInView={{ opacity: 1, y: 0 }}\n          viewport={{ once: true }}\n          className="text-center pt-8"\n        >');
predicasL = predicasL.replace(/<\/Link>\n\s+<\/motion\.div>/, '</Link>\n        </motion.div>\n        )}');

// Fix pill (bg-black text-primary -> bg-black text-white)
predicasL = predicasL.replace(/bg-black text-primary text-\[10px\] font-bold uppercase tracking-wider rounded-full/g, 'bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-none');

// Fix rounded cards
predicasL = predicasL.replace(/rounded-2xl overflow-hidden bg-white block shadow-2xl/g, 'rounded-none overflow-hidden bg-white block shadow-2xl');
predicasL = predicasL.replace(/rounded-lg overflow-hidden bg-gray-100/g, 'rounded-none overflow-hidden bg-gray-100');
predicasL = predicasL.replace(/rounded-xl bg-white hover:bg-gray-50/g, 'rounded-none bg-white hover:bg-gray-50');

// Fix bullets
predicasL = predicasL.replace(/â€¢/g, '•');

fs.writeFileSync(path.join(componentsDir, 'PredicasListLight.tsx'), predicasL, 'utf8');


let eventosL = fs.readFileSync(path.join(componentsDir, 'EventosListLight.tsx'), 'utf8');
// Hide CTA
eventosL = eventosL.replace(/<motion\.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">/, '{!showAll && (\n        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">');
eventosL = eventosL.replace(/<\/Calendar>\n\s+<\/Link>\n\s+<\/motion\.div>/, '</Link>\n        </motion.div>\n        )}');
// fallback if Calendar is imported differently
eventosL = eventosL.replace(/<Calendar className="w-4 h-4" \/>\n\s+<\/Link>\n\s+<\/motion\.div>/, '<Calendar className="w-4 h-4" />\n          </Link>\n        </motion.div>\n        )}');

// Fix pill
eventosL = eventosL.replace(/bg-white text-black text-xs/g, 'bg-black text-white text-xs');
eventosL = eventosL.replace(/rounded-full shadow-lg shadow-black\/5">Próximo evento/g, 'rounded-none shadow-lg shadow-black/5">Próximo evento');

// Fix rounded cards
eventosL = eventosL.replace(/rounded-2xl overflow-hidden bg-gray-50/g, 'rounded-none overflow-hidden bg-gray-50');
eventosL = eventosL.replace(/rounded-xl bg-gray-50/g, 'rounded-none bg-gray-50');
eventosL = eventosL.replace(/rounded-lg bg-gray-50/g, 'rounded-none bg-gray-50');

// Fix bullets
eventosL = eventosL.replace(/â€¢/g, '•');

fs.writeFileSync(path.join(componentsDir, 'EventosListLight.tsx'), eventosL, 'utf8');


let devocional = fs.readFileSync(path.join(componentsDir, 'DevocionalList.tsx'), 'utf8');
// Hide CTA
const ctaStart = devocional.indexOf('{/* Ver todos button */}');
if (ctaStart !== -1) {
  devocional = devocional.replace(/<motion\.div\n\s+initial={{ opacity: 0 }}\n\s+whileInView={{ opacity: 1 }}\n\s+viewport={{ once: true }}\n\s+className="text-center"\n\s+>/, '{!showAll && (\n        <motion.div\n          initial={{ opacity: 0 }}\n          whileInView={{ opacity: 1 }}\n          viewport={{ once: true }}\n          className="text-center"\n        >');
  devocional = devocional.replace(/<BookOpen className="w-4 h-4 ml-1" \/>\n\s+<\/Link>\n\s+<\/motion\.div>/, '<BookOpen className="w-4 h-4 ml-1" />\n          </Link>\n        </motion.div>\n        )}');
}

// Fix bullets 
devocional = devocional.replace(/â€¢/g, '•');

fs.writeFileSync(path.join(componentsDir, 'DevocionalList.tsx'), devocional, 'utf8');

// Do the same bullet replacements for the original dark components so they aren't broken on Landing
let predicasDark = fs.readFileSync(path.join(componentsDir, 'PredicasList.tsx'), 'utf8');
predicasDark = predicasDark.replace(/â€¢/g, '•');
fs.writeFileSync(path.join(componentsDir, 'PredicasList.tsx'), predicasDark, 'utf8');

let eventosDark = fs.readFileSync(path.join(componentsDir, 'EventosList.tsx'), 'utf8');
eventosDark = eventosDark.replace(/â€¢/g, '•');
fs.writeFileSync(path.join(componentsDir, 'EventosList.tsx'), eventosDark, 'utf8');

console.log("Fixed Volver layout, removed duplicate CTAs, removed card border-radius, fixed black-on-black pills, and repaired utf-8 bullet artifacts!");
