# Buscador de películas

Buscador de películas y series sobre la API de OMDb, con búsqueda mientras escribís, orden por título y listas personales de favoritas y de "ya vistas" para usuarios registrados.

**Demo:** _próximamente_

<!-- Agregá acá una captura: ![Buscador](docs/buscador.png) -->

## Funcionalidades

- Búsqueda con debounce de 300 ms para no llamar a la API en cada tecla.
- Orden alfabético opcional, calculado con `useMemo`.
- Mensajes claros para "sin resultados", "demasiados resultados" y errores de red.
- Registro e inicio de sesión con Supabase Auth; rutas protegidas para las listas.
- Favoritas y "ya vistas" por usuario, manejadas con Context API.

## Stack

| Capa | Tecnologías |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router 7 |
| UI | Tailwind CSS 4, shadcn/ui (Radix), lucide-react |
| Datos | OMDb API, Supabase Auth |
| Calidad | ESLint, Vitest, GitHub Actions |

## Estructura

```
src/
  services/movies.ts   llamada a OMDb y conversión al modelo de la app (con tests)
  hooks/               useMovies, useSearch, useFetch
  context/             sesión del usuario y listas de películas
  pages/               búsqueda, favoritas, ya vistas, login
  components/          tarjetas, header, formularios y componentes de shadcn/ui
```

## Correrlo localmente

Requisitos: Node 20 o superior, un proyecto de Supabase y una clave gratuita de [OMDb](https://www.omdbapi.com/apikey.aspx).

```bash
git clone https://github.com/GBBk/cat_pelis.git
cd cat_pelis
npm install
cp .env.example .env   # completar Supabase y OMDb
npm run dev
```

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Chequeo de tipos y build de producción |
| `npm run lint` | ESLint |
| `npm test` | Tests unitarios con Vitest |

## Deploy

Incluye `vercel.json` para que las rutas funcionen al recargar. En Vercel, importá el repo y cargá las tres variables de `.env.example`.

## Próximas mejoras

- Guardar favoritas y vistas en Supabase (hoy viven en `localStorage`) para sincronizarlas entre dispositivos.
- Página de detalle de cada película.
- Paginación de resultados.
