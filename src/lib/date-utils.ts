/**
 * Formatea una fecha a un formato legible en español
 * @param date - Fecha a formatear (string o Date)
 * @param options - Opciones de formato
 * @returns Fecha formateada
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-ES', options);
}

/**
 * Formatea una fecha y hora
 * @param date - Fecha a formatear
 * @returns Fecha y hora formateada
 */
export function formatDateTime(date: string | Date): string {
  return formatDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Obtiene una fecha relativa (hace X días, hace X horas, etc.)
 * @param date - Fecha a comparar
 * @returns Texto relativo
 */
export function getRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 7) {
    return formatDate(dateObj);
  } else if (diffDays > 0) {
    return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  } else if (diffHours > 0) {
    return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  } else if (diffMin > 0) {
    return `Hace ${diffMin} minuto${diffMin > 1 ? 's' : ''}`;
  } else {
    return 'Hace un momento';
  }
}

/**
 * Verifica si una fecha es futura
 * @param date - Fecha a verificar
 * @returns true si la fecha es futura
 */
export function isFutureDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getTime() > new Date().getTime();
}
