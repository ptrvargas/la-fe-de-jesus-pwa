# Publicación en GitHub Pages

## Estado de esta entrega

Repositorio nuevo creado y acceso de escritura confirmado: https://github.com/ptrvargas/la-fe-de-jesus-pwa. Se conserva el commit inicial generado por GitHub; los archivos de v0.1 se incorporan como un commit posterior. La configuración de Pages y el despliegue se verifican por separado.

## Continuación preparada

1. Crear **un repositorio nuevo** llamado `la-fe-de-jesus-pwa` en la cuenta elegida. Para GitHub Pages gratuito normalmente se usa un repositorio público. Si ya existe, inspeccionarlo y trabajar mediante una rama/PR; no sobrescribirlo.
2. Subir este árbol de fuentes a la rama `main`, sin `node_modules`, `dist` ni archivos locales de prueba.
3. En Settings → Pages → Build and deployment, seleccionar **GitHub Actions**.
4. El workflow `pages.yml` instala dependencias, ejecuta pruebas, empaqueta solo archivos de producción y publica el sitio.
5. Tomar la URL real del resultado del job `Deploy`; no suponer éxito ni construir un enlace como prueba.
6. Completar la matriz manual en esa URL HTTPS, incluyendo una ruta de repositorio y las dos orientaciones.

Comandos de preparación local (una vez creado un repositorio nuevo y configurada autenticación Git):

```sh
npm ci
npm test
npm run build
git init -b main
git add .
git commit -m "Build bilingual La Fe de Jesus PWA v0.1"
# Añadir el remote real del repositorio nuevo antes de hacer push.
```

El workflow usa las acciones oficiales `checkout@v4`, `setup-node@v4`, `configure-pages@v5`, `upload-pages-artifact@v3` y `deploy-pages@v4`; permisos `contents:read`, `pages:write`, `id-token:write`. Incluye `workflow_dispatch` para una ejecución manual.
