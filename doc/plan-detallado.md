# Plan Detallado de Implementacion

## 1. Objetivo General
Construir una SPA llamada Javeriana Lead and Events Manager que cumpla todos los requerimientos funcionales y tecnicos de la prueba:

- Visualizacion de eventos/programas desde API REST
- Filtro por texto y categoria sin recarga
- Captura de leads con validaciones y normalizacion
- Persistencia en localStorage
- Stack: Vite + React + TypeScript + Tailwind + Redux Toolkit
- Plus: modo oscuro, animaciones con Framer Motion y pruebas unitarias
- Despliegue en GitHub Pages usando gh-pages

## 2. Repositorios y Referencias Importantes

### 2.1 Repositorio principal del proyecto
- https://github.com/lokogam/Javeriana-Lead-Manager.git

### 2.2 Repositorios y docs tecnicas clave
- React: https://github.com/facebook/react
- Vite: https://github.com/vitejs/vite
- Redux Toolkit: https://github.com/reduxjs/redux-toolkit
- Tailwind CSS: https://github.com/tailwindlabs/tailwindcss
- Framer Motion: https://github.com/framer/motion
- React Testing Library: https://github.com/testing-library/react-testing-library
- Jest: https://github.com/jestjs/jest
- JSONPlaceholder (fuente API mock): https://jsonplaceholder.typicode.com

## 3. Alcance Funcional Detallado

### 3.1 Modulo de eventos/programas
- Consumir API con async/await y manejo de estados: idle/loading/success/error
- Mostrar cards con informacion clave:
  - nombre
  - categoria
  - fecha o modalidad (si aplica)
  - descripcion corta
- Incluir estados visuales:
  - skeleton loading
  - error con boton de reintento
  - estado vacio

### 3.2 Busqueda y filtrado avanzado
- Buscador por nombre en tiempo real (sin submit)
- Filtro por categoria:
  - Todos
  - Pregrado
  - Posgrado
  - Educacion Continua
- Los filtros no recargan pagina
- Requisitos de performance:
  - selectores memoizados
  - render minimo necesario

### 3.3 Formulario de captura de leads
- Campos minimos:
  - nombre completo
  - email
  - telefono (opcional pero recomendado)
  - programa/evento de interes
- Validaciones:
  - email valido por expresion regular
  - preferencia de dominio @javeriana.edu.co
  - campos requeridos no vacios
- Normalizacion previa al guardado:
  - trim en strings
  - espacios internos normalizados
  - capitalizacion de nombre
  - email en minuscula
- Mostrar mensaje de exito claro y accesible

### 3.4 Persistencia local
- Guardar leads en localStorage
- Recuperar al iniciar la app
- Versionar el schema en localStorage para migraciones simples

## 4. Arquitectura Propuesta

## 4.1 Estructura de carpetas

```text
Javeriana-Lead-Manager/
  doc/
    prueba.md
    add.md
    plan-detallado.md
  public/
  src/
    app/
      store.ts
      hooks.ts
      providers.tsx
    components/
      common/
      layout/
      events/
      leads/
      filters/
      theme/
    features/
      events/
        eventsSlice.ts
        eventsThunks.ts
        eventsSelectors.ts
        eventsTypes.ts
      leads/
        leadsSlice.ts
        leadsSelectors.ts
        leadsTypes.ts
      filters/
        filtersSlice.ts
      theme/
        themeSlice.ts
    lib/
      api/
        eventsApi.ts
      storage/
        localStorage.ts
      validation/
        leadValidation.ts
      normalization/
        leadNormalization.ts
      constants/
        categories.ts
      utils/
        formatters.ts
    pages/
      dashboard/
        DashboardPage.tsx
    styles/
      globals.css
      tokens.css
    tests/
      setupTests.ts
      fixtures/
  .github/
    workflows/
      ci.yml
  package.json
  tsconfig.json
  vite.config.ts
  tailwind.config.ts
  README.md
```

### 4.2 Principios de arquitectura
- Separacion clara por feature
- UI desacoplada de logica de negocio
- Tipado estricto con TypeScript
- Side effects centralizados (thunks y capa api)
- Selectores para derivar estado y minimizar renders

## 5. Modelado de Tipos (TypeScript)

### 5.1 Tipos principales
- EventItem
- EventCategory
- LeadFormInput
- LeadEntity
- FilterState
- ThemeMode
- ApiState<T>

### 5.2 Reglas de tipado
- strict mode habilitado
- prohibido any
- interfaces para modelos de dominio
- tipos utilitarios para DTOs y formularios

## 6. Gestion de Estado con Redux Toolkit

### 6.1 Slices
- eventsSlice:
  - fetch events
  - loading/error
  - cache basica en memoria
- filtersSlice:
  - searchTerm
  - selectedCategory
- leadsSlice:
  - add lead
  - hydrate desde localStorage
- themeSlice:
  - light/dark/system
  - persistencia de preferencia

### 6.2 Selectores
- selectFilteredEvents (memoizado)
- selectLeadCount
- selectPreferredTheme

### 6.3 Buenas practicas RTK
- reducers pequenos y predecibles
- serializable state
- thunks para asincronia
- typed hooks: useAppDispatch/useAppSelector

## 7. Diseno UI/UX y Sistema Visual

### 7.1 Direccion visual propuesta
- Identidad academica moderna, profesional y clara
- Escala tipografica consistente
- Sistema de tokens de color y espaciado
- Alto contraste en informacion critica

### 7.2 Diseño responsive
- Mobile first
- Breakpoints para tablet y desktop
- Grillas fluidas para cards
- Formulario adaptable por secciones

### 7.3 Accesibilidad
- HTML semantico
- labels y aria-describedby en formularios
- foco visible y navegacion por teclado
- mensajes de error accesibles

### 7.4 Modo oscuro
- Implementar estrategia por clase con variables CSS
- Detectar preferencia del sistema
- Permitir cambio manual (toggle)
- Persistir preferencia y evitar flash inicial

### 7.5 Animaciones con Framer Motion
- Entrada escalonada de cards
- Transiciones suaves en filtros
- Microinteracciones en botones y feedback del formulario
- Respetar prefers-reduced-motion

## 8. Estrategia de Pruebas (Unitarias e Integracion Ligera)

## 8.1 Stack de testing
- Jest + React Testing Library
- @testing-library/user-event
- mocks de API y localStorage

### 8.2 Cobertura objetivo
- lineas >= 85%
- branches >= 80%
- funciones criticas 100% (normalizacion, validacion, filtros)

### 8.3 Matriz de pruebas por funcionalidad

#### A. API y datos
- fetch exitoso retorna datos tipados
- fetch con error maneja estado y mensaje
- transformacion API -> EventItem

#### B. Filtros
- filtra por nombre ignorando mayusculas/minusculas
- filtra por categoria
- combinacion nombre + categoria
- retorna estado vacio cuando no hay coincidencias

#### C. Formulario de leads
- valida email invalido
- valida dominio recomendado javeriana
- aplica normalizacion de nombre y espacios
- aplica lowercase en email
- muestra feedback de exito al guardar

#### D. Persistencia
- guarda lead en localStorage
- recupera leads en carga inicial
- maneja datos corruptos con fallback seguro

#### E. Redux
- reducers de cada slice
- thunks de events
- selectores memoizados

#### F. UI y visualizacion adecuada
- render de cards en distintos estados
- render responsive basico (estructura y clases)
- contraste y presencia de textos/labels esenciales
- snapshot selectivo de componentes estables

## 8.4 Pruebas de humo adicionales recomendadas
- Test E2E minimo para flujo completo:
  - cargar eventos
  - filtrar
  - registrar lead
  - verificar persistencia tras recarga

## 9. Performance y Calidad

### 9.1 Performance
- selectores memoizados
- evitar recalculos en render
- dividir componentes para renders aislados
- lazy loading para bloques no criticos

### 9.2 Calidad de codigo
- ESLint + TypeScript strict
- Prettier
- reglas de import ordenado
- convenciones de nombres y estructura por feature

### 9.3 Definicion de Done por modulo
- implementacion funcional
- pruebas unitarias pasando
- cobertura minima alcanzada
- validacion responsive y accesible
- revisado sin any y sin warnings criticos

## 10. Plan de Trabajo por Fases

### Fase 0 - Preparacion inicial
1. Crear app con Vite React TypeScript
2. Instalar dependencias base
3. Configurar Tailwind, Redux Toolkit y testing
4. Configurar linters y scripts

### Fase 1 - Fundaciones de arquitectura
1. Crear estructura de carpetas
2. Configurar store y hooks tipados
3. Definir modelos TypeScript y contratos API

### Fase 2 - Eventos y filtrado
1. Implementar fetch de eventos
2. Construir cards y estados de carga/error/vacio
3. Implementar buscador y filtro por categoria
4. Optimizar con selectores memoizados

### Fase 3 - Leads y persistencia
1. Construir formulario de leads
2. Implementar validaciones y normalizacion
3. Guardar y recuperar desde localStorage
4. Mostrar feedback de exito y errores

### Fase 4 - Plus visual
1. Implementar modo oscuro completo
2. Integrar animaciones con Framer Motion
3. Ajustar responsive y accesibilidad

### Fase 5 - Testing y hardening
1. Pruebas unitarias por modulo
2. Pruebas de integracion ligera
3. Ajuste de cobertura objetivo
4. Correccion de defectos

### Fase 6 - Documentacion y entrega
1. Redactar README tecnico
2. Agregar decisiones de arquitectura
3. Configurar gh-pages para deploy
4. Publicar y validar URL final

## 11. Configuracion de Deploy con gh-pages

### 11.1 Requisitos previos
- Repositorio publico
- rama main actualizada
- package gh-pages instalado

### 11.2 Pasos de configuracion
1. Configurar base en Vite para repo
2. Definir scripts build, predeploy y deploy
3. Ejecutar despliegue inicial
4. Activar GitHub Pages en gh-pages branch
5. Verificar URL publica

## 12. Mapa de Skills a utilizar

- frontend-design:
  - direccion visual de alto nivel
  - componentes y layout no genericos
- tailwind-design-system:
  - tokens, variantes y coherencia del sistema visual
- vercel-react-best-practices:
  - performance de render y asincronia
- redux-toolkit:
  - estructura de estado escalable y tipada
- typescript-advanced-types:
  - tipos robustos, utilitarios y contratos claros
- javascript-typescript-jest:
  - estrategia de pruebas unitarias y mocks
- dark-mode-implementer:
  - modo oscuro persistente y sin flash
- framer-motion-animator:
  - animaciones de entrada, salida y microinteraccion
- web-design-guidelines:
  - checklist de accesibilidad y UX final
- gh-pages-deploy:
  - publicacion en GitHub Pages

## 13. Riesgos y Mitigaciones

- Riesgo: API mock con esquema inconsistente
  - Mitigacion: adaptador de datos + tests de contrato

- Riesgo: re-renders excesivos en filtros
  - Mitigacion: memoizacion en selectores y componentes

- Riesgo: errores de hidratacion en tema oscuro
  - Mitigacion: inicializacion temprana del tema y pruebas

- Riesgo: baja cobertura de pruebas
  - Mitigacion: matriz de pruebas obligatoria por modulo

## 14. Checklist final de aceptacion

- Cumple todos los requerimientos funcionales
- Cumple stack tecnico solicitado
- Incluye pruebas unitarias relevantes
- UI responsive y visualmente consistente
- Codigo limpio, tipado estricto, sin any
- Deploy publicado y funcionando
- README con ejecucion local y decisiones tecnicas

---

Este documento define la planeacion completa previa al desarrollo.
No iniciar implementacion hasta aprobar este plan.