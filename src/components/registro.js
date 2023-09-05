import img from '../images/vista1.jpg';
import { register } from '../lib/index.js';


function registro(navigateTo){
    const section = document.createElement('section')
    const image =document.createElement('img');
        image.src =img;
    const buttonRetorn = document.createElement('button');
    
    const box =document.createElement('div')
    box.setAttribute("id", "boxL");
    const title =document.createElement('h2')
    const inputName = document.createElement('input');
    inputName.setAttribute("id", "name");
    const inputEmail = document.createElement('input');
    inputEmail.setAttribute("id", "mail");
    const inputPass = document.createElement('input');
    inputPass.setAttribute("id", "passw");
    const buttonLogin = document.createElement('button');

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
        let mail =inputEmail.value;
        let passwrd = inputPass.value;
        register(mail, passwrd);
    })
    section.append(image, buttonRetorn, box, title,inputName, inputEmail, inputPass, buttonLogin);
    return section;

}



export default registro;