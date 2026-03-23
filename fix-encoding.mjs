import fs from 'fs';
import path from 'path';

const dir = 'd:/Programacion/lcb-landing-page/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Custom manual regex fixes to catch all broken latin characters
  content = content.replace(/VisÃ.tanos/g, 'Visítanos');
  content = content.replace(/BendiciÃ.n/g, 'Bendición');
  content = content.replace(/AÃ.os/g, 'Años');
  content = content.replace(/AÃ±os/g, 'Años');
  content = content.replace(/PrÃ.dica/g, 'Prédica');
  content = content.replace(/prÃ.dicas/g, 'prédicas');
  content = content.replace(/propÃ.sito/g, 'propósito');
  content = content.replace(/PrÃ.ximo/g, 'Próximo');
  content = content.replace(/encontrarÃ.s/g, 'encontrarás');
  content = content.replace(/PlanificÃ./g, 'Planificá');
  content = content.replace(/MÃ.s/g, 'Más');
  content = content.replace(/TÃ.rminos/g, 'Términos');
  
  content = content.replace(/Ã¡/g, 'á');
  content = content.replace(/Ã©/g, 'é');
  content = content.replace(/Ã³/g, 'ó');
  content = content.replace(/Ãº/g, 'ú');
  content = content.replace(/Ã±/g, 'ñ');

  fs.writeFileSync(filePath, content, 'utf8');
}
