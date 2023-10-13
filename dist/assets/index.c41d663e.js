(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
const img$1 = "/DEV009-social-network-lite/assets/vista1.55f971d3.jpg";
function home(navigateTo2) {
  const section = document.createElement("section");
  const buttonLog = document.createElement("button");
  const buttonReg = document.createElement("button");
  const image = document.createElement("img");
  buttonLog.setAttribute("id", "botonInicio");
  buttonReg.setAttribute("id", "botonR");
  image.src = img$1;
  buttonLog.textContent = "Iniciar sesi\xF3n";
  buttonReg.textContent = "Registrarme";
  buttonLog.addEventListener("click", () => {
    navigateTo2("/login");
  });
  buttonReg.addEventListener("click", () => {
    navigateTo2("/registro");
  });
  section.append(image, buttonLog, buttonReg);
  return section;
}
const login = (email, password) => {
  const usersStr = localStorage.getItem("users");
  if (usersStr) {
    const users = JSON.parse(usersStr);
    const user = users.find((user2) => user2.email === email && user2.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
  } else {
    return false;
  }
};
const getLoggedInUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  } else {
    return null;
  }
};
const logout = () => {
  localStorage.removeItem("user");
};
const register = (email, password) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  let users = [];
  const usersStr = localStorage.getItem("users");
  if (usersStr) {
    users = JSON.parse(usersStr);
  }
  const user = users.find((user2) => user2.email === email);
  if (user) {
    throw new Error("User already exists");
  } else {
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  }
};
const getPosts = () => {
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    return JSON.parse(postsStr);
  } else {
    return [];
  }
};
const createPost = (content, email) => {
  console.log(content, email);
  if (content.length < 1) {
    throw new Error("Content must be at least 1 character long");
  }
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email");
  }
  const id = Math.random().toString(36).substr(2, 9);
  let posts = [];
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    posts = JSON.parse(postsStr);
  }
  posts.push({ id, content, email });
  localStorage.setItem("posts", JSON.stringify(posts));
  return id;
};
const editPost = (idPost, content) => {
  if (content.length < 1) {
    throw new Error("Content must be at least 1 character long");
  }
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    const posts = JSON.parse(postsStr);
    const post = posts.find((post2) => post2.id === idPost);
    if (post) {
      post.content = content;
      localStorage.setItem("posts", JSON.stringify(posts));
    } else {
      throw new Error("Post does not exist");
    }
  } else {
    throw new Error("Post does not exist");
  }
};
const deletePost = (idPost) => {
  const postsStr = localStorage.getItem("posts");
  if (postsStr) {
    const posts = JSON.parse(postsStr);
    const post = posts.find((post2) => post2.id === idPost);
    if (post) {
      const index = posts.indexOf(post);
      posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(posts));
    } else {
      throw new Error("Post does not exist");
    }
  } else {
    throw new Error("Post does not exist");
  }
};
function loggin(navigateTo2) {
  const section = document.createElement("section");
  const image = document.createElement("img");
  const box = document.createElement("div");
  const title = document.createElement("h2");
  const formLog = document.createElement("form");
  const inputEmail = document.createElement("input");
  const inputPass = document.createElement("input");
  const buttonLogin = document.createElement("button");
  const buttonRetorn = document.createElement("button");
  formLog.classList.add("formLog");
  box.setAttribute("id", "boxL");
  buttonLogin.setAttribute("id", "botonInicio");
  inputEmail.setAttribute("id", "mail");
  inputPass.setAttribute("id", "passw");
  buttonRetorn.setAttribute("id", "home");
  inputPass.type = "password";
  image.src = img$1;
  inputEmail.placeholder = "Escribe tu email";
  inputPass.placeholder = "Contrase\xF1a";
  title.textContent = "Valusic";
  buttonLogin.textContent = "Iniciar sesi\xF3n";
  buttonRetorn.textContent = "home";
  buttonRetorn.addEventListener("click", () => {
    navigateTo2("/");
  });
  buttonLogin.addEventListener("click", (a) => {
    a.preventDefault();
    const email = inputEmail.value;
    const passwrd = inputPass.value;
    if (login(email, passwrd)) {
      navigateTo2("/inicio");
    }
  });
  formLog.append(inputEmail, inputPass, buttonLogin);
  section.append(image, box, title, formLog, buttonRetorn);
  return section;
}
function error() {
  const title = document.createElement("h2");
  title.textContent = "Eror 404 page no found";
  return title;
}
function registro(navigateTo2) {
  const section = document.createElement("section");
  const image = document.createElement("img");
  const buttonRetorn = document.createElement("button");
  const box = document.createElement("div");
  const title = document.createElement("h2");
  const formReg = document.createElement("form");
  const inputName = document.createElement("input");
  const inputEmail = document.createElement("input");
  const inputPass = document.createElement("input");
  inputPass.type = "password";
  const buttonReg = document.createElement("button");
  formReg.classList.add("formRegister");
  box.setAttribute("id", "boxL");
  inputName.setAttribute("id", "name");
  inputEmail.setAttribute("id", "mail");
  inputPass.setAttribute("id", "passw");
  buttonReg.setAttribute("id", "botonRegistro");
  buttonRetorn.setAttribute("id", "home");
  image.src = img$1;
  title.textContent = "Valusic";
  inputName.placeholder = "Nombre";
  inputEmail.placeholder = "Correo electr\xF3nico";
  inputPass.placeholder = "Contrase\xF1a";
  buttonReg.textContent = "Registrarme";
  buttonRetorn.textContent = "home";
  buttonRetorn.addEventListener("click", () => {
    navigateTo2("/");
  });
  buttonReg.addEventListener("click", () => {
    const email = inputEmail.value;
    const passwrd = inputPass.value;
    if (register(email, passwrd)) {
      navigateTo2("/login");
      alert("te has registrado satisfactoriamente");
    }
  });
  formReg.append(inputName, inputEmail, inputPass, buttonReg);
  section.append(image, box, title, formReg, buttonRetorn);
  return section;
}
const img = "/DEV009-social-network-lite/assets/fondo.5895442c.jpg";
function inicio(navigateTo2) {
  const section = document.createElement("section");
  const image = document.createElement("img");
  const header = document.createElement("header");
  const title = document.createElement("h3");
  const boxName = document.createElement("div");
  const main = document.createElement("main");
  const formPost = document.createElement("form");
  const inputPost = document.createElement("input");
  const boxPublic = document.createElement("button");
  const divPost = document.createElement("div");
  const botonOut = document.createElement("button");
  image.src = img;
  inputPost.type = "text";
  boxName.setAttribute("id", "boxName");
  inputPost.setAttribute("id", "post");
  boxPublic.setAttribute("id", "botonPublic");
  divPost.setAttribute("id", "dPost");
  botonOut.setAttribute("id", "longOut");
  boxName.textContent = getLoggedInUser().email.slice(0, 10);
  title.textContent = "Valusic";
  inputPost.placeholder = "\xBFEn qu\xE9 estas pensando?";
  boxPublic.textContent = "Publicar";
  botonOut.textContent = "\u274E";
  function display() {
    divPost.innerHTML = "";
    getPosts().forEach((post2) => {
      const divPublic = document.createElement("article");
      divPublic.innerHTML += ` <h4>${post2.email.slice(0, 10)}</h4>
                  <p class="contenido" id="${post2.id}">${post2.content}</p>
                  <button class="deletePost" value="${post2.id}">\u{1F5D1}</button>
                  <button class="editPost" value="${post2.id}">\u{1F58A}</button>`;
      divPost.append(divPublic);
    });
    const btnDelete = document.querySelectorAll(".deletePost");
    btnDelete.forEach((btn) => {
      btn.addEventListener("click", function() {
        console.log("funciona" + btn.value);
        deletePost(btn.value);
        display();
      });
    });
    const btnEdit = document.querySelectorAll(".editPost");
    const post = document.querySelectorAll(".contenido");
    btnEdit.forEach((btn) => {
      btn.addEventListener("click", function() {
        console.log("funciona");
        post.forEach((texto) => {
          if (texto.id === btn.value) {
            const ventana = prompt("editar post", texto.textContent);
            console.log(ventana);
            editPost(texto.id, ventana);
            display();
          }
        });
      });
    });
    botonOut.addEventListener("click", function() {
      console.log("funciona");
      logout();
      navigateTo2("/");
    });
  }
  display();
  boxPublic.addEventListener("click", function(a) {
    a.preventDefault();
    const texto = inputPost.value;
    console.log(texto);
    console.log(getLoggedInUser());
    createPost(texto, getLoggedInUser().email);
    inputPost.value = "";
    display();
  });
  header.append(title, boxName);
  main.append(formPost, divPost);
  formPost.append(inputPost, boxPublic);
  section.append(image, header, main, botonOut);
  return section;
}
const root = document.getElementById("root");
const routes = [
  { path: "/", component: home },
  { path: "/login", component: loggin },
  { path: "/error", component: error },
  { path: "/registro", component: registro },
  { path: "/inicio", component: inicio }
];
const defaultRoute = "/";
function navigateTo(hash) {
  const route = routes.find((routeFind) => routeFind.path === hash);
  if (route && route.component) {
    window.history.pushState({}, route.path, window.location.origin + route.path);
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo("/error");
  }
}
window.onpopstate = () => {
  console.log("cambio");
  navigateTo(window.location.pathname);
};
navigateTo(window.location.pathname || defaultRoute);
