import img from '../images/fondo.jpg'
import { createPost, getLoggedInUser, getPosts } from '../lib/services.js';


function inicio(){
    const section = document.createElement('section');
    const image =document.createElement('img');

    const header =document.createElement('header');
    const title= document.createElement('h3');
    const boxName =document.createElement('div');

    const main= document.createElement('main');
    const formPost= document.createElement('form');
    const inputPost = document.createElement('input');
    const boxPublic =document.createElement('button');
    const divPost = document.createElement('div');
    
    
    image.src =img;
    inputPost.type ='text';
    
    boxName.setAttribute("id", "boxName");
    inputPost.setAttribute("id", "post");
    boxPublic.setAttribute("id", "botonPublic");

    boxName.textContent = getLoggedInUser().email.slice(0, 10);
    title.textContent ='Valusic';
    inputPost.placeholder ='¿En qué estas pensando?';
    boxPublic.textContent = 'Publicar';
    
    function display(){
        console.log(getPosts());
        getPosts().forEach(post => {
                    const divPublic = document.createElement('article');
            
                    divPublic.innerHTML  += ` <h4>${post.email.slice(0, 10)}</h4>
                    <p>${post.content}</p>`
                    divPost.append(divPublic);
        });
    }
    display();

    boxPublic.addEventListener('click', function(a){
        a.preventDefault();
        const texto = inputPost.value
        console.log( texto);
        console.log(getLoggedInUser());
        createPost(texto, getLoggedInUser().email )
        display();
    })

    header.append(title, boxName);
    main.append(formPost, divPost);
    formPost.append(inputPost, boxPublic);
    section.append(image,header, main);
    return section;
}


export default inicio;