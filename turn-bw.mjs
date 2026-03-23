import fs from 'fs';
import path from 'path';

const dir = 'd:/Programacion/lcb-landing-page/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const darkComponents = ['Hero.tsx', 'EventosList.tsx', 'ChurchActivitiesSection.tsx'];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (darkComponents.includes(file)) {
    // Explicit cases where bg-accent text-white was used
    content = content.replace(/bg-accent text-white/g, 'bg-white text-black');
    content = content.replace(/bg-accent/g, 'bg-white text-black');
    content = content.replace(/text-accent/g, 'text-white');
    content = content.replace(/border-accent/g, 'border-white');
    content = content.replace(/shadow-accent/g, 'shadow-white');
    
    // Hover states
    content = content.replace(/hover:bg-accent-dark/g, 'hover:bg-gray-200');
    content = content.replace(/hover:bg-accent/g, 'hover:bg-white hover:text-black');
    content = content.replace(/group-hover:text-accent/g, 'group-hover:text-white');
    content = content.replace(/hover:text-accent/g, 'hover:text-white');
  } else if (file === 'ContactSection.tsx') {
    // Form button
    content = content.replace(/bg-accent text-white/g, 'bg-black text-white');
    content = content.replace(/bg-accent/g, 'bg-black text-white');
    content = content.replace(/hover:bg-accent-dark/g, 'hover:bg-neutral-800');
    // Icons on left side
    content = content.replace(/text-accent/g, 'text-gray-300');
    content = content.replace(/hover:text-accent/g, 'hover:text-white');
  } else {
    // Light components
    content = content.replace(/bg-accent text-white/g, 'bg-black text-white');
    content = content.replace(/bg-accent/g, 'bg-black');
    content = content.replace(/text-accent/g, 'text-black');
    content = content.replace(/border-accent/g, 'border-black');
    content = content.replace(/shadow-accent/g, 'shadow-black');
    
    // Hover states
    content = content.replace(/hover:bg-accent-dark/g, 'hover:bg-neutral-800');
    content = content.replace(/hover:bg-accent/g, 'hover:bg-neutral-800');
    content = content.replace(/group-hover:text-accent/g, 'group-hover:text-neutral-600');
    content = content.replace(/hover:text-accent/g, 'hover:text-neutral-600');
  }

  // Cleanup potential duplicates generated
  content = content.replace(/text-black text-white/g, 'text-black');
  content = content.replace(/text-white text-black/g, 'text-black');

  fs.writeFileSync(filePath, content, 'utf8');
}
