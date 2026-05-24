const API_KEY = '955570f0';
const URL_BASE = 'https://www.omdbapi.com/';

let favoritos = [];
let resultadosOriginales = [];

// ── BUSCAR ──────────────────────────────────────────────
async function buscarPeliculas() {
  const query = document.getElementById('input-buscar').value.trim();
  const resultadosDiv = document.getElementById('resultados');
  const mensaje = document.getElementById('mensaje');

  if (!query) {
    alert('Ingresa un título para buscar.');
    return;
  }

  mensaje.textContent = 'Buscando...';
  resultadosDiv.innerHTML = '';

  try {
    const response = await fetch(URL_BASE + '?apikey=' + API_KEY + '&s=' + encodeURIComponent(query));
    const data = await response.json();

    if (data.Response === 'False') {
      mensaje.textContent = 'No se encontraron resultados para "' + query + '".';
      return;
    }

    mensaje.textContent = '';
    resultadosOriginales = data.Search;
    renderizarResultados(data.Search);

  } catch (error) {
    mensaje.textContent = 'Error al conectar con la API.';
    console.error(error);
  }
}

// ── RENDERIZAR RESULTADOS ────────────────────────────────
function renderizarResultados(peliculas) {
  const contenedor = document.getElementById('resultados');
  contenedor.innerHTML = '';

  peliculas.forEach(pelicula => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = pelicula.Poster !== 'N/A' ? pelicula.Poster : 'https://via.placeholder.com/160x230?text=Sin+imagen';
    img.alt = pelicula.Title;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => verDetalle(pelicula));

    const info = document.createElement('div');
    info.className = 'card-info';

    const titulo = document.createElement('h3');
    titulo.textContent = pelicula.Title;

    const anio = document.createElement('p');
    anio.textContent = pelicula.Year;

    const btn = document.createElement('button');
    btn.textContent = '+ Favorito';
    btn.addEventListener('click', () => agregarFavorito(pelicula));

    info.appendChild(titulo);
    info.appendChild(anio);
    info.appendChild(btn);
    card.appendChild(img);
    card.appendChild(info);
    contenedor.appendChild(card);
  });
}

// ── FAVORITOS ────────────────────────────────────────────
function agregarFavorito(pelicula) {
  const yaExiste = favoritos.find(f => f.imdbID === pelicula.imdbID);
  if (yaExiste) {
    alert('"' + pelicula.Title + '" ya está en favoritos.');
    return;
  }
  favoritos.push(pelicula);
  guardarFavoritos();
  renderizarFavoritos();
}

function eliminarFavorito(imdbID) {
  favoritos = favoritos.filter(f => f.imdbID !== imdbID);
  guardarFavoritos();
  renderizarFavoritos();
}

function renderizarFavoritos() {
  const contenedor = document.getElementById('favoritos');
  const mensaje = document.getElementById('mensaje-favs');
  contenedor.innerHTML = '';

  if (favoritos.length === 0) {
    mensaje.textContent = 'No tienes favoritos aun.';
    return;
  }

  mensaje.textContent = '';

  favoritos.forEach(pelicula => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = pelicula.Poster !== 'N/A' ? pelicula.Poster : 'https://via.placeholder.com/160x230?text=Sin+imagen';
    img.alt = pelicula.Title;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => verDetalle(pelicula));

    const info = document.createElement('div');
    info.className = 'card-info';

    const titulo = document.createElement('h3');
    titulo.textContent = pelicula.Title;

    const anio = document.createElement('p');
    anio.textContent = pelicula.Year;

    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.style.background = '#555';
    btn.addEventListener('click', () => eliminarFavorito(pelicula.imdbID));

    info.appendChild(titulo);
    info.appendChild(anio);
    info.appendChild(btn);
    card.appendChild(img);
    card.appendChild(info);
    contenedor.appendChild(card);
  });
}

function renderizarFavoritosFiltrados(lista) {
  const contenedor = document.getElementById('favoritos');
  contenedor.innerHTML = '';

  lista.forEach(pelicula => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = pelicula.Poster !== 'N/A' ? pelicula.Poster : 'https://via.placeholder.com/160x230?text=Sin+imagen';
    img.alt = pelicula.Title;

    const info = document.createElement('div');
    info.className = 'card-info';

    const titulo = document.createElement('h3');
    titulo.textContent = pelicula.Title;

    const anio = document.createElement('p');
    anio.textContent = pelicula.Year;

    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.style.background = '#555';
    btn.addEventListener('click', () => eliminarFavorito(pelicula.imdbID));

    info.appendChild(titulo);
    info.appendChild(anio);
    info.appendChild(btn);
    card.appendChild(img);
    card.appendChild(info);
    contenedor.appendChild(card);
  });
}

// ── LOCAL STORAGE ────────────────────────────────────────
function guardarFavoritos() {
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

document.getElementById('modal-btn-favorito').addEventListener('click', () => {
  if (peliculaActual) {
    agregarFavorito(peliculaActual);
  }
});

function cargarFavoritos() {
  const guardados = localStorage.getItem('favoritos');
  if (guardados) {
    favoritos = JSON.parse(guardados);
    renderizarFavoritos();
  }
}

// ── FILTRO POR ANIO ──────────────────────────────────────
function filtrarPorAnio() {
  const anio = document.getElementById('input-anio').value.trim();

  if (!anio) {
    alert('Ingresa un año para filtrar.');
    return;
  }

  if (resultadosOriginales.length > 0) {
    const filtrados = resultadosOriginales.filter(p => p.Year.includes(anio));
    if (filtrados.length === 0) {
      document.getElementById('mensaje').textContent = 'No hay resultados para el año ' + anio + '.';
      document.getElementById('resultados').innerHTML = '';
    } else {
      document.getElementById('mensaje').textContent = '';
      renderizarResultados(filtrados);
    }
  }

  if (favoritos.length > 0) {
    const favsFiltrados = favoritos.filter(f => f.Year.includes(anio));
    if (favsFiltrados.length === 0) {
      document.getElementById('mensaje-favs').textContent = 'No hay favoritos del año ' + anio + '.';
      document.getElementById('favoritos').innerHTML = '';
    } else {
      document.getElementById('mensaje-favs').textContent = '';
      renderizarFavoritosFiltrados(favsFiltrados);
    }
  }
}

function limpiarFiltro() {
  document.getElementById('input-anio').value = '';
  document.getElementById('mensaje').textContent = '';
  renderizarResultados(resultadosOriginales);
  renderizarFavoritos();
}

// ── EVENTOS ──────────────────────────────────────────────
document.getElementById('btn-buscar').addEventListener('click', buscarPeliculas);
document.getElementById('btn-filtrar').addEventListener('click', filtrarPorAnio);
document.getElementById('btn-limpiar').addEventListener('click', limpiarFiltro);

document.getElementById('input-buscar').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') buscarPeliculas();
});

// ── DETALLE PELÍCULA ─────────────────────────────────────
let peliculaActual = null;

async function verDetalle(pelicula) {
  peliculaActual = pelicula;

  // Resetear modal
  document.getElementById('modal-titulo').textContent = 'Cargando...';
  document.getElementById('modal-poster').src = '';
  document.getElementById('modal-sinopsis').textContent = '';
  document.getElementById('modal-generos').innerHTML = '';
  document.getElementById('modal-barra').style.width = '0%';
  document.getElementById('modal-rating').textContent = '⭐ --';

  // Abrir modal
  const modal = new bootstrap.Modal(document.getElementById('modalPelicula'));
  modal.show();

  try {
    const response = await fetch(URL_BASE + '?apikey=' + API_KEY + '&i=' + pelicula.imdbID + '&plot=full');
    const data = await response.json();

    document.getElementById('modal-titulo').textContent = data.Title + ' (' + data.Year + ')';
    document.getElementById('modal-anio').textContent = data.Rated + ' • ' + data.Runtime;
    document.getElementById('modal-poster').src = data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=Sin+imagen';
    document.getElementById('modal-director').textContent = data.Director;
    document.getElementById('modal-actores').textContent = data.Actors;
    document.getElementById('modal-pais').textContent = data.Country;
    document.getElementById('modal-duracion').textContent = data.Runtime;
    document.getElementById('modal-taquilla').textContent = data.BoxOffice !== 'N/A' ? data.BoxOffice : 'No disponible';
    document.getElementById('modal-sinopsis').textContent = data.Plot;

    // Rating
    const rating = parseFloat(data.imdbRating);
    if (!isNaN(rating)) {
      document.getElementById('modal-rating').textContent = '⭐ ' + rating + '/10';
      document.getElementById('modal-barra').style.width = (rating * 10) + '%';
    }

    // Géneros como badges
    const generosDiv = document.getElementById('modal-generos');
    generosDiv.innerHTML = '';
    data.Genre.split(',').forEach(g => {
      const badge = document.createElement('span');
      badge.className = 'badge bg-danger me-1';
      badge.textContent = g.trim();
      generosDiv.appendChild(badge);
    });

  } catch (error) {
    document.getElementById('modal-titulo').textContent = 'Error al cargar el detalle.';
    console.error(error);
  }
}

cargarFavoritos();