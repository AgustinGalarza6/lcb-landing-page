/**
 * Trunca un texto a un número específico de palabras
 * @param text - Texto a truncar
 * @param maxWords - Número máximo de palabras
 * @returns Texto truncado
 */
export function truncateText(text: string, maxWords: number): string {
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

/**
 * Capitaliza la primera letra de una cadena
 * @param str - Cadena a capitalizar
 * @returns Cadena capitalizada
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Genera un slug a partir de un texto
 * @param text - Texto a convertir
 * @returns Slug generado
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-'); // Eliminar guiones duplicados
}
