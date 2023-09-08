import img from '../images/vista1.jpg';
import { login } from '../lib/index.js';

function loggin(navigateTo) {
    const section = document.createElement('section')
    const image =document.createElement('img');
    image.src =img;
    const box =document.createElement('div')
    box.setAttribute("id", "boxL");
    const title =document.createElement('h2')
    const buttonRetorn = document.createElement('button');
    const inputEmail = document.createElement('input');
    inputEmail.setAttribute("id", "mail");
    const inputPass = document.createElement('input');
    inputPass.type ='password';
    inputPass.setAttribute("id", "passw");
    const buttonLogin = document.createElement('button');

    title.textContent = 'Valusic';
    inputEmail.placeholder="Escribe tu email";
    inputPass.placeholder="Contraseña";

    buttonLogin.textContent ='Iniciar sesión';

    buttonRetorn.textContent = 'home';
    buttonRetorn.addEventListener('click', function(){
        navigateTo('/');
    })
    buttonLogin.addEventListener('click', function(){
        let email = inputEmail.value;
        let passwrd = inputPass.value;
        if (login(email, passwrd)){
             navigateTo('/inicio');
         };
    })


    section.append(image,box,title,inputEmail, inputPass,buttonLogin, buttonRetorn);
    return section;
}

export default loggin;