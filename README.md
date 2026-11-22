# La Fe de Jesús / The Faith of Jesus — v0.1.2

PWA estática, bilingüe, gratuita y sin cuentas. Lección piloto: **Dios**, basada en `01-Dios.pdf`, proporcionado por el usuario. Traducción inglesa consolidada aprobada e implementada en V0.1.2. Las atribuciones históricas pendientes están documentadas en las notas editoriales.

## Uso

1. Abre la aplicación y elige idioma y modalidad.
2. Responde las seis preguntas. El guardado local es automático.
3. Revisa las cuatro aplicaciones y la decisión voluntaria. Puedes continuar sin aceptarla.
4. Lee el estudio adicional. Los indicadores de estudio, decisión y lectura son independientes.
5. Exporta un JSON periódicamente. El navegador puede borrar almacenamiento local; no existe recuperación en servidores.

En modalidad Instructor, escribe tu nombre, genera una invitación JSON y compártela manualmente. El estudiante la importa y, si desea, devuelve un JSON de respuestas. Importar añade copias sin sustituir registros existentes. Revisa cada copia desde Instructor. “Continuar con esta copia” la convierte en tu registro editable y conserva el registro anterior en la lista. Esta opción sirve también para recuperar una copia propia. Las notas del instructor son locales.

El botón Exportar guarda una copia de **todos los registros locales**, incluidos estudiantes importados y notas. Compartir incluye únicamente el registro abierto, con sus respuestas, decisiones y metadatos. Se pide confirmación antes de compartir. Web Share se utiliza cuando admite archivos; en otros casos se descarga el JSON para adjuntarlo manualmente.

## Desarrollo

Requiere Node.js 22 o superior (dependencias solo para pruebas):

```sh
npm ci
npm test
npm run build
python3 -m http.server 8080 --directory dist
```

Abre `http://localhost:8080`. HTTPS es obligatorio en producción para Service Worker e instalación PWA. En desarrollo se admite localhost.

- `src/`: interfaz, idiomas, validación y acceso a IndexedDB.
- `content/`: lecciones y catálogo de 20 espacios; solamente la lección 1 está disponible.
- `manifest.webmanifest`, `sw.js`, `icons/`: instalación y caché.
- `bible.html`: integración aislada de Bible Gateway, cargada a petición.
- `tests/`: validación y pruebas de integración DOM.
- `docs/`: arquitectura, resultados de pruebas e instrucciones de publicación.

## Publicación

El destino solicitado es el repositorio nuevo `la-fe-de-jesus-pwa`, en GitHub Pages. Véase `docs/GITHUB_PAGES.md`. Repositorio creado: https://github.com/ptrvargas/la-fe-de-jesus-pwa. Sitio publicado y abierto en navegador: https://ptrvargas.github.io/la-fe-de-jesus-pwa/. GitHub Actions finalizó correctamente.

## Privacidad y Biblia

No hay backend, cuentas, contraseñas, analítica ni base de datos remota. Los registros se almacenan exclusivamente en IndexedDB. El contenido estático se almacena en Cache Storage. No se envían respuestas a Bible Gateway: su herramienta se carga en un iframe aislado que recibe solo la referencia y el idioma.

Bible Gateway necesita conexión. Se usa su herramienta oficial sin distribuir su código ni almacenar sus pasajes en la caché. La interfaz ofrece RVR1960 en español y NIV en inglés mediante el proveedor, con enlace directo alternativo. Las citas bíblicas breves dentro del estudio adicional proceden del PDF suministrado y su traducción; no se ha incorporado una Biblia completa. La visualización real del proveedor está verificada en escritorio en V0.1.1 con RVR1960 y NIV; queda pendiente la regresión física Android/PWA.

## Estado de verificación

Pasaron las pruebas automatizadas descritas en `docs/TEST_RESULTS.md`. También se comprobó en la URL publicada la carga visual de escritorio, navegación, cambio de idioma, persistencia al recargar y exportación/importación real de JSON. V0.1.1 añadió pruebas reales del proveedor bíblico en escritorio. Estas comprobaciones **no equivalen** a instalación real ni rotación física. La versión no debe presentarse como validada en teléfonos hasta completar la matriz manual.

## Corrección V0.1.1

Pasajes reales verificados dentro de la lección con RVR1960 y NIV, incluyendo un rango de dos versículos y una referencia del estudio adicional. Se corrigió la propagación del click y la entrega del iframe actualizado. 12 pruebas aprobadas; respuestas locales conservadas. Prueba de regresión física Android/PWA pendiente. Diagnóstico, fuentes y resultados: [docs/V0.1.1_BIBLE_GATEWAY.md](docs/V0.1.1_BIBLE_GATEWAY.md).

## Traducción inglesa V0.1.2

Texto consolidado aprobado, sin marcas de revisión, con aclaración pastoral diferenciada. Se conserva la decisión original, los identificadores, las respuestas y la lección española. Registro de cambios y pruebas: [docs/V0.1.2_ENGLISH.md](docs/V0.1.2_ENGLISH.md). Atribuciones pendientes: [docs/LESSON_01_EN_EDITORIAL.md](docs/LESSON_01_EN_EDITORIAL.md).

## V0.1.3 experimental — no publicada

Esta rama prepara YouVersion (NVI 2015 / NIV 2011), el visor aprobado y un intermediario que mantiene la App Key en un secreto de servidor. El endpoint /passage se activa al desplegar el Worker de pruebas. Si falta, se indica expresamente y se ofrece Bible Gateway; no se simulan pasajes.

Consultar [estado, pruebas y pasos de conexión](docs/V0.1.3_YOUVERSION.md). Main conserva V0.1.2.
