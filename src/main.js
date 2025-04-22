const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=10';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.getElementById('error');
const API_KEY =
  'live_mhsnlAKdtvh1lt3fV2AM5ihT0XIIoUUmUClhOKJxm2j3Y7rk3le4Gl3epcEv5op3';

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random');
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = 'Hubo un error: ' + res.status;
  } else {
    const section = document.getElementById('randomMichisGrid');
    section.innerHTML = '';

    data.forEach((michi) => {
      const article = document.createElement('article');
      article.classList.add('michi-card');

      const img = document.createElement('img');
      img.src = michi.url;
      img.alt = 'Foto gatito aleatorio';
      img.width = 300;

      const btn = document.createElement('button');
      btn.textContent = 'Guardar michi en favoritos';
      btn.onclick = () => saveFavoriteMichis(michi.id);

      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function loadFavoritesMichis() {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
    },
  });
  const data = await res.json();
  console.log('Favoritos');
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = 'Hubo un error: ' + res.status;
  } else {
    const section = document.getElementById('favoriteMichis');
    section.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = 'Michis favoritos';
    section.appendChild(h2);

    const grid = document.createElement('div');
    grid.classList.add('michi-grid');

    data.forEach((michi) => {
      const article = document.createElement('article');
      article.classList.add('michi-card');

      const img = document.createElement('img');
      img.src = michi.image.url;
      img.width = 150;

      const btn = document.createElement('button');
      btn.textContent = 'Eliminar michi de favoritos';
      btn.onclick = () => deleteFavoriteMichi(michi.id);

      article.appendChild(img);
      article.appendChild(btn);
      grid.appendChild(article);
    });

    section.appendChild(grid);
  }
}

async function saveFavoriteMichis(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
    body: JSON.stringify({ image_id: id }),
  });

  console.log('Save');
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = 'Hubo un error: ' + res.status;
  } else {
    console.log('Michi guardado en Favoritos');
    loadFavoritesMichis();
  }
}

async function deleteFavoriteMichi(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': API_KEY,
    },
  });

  if (res.status !== 200) {
    spanError.innerHTML = 'Hubo un error: ' + res.status;
  } else {
    console.log('Michi eliminado de Favoritos');
    loadFavoritesMichis();
  }
}

async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm');
  const formData = new FormData(form);

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      'X-API-KEY': API_KEY,
    },
    body: formData,
  });

  const data = await res.json();

  if (res.status !== 201) {
    spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`;
  } else {
    console.log('Foto de michi cargada :)');
    console.log(data);
    saveFavoriteMichis(data.id);
  }
}

loadRandomMichis();
loadFavoritesMichis();
