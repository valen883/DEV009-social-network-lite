import img from '../images/vista1.jpg';

function home(navigateTo) {
    const section = document.createElement('section')
    const buttonLog = document.createElement('button');
    const image =document.createElement('img');
    image.src =img;

    buttonLog.textContent = 'Iniciar sesión';
    buttonLog.addEventListener('click', ()=> {
        navigateTo('/login');
    });


    section.append( image,buttonLog,);
    return section;
}

export default home;