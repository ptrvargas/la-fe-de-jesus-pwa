# Resultados — v0.1 — 14 de noviembre de 2026

## Ejecutadas

`npm test`: 9 pruebas, 9 aprobadas. Node.js con jsdom y fake-indexeddb para la integración simulada; no es un motor de navegador real.

- Contenido ES/EN: seis preguntas, cuatro aplicaciones y cuatro secciones de profundización.
- Exportación/validación JSON conserva respuestas, decisiones, aplicaciones y firma.
- La decisión espiritual es independiente del estudio y de la lectura adicional.
- Rechazo de tipos, versiones, tamaños de campos y lecciones inválidas; eliminación de campos desconocidos.
- Invitaciones y catálogo de 20 espacios, con una sola lección habilitada.
- Manifest relativo, íconos existentes y ausencia de bloqueo de orientación.
- Todos los recursos listados en la caché existen.
- Integración DOM: recorrido de las cuatro secciones, escritura y recuperación en IndexedDB simulado, cambio de idioma/modalidad sin perder respuestas, importación de registros e invitaciones, revisión de solo lectura, restauración de una copia y rechazo de archivo inválido.
- Creación y cierre del recuadro bíblico aislado en DOM. No comprueba texto del proveedor.

`npm run build`: genera `dist/` sin dependencias de producción. `node --check src/app.js`: correcto.

Se revisaron visualmente las dos páginas del PDF original para cotejar contenido. Eso no constituye una revisión visual de la aplicación.

## Límite de la vista previa

El servidor de vista previa se inició, pero el navegador remoto devolvió otra versión de la aplicación desde una caché previa del mismo origen. Se descartaron esas observaciones como evidencia de la versión actual. No se alteraron los registros de esa versión ni se atribuyeron sus resultados a esta entrega.

## Pendientes — no aprobadas todavía

| Prueba | Estado |
|---|---|
| Teléfono 360×800 y 800×360; rotación física y persistencia | Pendiente |
| iPhone/Safari y Android/Chrome reales | Pendiente |
| Tableta/iPad 768×1024 y 1024×768 | Pendiente |
| Escritorio 1280×800 y 1440×900 | Pendiente |
| Sin desbordamiento horizontal ni controles recortados en esos tamaños | Pendiente visual |
| Instalación nativa Android; instalación manual iOS/iPadOS | Pendiente |
| Caché y recarga real sin red, ambos idiomas | Pendiente |
| Activación de una actualización sin perder respuestas | Pendiente real |
| Popover oficial al tocar, RVR1960 y NIV, referencias adicionales | Pendiente proveedor real |
| Descarga/importación de un archivo real y compartir por WhatsApp/correo | Pendiente dispositivo |
| GitHub Actions y URL GitHub Pages | Bloqueado por acceso/configuración |
| Revisión doctrinal/editorial inglesa | Pendiente humana |

## Procedimiento manual breve

En cada tamaño/orientación: responder q1 y q6, rotar o redimensionar, cambiar idioma, volver a Preguntas y recargar; comprobar textos idénticos y ausencia de desbordamiento. Completar las cuatro secciones sin aceptar la decisión y verificar indicadores independientes. Exportar, importar, revisar y continuar con la copia. Probar un JSON malformado y verificar que no cambien los registros.

Después de una primera carga HTTPS y activación del Service Worker: desconectar la red, cerrar/reabrir, recorrer ambos idiomas y editar respuestas; los pasajes externos deben mostrar su limitación y el contenido propio debe seguir disponible. Reconectar y probar las diez referencias básicas y varias adicionales. Instalar en cada plataforma y verificar apertura standalone. Publicar un cambio con una nueva versión de caché y comprobar el botón de actualización antes de declarar esa función aprobada.
