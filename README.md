# 🎬 Buscador de Películas

Aplicación web para buscar películas, ver detalles y gestionar favoritos. Desarrollada con JavaScript vanilla, Bootstrap y la API de OMDb.

## 📸 Vista previa

> Próximamente

## 🚀 Funcionalidades

- 🔍 Búsqueda de películas por nombre usando la API de OMDb
- 🎴 Visualización de resultados con póster, título y año
- ⭐ Agregar y eliminar películas de favoritos
- 💾 Favoritos persistentes con localStorage
- 📅 Filtro por año en resultados y favoritos
- 🎬 Modal de detalle con información completa:
  - Rating con barra de progreso
  - Géneros como badges
  - Director, actores, país, duración y taquilla
  - Sinopsis completa
  - Botón para agregar a favoritos directo desde el modal

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript vanilla (ES6+)
- Bootstrap 5.3
- [OMDb API](https://www.omdbapi.com/)

## 📁 Estructura del proyecto
buscador-de-peliculas/
├── index.html
├── style.css
└── script.js

## ⚙️ Cómo ejecutarlo

1. Clona el repositorio:
```bash
git clone https://github.com/ElAngelNegro/buscador-de-peliculas.git
```

2. Obtén tu API key gratuita en [omdbapi.com](http://www.omdbapi.com/apikey.aspx)

3. En `script.js` reemplaza la API key:
```javascript
const API_KEY = 'TU_API_KEY';
```

4. Abre `index.html` en tu navegador.

## 📌 Conceptos aplicados

- Manipulación del DOM con JavaScript vanilla
- Consumo de API REST con `fetch` y `async/await`
- Manejo de errores con `try/catch`
- Persistencia de datos con `localStorage`
- Diseño responsive con Bootstrap 5

## 👨‍💻 Autor

**ElAngelNegro**  
[GitHub](https://github.com/ElAngelNegro)