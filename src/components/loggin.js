import img from '../images/vista1.jpg';
import { login } from '../lib/index.js';

function loggin(navigateTo) {
    const section = document.createElement('section')
    const image =document.createElement('img');
    const box =document.createElement('div')
    const title =document.createElement('h2')
    const formLog = document.createElement('form');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const buttonLogin = document.createElement('button');
    const buttonRetorn = document.createElement('button');
    
    formLog.classList.add('formLog');

    box.setAttribute("id", "boxL");
    buttonLogin.setAttribute("id", "botonInicio");
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
    buttonLogin.addEventListener('click', function(a){
        a.preventDefault();
        let email = inputEmail.value;
        let passwrd = inputPass.value;
        if (login(email, passwrd)){
             navigateTo('/inicio');
         };
    })

    formLog.append(inputEmail, inputPass, buttonLogin);

    section.append(image,box,title,formLog, buttonRetorn);
    return section;
}

export default loggin;