import img from '../images/vista1.jpg';
import { register } from '../lib/index.js';


function registro(navigateTo){
    const section = document.createElement('section')
    const image =document.createElement('img');
    const buttonRetorn = document.createElement('button');
    const box =document.createElement('div')
    const title =document.createElement('h2')
    const formReg = document.createElement('form');
    const inputName = document.createElement('input');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    inputPass.type ='password';
    const buttonLogin = document.createElement('button');
    
    formReg.classList.add('formRegister');
    
    box.setAttribute("id", "boxL");
    inputName.setAttribute("id", "name");
    inputEmail.setAttribute("id", "mail");
    inputPass.setAttribute("id", "passw");


    image.src =img;
    title.textContent = 'Valusic';
    inputName.placeholder='Nombre';
    inputEmail.placeholder="Correo electrónico";
    inputPass.placeholder="Contraseña";
    buttonLogin.textContent ='Registrarme';
    buttonRetorn.textContent = 'home';


    buttonRetorn.addEventListener('click', function(){
        navigateTo('/');
    })
    buttonLogin.addEventListener('click',function(){
        let email =inputEmail.value;
        let passwrd = inputPass.value;
        if (register(email, passwrd)){
           // console.log(email);
            //console.log(passwrd);
            navigateTo('/login');
            alert('te has registrado satisfactoriamente')
        };
    })
    section.append(image, buttonRetorn, box, title,formReg,inputName, inputEmail, inputPass, buttonLogin);
    return section;

}



export default registro;