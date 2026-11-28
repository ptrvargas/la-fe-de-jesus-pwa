# PLAN MAESTRO DE DESARROLLO

## La Fe de Jesús Digital · Futura plataforma de estudios bíblicos

**Revisión:** 1.0 --- 27 de noviembre de 2026\
**Estado:** planificación aprobada por etapas; publicación pendiente de autorización.\
**Autor del proyecto:** Ricardo Vargas --- @ptrvargas\
**Repositorio:** `ptrvargas/la-fe-de-jesus-pwa`\
**Producción:** https://ptrvargas.github.io/la-fe-de-jesus-pwa/\
**Ubicación oficial propuesta:** `docs/PLAN-MAESTRO.md`

## 1. Propósito y alcance

Desarrollar una herramienta gratuita de evangelización, discipulado, estudio personal y acompañamiento pastoral, inicialmente basada en La Fe de Jesús. La Fe de Jesús será el primer curso de la plataforma, no la plataforma en sí misma. La expansión será gradual y no deberá retrasar la estabilización de las versiones actuales.

Principios: acceso sin cuentas obligatorias, sin publicidad, privacidad, almacenamiento local, experiencia sencilla para distintas edades, accesibilidad, diseño adaptable a teléfonos, tabletas y computadoras, español e inglés, estudio individual o acompañado y funcionamiento offline del contenido local. Las consultas bíblicas en línea requieren conexión. No introducir servicios de pago ni infraestructura adicional sin aprobación.

## 2. Gobierno del proyecto

-   GitHub será la fuente oficial del código y del plan; una copia del plan se mantendrá en las fuentes del proyecto de ChatGPT.
-   ChatGPT será el espacio de planificación; Work ejecutará únicamente el alcance expresamente autorizado.
-   Actualizar este documento al aprobar decisiones, cambiar alcance o cerrar versiones. Registrar fecha, revisión y cambios; conservar historial Git.
-   Distinguir siempre entre funcionalidad implementada, verificada, aprobada para desarrollo y propuesta futura.
-   Trabajar en entorno experimental o rama separada. No reemplazar producción ni publicar sin autorización expresa.
-   Antes de cada etapa, revisar este plan, el código real y el estado de despliegue; informar discrepancias antes de actuar.
-   No incluir secretos, claves API, datos de estudiantes ni respaldos reales en el repositorio o en este documento.

## 3. Estado al cierre de la primera ronda de aceptación

V0.1.2 es la versión estable reportada; V0.1.3 es experimental. Solo está incorporada la lección 1, en ambos idiomas. Work reportó 38/38 pruebas automatizadas satisfactorias antes de la ronda manual; este documento no constituye una auditoría independiente del código o del despliegue.

  ---------------------------------------------------------------------------------------------------------------------------------------------
  Prueba                       Resultado manual             Observación
  ---------------------------- ---------------------------- -----------------------------------------------------------------------------------
  1\. Biblia en español        Aprobada                     NVI 2025

  2\. Biblia en inglés         Aprobada                     NIV 2011

  3\. Visor y atribución       Aprobada                     Desplazamiento y cierre; destino del enlace externo no verificado

  4\. Bible Gateway            Aprobada                     Alternativa manual ES/EN; fallo automático de YouVersion no simulado manualmente

  5\. Respuestas               Aprobada                     Progreso 3/6 y 6/6

  6\. Decisión y firma         Aprobada con observaciones   Mejoras de controles y autoevaluación

  7\. Persistencia local       Aprobada                     Cierre y reapertura; sesión incógnita separada

  8\. Exportación JSON         Aprobada                     Archivo de respaldo inspeccionado

  9\. Importación JSON         No aprobada                  Aviso de importación, pero registros no visibles tras recarga

  10\. Compartir               Parcial                      Descarga JSON correcta; no aparece menú nativo

  11\. PWA Android y offline   Aprobada con observaciones   Instalación, persistencia y acceso offline; mejorar visor y botón

  12\. iPad mini               Aprobada con observaciones   Safari y PWA, vertical/horizontal, instalación, persistencia offline y reconexión
  ---------------------------------------------------------------------------------------------------------------------------------------------

Balance: 12/12 realizadas, 10 aprobadas (algunas con observaciones), una parcial y una no aprobada. V0.1.3 no está autorizada para producción.

## 4. V0.1.3 --- Corrección y estabilización

### 4.1 Integración bíblica: preservar lo aprobado

-   Español: Nueva Versión Internacional 2025, YouVersion ID 128. Inglés: New International Version 2011, ID 111. No regresar a NVI 2015 ID 2664, edición identificada durante las pruebas como limitada al Nuevo Testamento.
-   Licencia Biblica Fast-track aceptada según el historial del proyecto; respetar condiciones, atribución y restricciones de uso. Verificar condiciones vigentes antes de ampliar usos o almacenamiento de textos.
-   Mantener proxy Cloudflare, secreto del lado servidor y limitación de solicitudes. No exponer credenciales al cliente.
-   Conservar visor con encabezado verde, cuerpo crema, referencia, números de versículo en superíndice, copyright completo y sección desplegable «Más información» con enlace a YouVersion.
-   Bible Gateway como alternativa: RVR1960 en español y NIV en inglés. Mantener acceso manual y comprobar fallback cuando exista conexión y falle YouVersion. No confundir indisponibilidad del proveedor con ausencia de Internet.

### 4.2 Importación JSON --- bloqueante

Reproducir el fallo observado en Chrome incógnito y Samsung Internet: se selecciona el archivo, aparece un aviso de copia añadida, pero la lección sigue vacía incluso tras recargar. La causa no está confirmada; investigar persistencia, selección del registro activo y actualización de interfaz.

-   Validar contenido interno, no nombre del archivo: aplicación, versión de esquema, tipo, estructura, integridad y compatibilidad. Admitir nombres con espacios y nombres modificados.
-   Mostrar vista previa de lo que se importará y confirmación explícita. Localizar selector de archivo y mensajes ES/EN.
-   Evitar duplicados y sobrescrituras silenciosas de datos más recientes. Ante conflicto, preservar información y solicitar decisión clara.
-   No anunciar éxito hasta confirmar escritura y disponibilidad efectiva del registro. Mostrar resultado persistente y errores comprensibles.
-   Mantener compatibilidad con respaldos existentes: `app: la-fe-de-jesus`, `schema: 1`, `type: records`. No perder respuestas, compromisos, decisión, firma, estado estudiado ni autoevaluación.
-   Probar restauración en instalación limpia, datos existentes, reimportación, archivos dañados, incompatibles y cancelación. No usar datos personales reales en pruebas automatizadas.

### 4.3 Compartir respuestas

Usar Web Share API con archivos cuando el dispositivo lo permita, previa comprobación de soporte. Ofrecer descarga como alternativa y manejar cancelación sin error falso. Sustituir confirmación nativa del navegador por diálogo propio, bilingüe y claro sobre los datos compartidos voluntariamente. En esta versión mantener compatibilidad del JSON existente; la separación formal entre respaldo y progreso se desarrollará en V0.2.0.

### 4.4 Autoevaluación y controles

-   Mostrar retroalimentación por pregunta, identificar aciertos y errores, permitir corregir y reintentar, ofrecer explicación o referencia bíblica cuando corresponda. No convertir el repaso en requisito para avanzar.
-   Simplificar controles duplicados de exportación, importación y compartir en la sección de decisión. No eliminar funcionalidades ni anticipar el rediseño completo de navegación.
-   Conservar el marcado manual de lección estudiada, independiente del número de respuestas, decisión y lectura adicional. Decisión y firma voluntarias.

### 4.5 Instalación PWA y diseño adaptable

-   Conservar el botón existente de instalación y el flujo nativo Android cuando esté disponible.
-   En Apple, sustituir el aviso pequeño por diálogo centrado, legible, con iconos y pasos: Compartir, Añadir a pantalla de inicio, activar «Abrir como app web» si aparece y confirmar. Adaptar ES/EN y ambas orientaciones.
-   Ocultar el botón en modo independiente (standalone) en Android y Apple. No afirmar que una app está instalada cuando el navegador no permite detectarlo con certeza.
-   Corregir el texto truncado «Estudio acompañado» en el selector horizontal del iPad. Preservar menú lateral adaptable.

### 4.6 Experiencia offline

Preservar apertura de PWA, lectura local, respuestas y progreso sin Internet. Investigar la alerta de red de iPadOS al iniciar offline; evitar solicitudes externas innecesarias. No cargar iframes ni abrir enlaces externos de Bible Gateway cuando se detecte desconexión. Permitir cerrar el visor y continuar. Recuperar consultas bíblicas al reconectar sin perder datos.

Mensaje ES propuesto y acordado en esencia:

> Estás sin conexión. Necesitas Internet para visualizar este pasaje bíblico en la aplicación.
>
> ¡Tu estudio puede continuar! Busca este pasaje en tu Biblia impresa y continúa descubriendo lo que Dios tiene para enseñarte hoy.
>
> Tus respuestas y tu progreso se seguirán guardando automáticamente.

Botón: «Continuar mi estudio». Versión EN propuesta: "You're offline. An internet connection is needed to display this Bible passage in the app. Your study can continue! Look up this passage in your printed Bible and keep discovering what God has to teach you today. Your answers and progress will continue to be saved automatically." Botón: "Continue my study". Mantener referencia visible y estilo del visor.

### 4.7 Criterios de salida

Ejecutar pruebas automatizadas y regresión de todas las funciones anteriores; comprobar importación y compartir en Android/iPad, instalación, offline/reconexión, ambos idiomas y orientaciones. Documentar resultados reales, limitaciones y enlace experimental verificado. No publicar ni iniciar V0.2.0 hasta aceptación final y autorización expresa.

## 5. Arquitectura transversal --- desde V0.2.0

Separar motor de estudio y contenido. Perfil, visor bíblico, navegación, respuestas, progreso, firmas, respaldo, intercambio, ayuda e informes serán servicios/componentes reutilizables. Evitar dependencias rígidas del nombre La Fe de Jesús o del número 20.

Modelo conceptual (no prescribe aún esquema físico): perfil global con ID estable; curso con ID, autoría, licencia, idiomas y versión; lección con ID estable dentro del curso; secciones y preguntas con IDs; inscripción/recorrido por perfil, curso e idioma; respuestas, decisiones, firma, repaso y progreso vinculados al recorrido y lección. Instructor global con estudiantes y recorridos asociados. Identificadores estables independientes de títulos traducidos y orden de presentación.

Permitir cantidad variable de lecciones, preguntas y secciones, preguntas abiertas, selección múltiple, reflexiones, lecturas y actividades opcionales. Los cambios de contenido deben conservar registros anteriores mediante versionado y migraciones. Definir esquema validable de contenido y pruebas con más de un curso ficticio antes de añadir cursos reales. Mantener IndexedDB y compatibilidad de datos existentes; migraciones seguras, idempotentes y verificadas. No asignar idioma a registros antiguos de manera arbitraria si no puede determinarse: diseñar resolución explícita.

## 6. V0.2.0 --- Experiencia del estudiante

-   Inicio como pantalla predeterminada, con continuar última lección y preferiblemente sección exacta, acceso a todas las lecciones, progreso, perfil, configuración y créditos. Preferencia opcional de abrir directamente última lección.
-   Navegación inferior móvil: Inicio, Lecciones, Progreso, Perfil. Menú lateral adaptable en pantallas amplias. Recomendar orden secuencial sin imponerlo. Si termina una lección, sugerir la siguiente pendiente sin impedir repaso o libre elección.
-   Bienvenida opcional y omisible. Perfil local editable: nombre preferido, avatar, idioma, modalidad y fecha de inicio; no exigir correo, teléfono, iglesia ni instructor. Sin cuenta obligatoria.
-   Separar idioma de interfaz e idioma de estudio. Elegir español, inglés o ambos; un perfil con recorridos independientes por curso e idioma. Cambiar preferencias no borra registros. Mostrar únicamente recorridos relevantes en inicio; permitir activar otros posteriormente.
-   Progreso por lección y curso: pendiente, en progreso, estudiada; decisión y lectura adicional como indicadores separados. No equiparar respuestas completas con decisión espiritual.
-   Decisión personal voluntaria; nombre sugerido desde perfil, editable. Firma opcional escrita o dibujada con dedo, lápiz o ratón. No firmar automáticamente ni presentar como contrato legal.
-   Copia de seguridad integral del estudiante: perfil, avatar, preferencias, recorridos, respuestas, decisiones, firmas, repasos y progreso de todos los idiomas/cursos. Advertir que contiene información espiritual personal.
-   Compartir progreso separado del respaldo: selección de una lección, varias o todas; selección de datos, consentimiento explícito para decisiones y firmas, excluir datos sensibles por defecto. Formatos con tipos internos diferenciados y compatibilidad con esquema anterior.
-   Centro de ayuda inicial y tutorial de bienvenida opcional. No implementar todavía dashboard completo ni creador de cursos.

## 7. V0.3.0 --- Experiencia del instructor

Panel global, no exclusivo de La Fe de Jesús. Una persona puede ser estudiante e instructor, con registros separados. Un instructor puede acompañar múltiples estudiantes y cursos; un estudiante con varios recorridos cuenta como una sola persona. Sin límite arbitrario de estudiantes; validar rendimiento con 50 o más registros representativos, sujeto a capacidad del dispositivo.

-   Lista, búsqueda, filtros por curso, idioma y avance, ficha individual, resumen global e indicadores por recorrido.
-   Importar archivos de progreso voluntariamente compartidos. Identificar por ID estable, actualizar por curso/idioma/lección, evitar duplicados y sobrescrituras antiguas. Resolver conflictos de manera visible. Notas privadas del instructor separadas.
-   Informes: PDF vertical individual (nombre, curso, avance, instructor y fecha); PDF horizontal matriz por lección/estado/idioma; Excel de progreso general; PDF de solicitudes de acompañamiento pastoral. Excluir respuestas, firmas, decisiones y notas privadas por defecto.
-   Acompañamiento pastoral: selección voluntaria de temas o solicitudes (por ejemplo, bautismo), no inferir automáticamente de una lección completada. Compartir con conocimiento del estudiante y datos mínimos.
-   Respaldo JSON integral del instructor: perfil, estudiantes, recorridos y notas. Sin sincronización en nube en esta etapa; progreso se actualiza al importar archivos, no en tiempo real.
-   Seguridad sencilla: PIN opcional, opción visible de recuperación, código de recuperación; sin cuentas, SMS, correo ni contraseña maestra. No bloquear acceso a la Biblia ni borrar datos automáticamente. Distinguir bloqueo visual de cifrado real. Diseñar respaldo cifrado opcional/recomendado, criptografía estándar y clave de recuperación independiente; explicar que perder todas las claves puede impedir recuperación. Validar diseño antes de implementarlo; no prometer recuperación imposible. Recordatorios de respaldo sin complicar el uso.

## 8. Convenciones de archivos

Nombres cortos, sin espacios ni acentos, separados por guiones, fecha local ISO AAAA-MM-DD. Usar nombre de perfil, no firma; prever alternativa sin nombre. Validar siempre metadatos internos, nunca depender del nombre. Ejemplos aprobados para La Fe de Jesús:

  Uso                       Ejemplo
  ------------------------- ------------------------------------------
  Progreso compartido       `LFJ-Maria-Gonzalez-2026-11-27.json`
  Respaldo estudiante       `LFJ-BKP-Maria-Gonzalez-2026-11-27.json`
  Respaldo instructor       `LFJ-INS-Ricardo-Vargas-2026-11-27.json`
  Informe                   `LFJ-INF-Ricardo-Vargas-2026-11-27.pdf`
  Acompañamiento pastoral   `LFJ-AP-Ricardo-Vargas-2026-11-27.pdf`

La nomenclatura global multicurso y de Excel se definirá antes de la expansión; no romper compatibilidad con archivos LFJ.

## 9. Centro de ayuda y documentación

Tres niveles: tutorial de bienvenida breve y omisible; ayuda integrada paso a paso con capturas reales, preguntas frecuentes y ayuda contextual, disponible offline; manuales PDF descargables, imprimibles y compartibles. Evitar depender de una web externa para la ayuda esencial.

Guía del estudiante desde V0.2.0; guía del instructor desde V0.3.0. Consolidar manuales con interfaces definitivas para V1.0.0. Cada manual incluirá versión compatible, índice, capturas, instrucciones y solución de problemas. Nombres propuestos: `LFJ-Manual-EST-ES.pdf`, `LFJ-Manual-EST-EN.pdf`, `LFJ-Manual-INS-ES.pdf`, `LFJ-Manual-INS-EN.pdf`. Actualizar documentación junto con cada funcionalidad.

## 10. V1.0.0 --- La Fe de Jesús Digital completa

Completar 20 lecciones en español e inglés, usando el motor reutilizable. Flujo editorial: recibir material original autorizado; verificar preguntas, referencias y fidelidad doctrinal; traducir al inglés; revisar calidad lingüística y teológica; estructurar datos; validar y previsualizar; probar ambos idiomas; publicar solo con aprobación. No crear una interfaz desde cero por lección.

Validar el curso completo, navegación libre, recorridos bilingües, restauración, informes, accesibilidad y documentación. Mantener nombre e identidad actuales hasta decidir la marca de la plataforma general. Verificar derechos de reproducción de materiales y traducciones antes de distribución.

## 11. Expansión posterior --- visión aprobada, alcance por definir

El segundo curso será La Fe de Jesús Avanzada, después del curso inicial completo. Cantidad estimada: diez lecciones, pendiente de verificar con el material original. El autor del proyecto deberá conseguirlo; preparar traducción inglesa revisada. Otros cursos posibles: Apocalipsis, familia y jóvenes; títulos, contenidos, cantidades y permisos pendientes.

Evolucionar hacia catálogo general y biblioteca de cursos con un perfil y dashboard globales. El motor debe permitir que nuevos cursos se incorporen principalmente como contenido, sin reprogramar funcionalidades comunes. Si un curso requiere tipos de actividad inéditos, podrá necesitar extensiones del motor.

### Creador de cursos bíblicos (futuro)

Herramienta para pastores e instructores que producen materiales propios. Permitir crear curso, metadatos, lecciones, preguntas, referencias, secciones, traducciones y actividades; validar, previsualizar y generar paquete importable. Tres modalidades conceptuales: cursos del catálogo oficial, personalizados y compartidos voluntariamente entre instructores. Los estudiantes podrán incorporar cursos compatibles a su biblioteca y compartir progreso con su instructor desde el mismo sistema.

Diseñar identidad única de curso, autoría, permisos, versiones, validación de paquetes y actualizaciones sin pérdida de respuestas. No ejecutar código arbitrario procedente de paquetes; tratar contenido importado como datos. No asumir que compartir un curso equivale a tener derechos para redistribuirlo. Considerar intercambio local por archivos antes de incorporar servidores o cuentas. El editor y la distribución pública no están autorizados para desarrollo inmediato.

## 12. Hoja de ruta y puertas de aprobación

  ------------------------------------------------------------------------------------------------------------------------------------------
  Versión                 Alcance                                                               Estado
  ----------------------- --------------------------------------------------------------------- --------------------------------------------
  V0.1.2                  Producción actual reportada                                           Preservar

  V0.1.3                  Integración bíblica y correcciones de aceptación                      Experimental; correcciones pendientes

  V0.2.0                  Motor modular, perfil global, navegación, progreso bilingüe y ayuda   Plan aprobado; desarrollo pendiente

  V0.3.0                  Instructor global, informes, respaldo, seguridad y ayuda              Plan aprobado; desarrollo pendiente

  V1.0.0                  20 lecciones bilingües y manuales                                     Objetivo de lanzamiento

  V1.x                    Curso avanzado y expansión gradual                                    Propuesta de numeración

  V2.0                    Plataforma multicurso y evolución del creador                         Visión; numeración y alcance por confirmar
  ------------------------------------------------------------------------------------------------------------------------------------------

Cada etapa requiere autorización de inicio, implementación experimental, pruebas automatizadas y manuales, reporte de resultados y autorización de publicación. No confundir aprobación de la visión con autorización para implementar todo.

## 13. Próxima acción inmediata

Preparar un prompt separado para Work limitado a V0.1.3, solicitar incorporación de este documento en `docs/PLAN-MAESTRO.md` y correcciones de la sección 4. No cambiar producción. Tras recibir el informe y enlace experimental, ejecutar regresión y aceptación final. Solo entonces decidir publicación y comenzar V0.2.0.

## 14. Registro de revisiones y pendientes

-   2026-11-27 --- Revisión 1.0: consolidación de decisiones de la conversación, pruebas manuales y visión multicurso.
-   Pendientes de comprobación: estado real del repositorio y despliegue, causa de importación, fallback automático en fallo del proveedor, destino de enlace de atribución, diseño técnico de migración y recuperación, derechos de nuevos cursos y material avanzado.
-   Decisiones propuestas por esta revisión: modelo conceptual de identificadores, validación de paquetes como datos, pruebas multicurso ficticias y convenciones de gobierno documental. Son criterios de diseño para revisar, no implementación realizada.
