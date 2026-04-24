# Javeriana Lead and Events Manager

SPA desarrollada para la prueba tecnica de Frontend (Direccion de Mercadeo, Pontificia Universidad Javeriana).

## Objetivo
Construir un dashboard que permita:

- Visualizar oferta academica en cards desde una API REST
- Filtrar por nombre y categoria sin recarga
- Registrar leads con validaciones y normalizacion
- Persistir leads en localStorage
- Incluir mejoras de UX: modo oscuro, animaciones y pruebas unitarias

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- Redux Toolkit + React Redux
- Framer Motion
- Jest + React Testing Library
- gh-pages para deployment

## Scripts

- `npm run dev`: servidor local
- `npm run build`: compilacion de produccion
- `npm run preview`: previsualizar build
- `npm run test`: ejecutar pruebas unitarias
- `npm run test:watch`: pruebas en modo watch
- `npm run deploy`: publicar en GitHub Pages (usa `dist`)

## Requerimientos funcionales cubiertos

1. Visualizacion de datos
- Fuente actual: `public/api/events.json` (mock local temporal)
- Integracion lista para cambiar a endpoint externo en `src/lib/api/eventsApi.ts`

2. Filtrado avanzado
- Busqueda por nombre en tiempo real
- Filtro por categoria: Todos, Pregrado, Posgrado, Educacion Continua
- Seleccion memoizada con `createSelector`

3. Captura de leads
- Validacion de campos requeridos y formato de email
- Recomendacion para dominio `@javeriana.edu.co`
- Normalizacion previa al guardado (trim, espacios, capitalizacion, lowercase)

4. Persistencia
- Leads en `localStorage` con schema versionado (`javeriana.leads.v1`)
- Tema guardado en `localStorage` (`javeriana.theme.v1`)

## Arquitectura

```text
src/
  app/
    hooks.ts
    providers.tsx
    store.ts
  components/
    common/
    events/
    filters/
    layout/
    leads/
    theme/
  features/
    events/
    filters/
    leads/
    theme/
  lib/
    api/
    constants/
    normalization/
    storage/
    theme/
    utils/
    validation/
  pages/
    dashboard/
  tests/
```

## Pruebas unitarias implementadas

- `src/lib/normalization/leadNormalization.test.ts`
- `src/lib/validation/leadValidation.test.ts`
- `src/features/events/eventsSelectors.test.ts`
- `src/features/leads/leadsSlice.test.ts`

Resultado actual: **10/10 tests passing**.

## Deploy en GitHub Pages

La app ya queda configurada con:

- `base: '/Javeriana-Lead-Manager/'` en `vite.config.ts`
- `homepage` en `package.json`
- scripts `predeploy` y `deploy`

Pasos:

1. Autenticar GitHub CLI:
- `gh auth login`

2. Inicializar git si aplica y subir a `main`:
- `git init`
- `git add .`
- `git commit -m "feat: initial dashboard implementation"`
- `git branch -M main`
- `git remote add origin https://github.com/lokogam/Javeriana-Lead-Manager.git`
- `git push -u origin main`

3. Publicar build:
- `npm run deploy`

4. Activar GitHub Pages en el repositorio apuntando a la rama `gh-pages`.

## Decisiones tecnicas

- Se usa mock local para no bloquear avance y permitir pruebas reproducibles.
- El estado global usa slices separados por feature para mantener escalabilidad.
- Los selectores de eventos estan memoizados para minimizar rerenders.
- La validacion y normalizacion se separan en capa `lib` para testearlas en aislamiento.

## Estado actual

- Build de produccion: OK
- Pruebas unitarias: OK
- UI responsive: implementada
- Modo oscuro: implementado
- Animaciones con Framer Motion: implementadas en cards
