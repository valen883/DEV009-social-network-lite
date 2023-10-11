import img from '../images/fondo.jpg';
import {
  createPost, getLoggedInUser, getPosts, deletePost, editPost, logout,
}
from '../lib/services.js';

function inicio(navigateTo) {
  const section = document.createElement('section');
  const image = document.createElement('img');

  const header = document.createElement('header');
  const title = document.createElement('h3');
  const boxName = document.createElement('div');

  const main = document.createElement('main');
  const formPost = document.createElement('form');
  const inputPost = document.createElement('input');
  const boxPublic = document.createElement('button');
  const divPost = document.createElement('div');

  const botonOut = document.createElement('button');

  image.src = img;
  inputPost.type = 'text';

  boxName.setAttribute('id', 'boxName');
  inputPost.setAttribute('id', 'post');
  boxPublic.setAttribute('id', 'botonPublic');
  divPost.setAttribute('id', 'dPost');
  botonOut.setAttribute('id', 'longOut');

  boxName.textContent = getLoggedInUser().email.slice(0, 10);
  title.textContent = 'Valusic';
  inputPost.placeholder = '¿En qué estas pensando?';
  boxPublic.textContent = 'Publicar';
  botonOut.textContent = '❎';

  function display() {
    divPost.innerHTML = '';
    getPosts().forEach(post => {
      const divPublic = document.createElement('article');
      // console.log(post)
      divPublic.innerHTML += ` <h4>${post.email.slice(0, 10)}</h4>
                  <p class="contenido" id="${post.id}">${post.content}</p>
                  <button class="deletePost" value="${post.id}">🗑</button>
                  <button class="editPost" value="${post.id}">🖊</button>`;

      divPost.append(divPublic);
    });

    const btnDelete = document.querySelectorAll('.deletePost');
    // console.log(btnDelete)
    btnDelete.forEach(btn => {
      btn.addEventListener('click', function () {
        console.log('funciona' + btn.value);
        deletePost(btn.value);
        display();
      });

    });
    const btnEdit = document.querySelectorAll('.editPost');
    const post = document.querySelectorAll('.contenido');
    btnEdit.forEach(btn => {

      btn.addEventListener('click', function () {
        console.log('funciona');
        post.forEach(texto => {
          if (texto.id === btn.value) {
            const ventana = prompt('editar post', texto.textContent);
            console.log(ventana);
            editPost(texto.id, ventana);

    display();
          }
        });
          });
    });

    botonOut.addEventListener('click', function () {
      console.log('funciona');
      logout();
      navigateTo('/');
    });
  }

  display();

  boxPublic.addEventListener('click', function (a) {
    a.preventDefault();
    const texto = inputPost.value;
    console.log(texto);
    console.log(getLoggedInUser());
    createPost(texto, getLoggedInUser().email);

    inputPost.value = '';

    display();

  });

  header.append(title, boxName);
  main.append(formPost, divPost);
  formPost.append(inputPost, boxPublic);

  section.append(image, header, main, botonOut);
  return section;
}

export default inicio;