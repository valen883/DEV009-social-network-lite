import img from '../images/vista1.jpg';

function home(navigateTo) {
    const section = document.createElement('section')
    const buttonLog = document.createElement('button');
    const buttonReg = document.createElement('button');
    buttonLog.setAttribute("id", "idPrueba");
    const image =document.createElement('img');
    image.src =img;

    buttonLog.textContent = 'Iniciar sesión';
    buttonReg.textContent = 'Registrarme'
    buttonLog.addEventListener('click', ()=> {
        navigateTo('/login');
    });
    buttonReg.addEventListener('click', () =>{
        navigateTo('/registro');
    })

    section.append( image,buttonLog, buttonReg);
    return section;
}

export default home;