function login(navigateTo) {
    const section = document.createElement('section')
    const title = document.createElement('h2')
    const buttonRetorn = document.createElement('button');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const buttonLogin = document.createElement('button');

    inputEmail.placeholder="Escribe tu email";
    inputPass.placeholder="Contraseña";

    title.textContent = 'login';
    buttonLogin.textContent ='Iniciar sesión';

    buttonRetorn.textContent = 'home';
    buttonRetorn.addEventListener('click', function(){
        navigateTo('/');
    })
    section.append(title,inputEmail, inputPass,buttonLogin, buttonRetorn);
    return section;
}

export default login;