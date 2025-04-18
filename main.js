console.log('Hello world!');

const URL = 'https://api.thecatapi.com/v1/images/search';

const getCat = async () => {
  const res = await fetch(URL);
  const data = await res.json();
  const img = document.querySelector('img');
  img.src = data[0].url;
};

const button = document.querySelector('button');
button.addEventListener('click', getCat);
getCat();
