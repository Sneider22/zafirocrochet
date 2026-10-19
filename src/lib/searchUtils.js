/**
 * Utilidades para búsqueda y normalización de texto.
 * Permite búsquedas insensibles a mayúsculas, minúsculas, tildes y diacríticos (ej: á, é, í, ó, ú, ñ).
 */

/**
 * Normaliza cualquier texto convirtiéndolo a minúsculas y removiendo acentos/diacríticos.
 * Ejemplo: "Pokemón" -> "pokemon", "PELUCHE" -> "peluche", "Corazón" -> "corazon"
 */
export function normalizeText(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .toLowerCase()
    .normalize('NFD') // Descompone caracteres acentuados en letra base + marca diacrítica
    .replace(/[\u0300-\u036f]/g, '') // Elimina las marcas diacríticas
    .trim();
}

/**
 * Comprueba si un producto coincide con una consulta de búsqueda (query).
 * Soporta múltiples palabras (ej: "pokemon llavero" buscará productos que contengan ambas).
 * Busca en nombre, categorías y descripción de manera insensible a mayúsculas y acentos.
 */
export function matchesSearchQuery(product, query) {
  if (!query || !query.trim()) return true;
  if (!product) return false;

  const words = normalizeText(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;

  const nameNorm = normalizeText(product.name);
  const descNorm = normalizeText(product.description);
  const catArray = Array.isArray(product.category) ? product.category : [product.category];
  const catNorms = catArray.map(c => normalizeText(c));

  return words.every(word => {
    return (
      nameNorm.includes(word) ||
      catNorms.some(c => c.includes(word)) ||
      descNorm.includes(word)
    );
  });
}
