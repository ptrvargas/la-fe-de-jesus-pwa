# Actualización V0.1.1 — 14 de noviembre de 2026

12 pruebas automatizadas aprobadas y despliegue GitHub Pages exitoso. Verificado en Chrome de escritorio: texto real visible dentro de la lección en RVR1960 y NIV; pasaje de dos versículos; referencia desde Estudio adicional; actualización de una sesión existente conservando respuestas; cierre y reapertura sin navegar fuera de la lección. Detalles y límites: [V0.1.1_BIBLE_GATEWAY.md](V0.1.1_BIBLE_GATEWAY.md).

Pendiente: repetir la regresión en Chrome Android/PWA e iOS físicos. Los resultados V0.1 que siguen son históricos; el estado del popover indicado allí fue superado por las pruebas V0.1.1 anteriores.

---

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

## Comprobaciones reales en GitHub Pages

Sitio abierto: https://ptrvargas.github.io/la-fe-de-jesus-pwa/. GitHub Actions ejecutó y aprobó las nueve pruebas y completó el despliegue (ejecución 43623011056, intento 2).

En el navegador de escritorio se verificaron: carga y presentación de esta versión; escritura de q1 y q6; recorrido de las cuatro secciones en inglés; avance sin aceptar la decisión; lectura adicional marcada de forma independiente; regreso a preguntas y recarga conservando las dos respuestas, idioma y estado adicional; descarga real del JSON; importación del mismo archivo; cambio a Instructor; revisión de la copia importada con campos deshabilitados y respuestas intactas; regreso al estudio individual y a español.

El recuadro de Bible Gateway se abrió con referencia canónica y enlace RVR1960, pero al tocar la referencia no se observó texto del pasaje. Por tanto, el popover oficial no se declara funcional. Se mantiene el enlace alternativo, pendiente de comprobar fuera de este navegador. No se verificó la causa ni se probó NIV en el proveedor.

La revisión visual de escritorio mostró la página sin recortes evidentes en el ancho observado; no sustituye la matriz de tamaños ni las rotaciones.

## Límite de la vista previa inicial

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
| Descarga e importación de JSON real | Aprobadas en navegador de escritorio |
| Compartir por WhatsApp/correo | Pendiente dispositivo |
| GitHub Actions y URL GitHub Pages | Aprobadas; despliegue exitoso |
| Revisión doctrinal/editorial inglesa | Pendiente humana |

## Procedimiento manual breve

En cada tamaño/orientación: responder q1 y q6, rotar o redimensionar, cambiar idioma, volver a Preguntas y recargar; comprobar textos idénticos y ausencia de desbordamiento. Completar las cuatro secciones sin aceptar la decisión y verificar indicadores independientes. Exportar, importar, revisar y continuar con la copia. Probar un JSON malformado y verificar que no cambien los registros.

Después de una primera carga HTTPS y activación del Service Worker: desconectar la red, cerrar/reabrir, recorrer ambos idiomas y editar respuestas; los pasajes externos deben mostrar su limitación y el contenido propio debe seguir disponible. Reconectar y probar las diez referencias básicas y varias adicionales. Instalar en cada plataforma y verificar apertura standalone. Publicar un cambio con una nueva versión de caché y comprobar el botón de actualización antes de declarar esa función aprobada.
