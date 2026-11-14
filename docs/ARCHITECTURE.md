# Arquitectura y decisiones

Aplicación estática de módulos ES, sin dependencias de producción y apta para el subdirectorio de GitHub Pages. Todo recurso propio usa rutas relativas. Ningún componente exige autenticación. No se configura orientación en el manifest.

## Datos

IndexedDB `la-fe-de-jesus`, versión 1, almacén `state`, clave `workspace`. Estado: idioma, modalidad y registros locales. Cada registro tiene UUID, nombre/iglesia/instructor opcionales, notas y un diccionario de lecciones indexado del 1 al 20. Cada lección distingue respuestas, aplicaciones, estudiada, decisión, firma, lectura adicional y autoevaluación. El cambio de idioma no traduce ni sustituye respuestas personales.

El guardado captura el estado inmediatamente y serializa las escrituras mediante una cola. Solo comunica éxito después de completar la transacción. Al fallar, informa al usuario. No se garantiza persistencia tras cierre abrupto antes de completar una transacción o frente a eliminación por el navegador.

Intercambio JSON con `app`, `schema:1`, `type`. Tipos `records` e `invitation`. Validación de tipos, número de lección, longitudes y límite de 2 MB por archivo. Máximo 200 registros locales. Solo se conservan campos conocidos. Se escapa texto al renderizar. Importar añade copias con UUID nuevos; nunca resuelve conflictos de manera silenciosa ni hace sincronización. Cualquier registro compartido puede editarse externamente: no constituye una identidad autenticada ni una firma criptográfica.

## Contenido

Catálogo de 20 lecciones, archivos JSON por idioma y lección. Para añadir una lección: incorporar sus dos archivos, habilitarla en el catálogo, adaptar el cargador/navegación actualmente enfocados en la piloto y añadir sus archivos al Service Worker. El modelo de almacenamiento ya admite las 20; la navegación de contenido de 2–20 aún no está implementada. No se inventaron sus títulos ni sus preguntas.

Se normalizaron acentos y errores evidentes de OCR del PDF. Se conservaron las seis preguntas, cuatro aplicaciones, decisión y las cuatro secciones de lectura completas. Las citas históricas y referencias originales se conservan sin validación independiente. El inglés es una traducción de trabajo, no una edición oficial del curso.

## PWA

Caché versionada de todos los archivos propios. Estrategia cache-first para esos recursos; solicitudes externas pasan directamente a red. Nueva versión instala en espera; un botón guarda y activa la actualización. La activación elimina solo cachés antiguas con el prefijo del proyecto. En cada cambio de archivos publicados se debe incrementar `CACHE` en `sw.js`. No se fuerza actualización mientras se responde. El shell y ambas versiones de la lección quedan disponibles después de una instalación de caché exitosa.

Manifest con íconos PNG de 192 y 512 px y versión maskable; modo standalone. Botón visible: usa `beforeinstallprompt` cuando existe, instrucciones de Safari en iOS/iPadOS y ayuda contextual en otros navegadores. No puede forzar un aviso nativo ni garantizar instalación.

## Diseño

Diseño fluido y puntos de adaptación a 1400, 1150 y 760 px. Dos columnas para contenido y herramientas cuando hay espacio; disposición vertical en teléfonos. Reglas de poca altura en landscape; ningún contenedor de lectura fija la altura de la página. Etiquetas de formulario, regiones semánticas, foco visible, enlace para saltar al contenido, mensajes live y controles de mínimo 44 px (referencias secundarias: 38 px). No hay animaciones esenciales.

## Bible Gateway

Herramienta oficial: https://www.biblegateway.com/share/tooltips/
Script oficial: https://www.biblegateway.com/public/link-to-us/tooltips/bglinks.js
Condiciones enlazadas por el proveedor: https://www.biblegateway.com/legal/widget-terms/

La documentación confirma `clickTooltip` y `showTooltips`. La herramienta reconoce principalmente nombres ingleses de libros: se conservan etiquetas españolas en la interfaz y se pasan referencias canónicas inglesas a `data-bibleref`. Se configura RVR1960/NIV sin copiar pasajes del proveedor.

El código externo se ejecuta únicamente en un iframe sandbox sin `allow-same-origin`, separado de respuestas, firmas y notas. El recuadro se abre en el flujo de la página, con botón de cerrar, desplazamiento propio y enlace alternativo; no es un modal que bloquee la edición. El proveedor conserva su atribución y enlaces. No se redistribuye su script.

La documentación pública ofrece la herramienta para páginas web; las condiciones de widgets enlazadas incluyen restricciones de modificación, redistribución y licencia para uso personal. Se deja documentada esa tensión para aclarar con Bible Gateway antes de distribución amplia si su permiso de reference tagging no resulta suficiente. No se asume autorización para copiar textos protegidos ni para quitar atribución. No se ha declarado compatibilidad móvil real: está pendiente de prueba, al igual que la política de cookies/recursos de terceros en cada navegador.
