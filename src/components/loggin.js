import img from '../images/vista1.jpg';
import { login } from '../lib/index.js';

function loggin(navigateTo) {
    const section = document.createElement('section')
    const image =document.createElement('img');
    const box =document.createElement('div')
    const title =document.createElement('h2')
    const formReg = document.createElement('form');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const buttonLogin = document.createElement('button');
    const buttonRetorn = document.createElement('button');
    
    formReg.classList.add('formLog');

    box.setAttribute("id", "boxL");
    inputEmail.setAttribute("id", "mail");
    inputPass.setAttribute("id", "passw");
    
    inputPass.type ='password';
    image.src =img;


    inputEmail.placeholder="Escribe tu email";
    inputPass.placeholder="Contraseña";
    title.textContent = 'Valusic';
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


    section.append(image,box,title,formReg, inputEmail, inputPass,buttonLogin, buttonRetorn);
    return section;
}

export default loggin;