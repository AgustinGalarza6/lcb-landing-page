import fs from 'fs';
import path from 'path';

const win1252Map = {
  0x80: '\u20AC', 0x82: '\u201A', 0x83: '\u0192', 0x84: '\u201E', 0x85: '\u2026',
  0x86: '\u2020', 0x87: '\u2021', 0x88: '\u02C6', 0x89: '\u2030', 0x8A: '\u0160',
  0x8B: '\u2039', 0x8C: '\u0152', 0x8E: '\u017D', 0x91: '\u2018', 0x92: '\u2019',
  0x93: '\u201C', 0x94: '\u201D', 0x95: '\u2022', 0x96: '\u2013', 0x97: '\u2014',
  0x98: '\u02DC', 0x99: '\u2122', 0x9A: '\u0161', 0x9B: '\u203A', 0x9C: '\u0153',
  0x9E: '\u017E', 0x9F: '\u0178'
};

function decodeWin1252(buffer) {
  let str = '';
  for (let i = 0; i < buffer.length; i++) {
    let byte = buffer[i];
    if (byte >= 0x80 && byte <= 0x9F) {
      str += win1252Map[byte] || String.fromCharCode(byte);
    } else {
      str += String.fromCharCode(byte);
    }
  }
  return str;
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(fullPath));
    } else { 
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) results.push(fullPath);
    }
  });
  return results;
}

const allFiles = walk('d:/Programacion/lcb-landing-page/src');
let fixedCount = 0;

for (const file of allFiles) {
  const buf = fs.readFileSync(file);
  const utf8Str = buf.toString('utf8');
  
  if (utf8Str.includes('\uFFFD')) {
    const fixedStr = decodeWin1252(buf);
    fs.writeFileSync(file, fixedStr, 'utf8');
    fixedCount++;
    console.log('Fixed:', file);
  }
}

console.log('Total fixed:', fixedCount);
