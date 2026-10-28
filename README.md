# Zafiro Crochet 🧶

[![Instagram](https://img.shields.io/badge/Instagram-@zafirocrochet__ve-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/zafirocrochet_ve/)
[![Tienda en vivo](https://img.shields.io/badge/Tienda-zafirocrochet.vercel.app-ff4d6d?style=for-the-badge&logo=vercel&logoColor=white)](https://zafirocrochet.vercel.app/)

Tienda en línea y panel de administración de **Zafiro Crochet**, una marca de piezas tejidas a mano en Caracas, Venezuela. Los clientes exploran el catálogo y envían su pedido por WhatsApp; la administradora gestiona productos, precios, ofertas y pedidos desde un panel privado, sin tocar código.

---

## Capturas

| Inicio | Catálogo | Producto | Carrito |
| :---: | :---: | :---: | :---: |
| <a href="docs/screenshots/01-inicio.jpg"><img src="docs/screenshots/01-inicio.jpg" width="190" alt="Inicio con carrusel de creaciones"></a> | <a href="docs/screenshots/02-catalogo.jpg"><img src="docs/screenshots/02-catalogo.jpg" width="190" alt="Catálogo con categorías tipo historias"></a> | <a href="docs/screenshots/03-producto.jpg"><img src="docs/screenshots/03-producto.jpg" width="190" alt="Detalle de producto con galería"></a> | <a href="docs/screenshots/04-carrito.jpg"><img src="docs/screenshots/04-carrito.jpg" width="190" alt="Carrito con envío por WhatsApp"></a> |

<sub>Vista en celular. Haz clic en una captura para verla en tamaño completo.</sub>

---

## Funcionalidades

### Tienda

- Inicio con carrusel animado de las creaciones; cada foto abre su producto.
- Categorías estilo *historias destacadas* de Instagram, con foto de portada y contador generados a partir del catálogo.
- Búsqueda en tiempo real con sugerencias, tolerante a acentos.
- Sección de ofertas dinámica: muestra los productos que la administradora marque en oferta.
- Detalle de producto con galería de fotos, descripción y selector de cantidad.
- Carrito persistente con opción de caja de regalo.
- Envío del pedido a WhatsApp con el detalle formateado y un saludo según la hora del día.

### Panel de administración

- Acceso con usuario y contraseña mediante **Supabase Auth**.
- Crear, editar y eliminar productos, con varias fotos y varias categorías por producto.
- Marcar o quitar ofertas con un toque; el precio anterior se calcula automáticamente.
- Pedidos pendientes con semáforo de estatus: 🔴 por empezar, 🟡 en proceso, 🟢 listo.

### Rendimiento y seguridad

- **Row Level Security** en Supabase: el catálogo es de lectura pública y solo la administradora puede modificarlo.
- Las fotos se cargan a medida que se hace scroll (*lazy loading*).
- Las fotos subidas desde el panel se ajustan automáticamente a 1600 px antes de guardarse (de ~8 MB a ~500 KB, sin diferencia visible).

---

## Tecnologías

| Capa | Herramienta |
| :--- | :--- |
| Frontend | React 18 + Vite |
| Estilos | Tailwind CSS |
| Base de datos | Supabase (PostgreSQL + Row Level Security) |
| Autenticación | Supabase Auth |
| Imágenes | Supabase Storage |
| Iconos | Lucide React |
| Despliegue | Vercel |

---

Sigue a la marca en [Instagram (@zafirocrochet_ve)](https://www.instagram.com/zafirocrochet_ve/)

&copy; Zafiro Crochet · Caracas, Venezuela
