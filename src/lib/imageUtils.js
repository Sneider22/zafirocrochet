// Ajusta las fotos antes de subirlas: las de celular (3000px, ~8MB) quedan en
// 1600px (~400KB), que en pantalla se ven igual y cargan mucho más rápido.
const MAX_SIDE = 1600;
const QUALITY = 0.9;

const loadImage = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = (err) => { URL.revokeObjectURL(url); reject(err); };
    img.src = url;
  });

export async function optimizeImage(file) {
  try {
    const img = await loadImage(file);
    const longest = Math.max(img.naturalWidth, img.naturalHeight);

    // Si ya es pequeña, se sube tal cual (sin recomprimir)
    if (longest <= MAX_SIDE) return file;

    const scale = MAX_SIDE / longest;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', QUALITY));
    if (!blob || blob.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, '');
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
  } catch {
    // Formato que el navegador no puede procesar: se sube la original
    return file;
  }
}
