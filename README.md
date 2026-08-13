# ReVuelta · Marketplace y Transacciones (Equipo 2)

Frontend en React (Vite) para el módulo **Marketplace y Transacciones** de ReVuelta.
Kit de marca completo: https://re-vuelta.vercel.app/#kit

## Historias de usuario de este equipo

| HU | Archivo(s) |
|---|---|
| MKT-CR01 — Carrito | `src/pages/Carrito.jsx`, `src/data/carritoMock.js` |
| MKT-TR01 — Mis Trueques | `src/pages/MisTrueques.jsx`, `src/data/truequesMock.js` |
| MKT-TR02 — Ventana Modal Detalle Trueque | `src/components/trueques/VentanaModalDetalleTrueque.jsx` |
| MKT-R01 — Registro | `src/pages/Registro.jsx` |
| MKT-L01 — Inicio de sesión | `src/pages/InicioSesion.jsx`, `src/data/authMock.js` |

> Fuente del alcance: PDF "Historias de Usuario Frontend" — sección "Equipo Marketplace
> y Transacciones". El link del kit de marca (re-vuelta.vercel.app) solo se usó para
> tomar colores y tipografías, no el reparto de equipos.

## Cómo levantar el proyecto

```bash
npm install
npm run dev
```

Vite levanta el servidor en `http://localhost:5173` por defecto.

## Convenciones del equipo

- Carpeta de componentes: **`components`** (todo en minúscula, para no chocar en el merge).
- **Por ahora no se reutilizan componentes entre historias** (decisión de Andrés, por tiempo).
  Cada HU tiene su propia carpeta dentro de `components/` (`carrito/`, `trueques/`, `registro/`, `login/`).
  Si más adelante se decide reutilizar, se refactoriza en una segunda pasada.
- Ramas: una por historia, saliendo de `develop`:
  `feature/marketplace/HU-XX-nombre-corto` (ej. `feature/marketplace/MKT-CR01-carrito`).
- Commits: Conventional Commits, ej. `feat(marketplace): agregar resumen de pedido en carrito`.
- Mientras no exista backend: los datos "quemados" viven en `src/data/*.js`. Al integrar,
  se reemplazan por llamadas Axios (`src/services/api.js`) sin cambiar la estructura visual
  de los componentes — así lo pide cada HU del PDF.
- Autenticación: mientras no exista el módulo real de Auth, `src/data/authMock.js` simula
  el mismo contrato (`usuario`, `autenticado`, `iniciarSesion`, `cerrarSesion`) que se usará
  después, para no tener que tocar las páginas cuando llegue el backend.

## Estructura

```
src/
  components/
    carrito/
    trueques/
    registro/
    login/
  pages/
    Carrito.jsx
    MisTrueques.jsx
    Registro.jsx
    InicioSesion.jsx
  data/            # mocks (.js) por historia
  services/
    api.js         # instancia de Axios centralizada
  styles/
    variables.css  # colores y tipografías del kit de marca
```

## Kit de marca (resumen)

**Colores** (`src/styles/variables.css`): `--ink #15201B` · `--pine #1F5E4A` (primario) ·
`--moss #3E9C7A` · `--marigold #F2A03D` · `--clay #E8643C` · `--paper #F6F2E9` ·
`--paper-2 #EFE9DC` · `--line #DED6C5`.

**Tipografías** (cargadas por Google Fonts en `index.html`): Fraunces (titulares),
Plus Jakarta Sans (cuerpo/UI), Space Mono (etiquetas técnicas).

## Marketplace y Transacciones

Implementación frontend con datos mockeados de:
- MKT-CR01 — Carrito
- MKT-TR01 — Mis Trueques
- MKT-TR02 — Ventana Modal Detalle Trueque

Ejecutar desde VS Code:

```bash
npm install
npm run dev
```

Rutas principales: `/carrito` y `/mis-trueques`.
