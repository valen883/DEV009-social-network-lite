import img from '../images/fondo.jpg'
import { createPost, getLoggedInUser } from '../lib/services.js';


function inicio(){
    const section = document.createElement('section')
    const image =document.createElement('img');
    const title= document.createElement('h3');
    const boxName =document.createElement('div')
    const inputPost = document.createElement('input');
    const boxPublic =document.createElement('button')
    
    
    image.src =img;
    inputPost.type ='text';
    
    boxName.setAttribute("id", "boxName");
    inputPost.setAttribute("id", "post");
    boxPublic.setAttribute("id", "botonPublic");

    boxName.textContent = getLoggedInUser();
    title.textContent ='Valusic';
    inputPost.placeholder ='¿En qué estas pensando?';
    boxPublic.textContent = 'Publicar';
    

    boxPublic.addEventListener('click', function(){
        let texto = inputPost.value
        console.log( texto);
        console.log(getLoggedInUser());
        createPost(texto, getLoggedInUser().email )

        post +=`<input>${texto}</input>`

        post.innerHTML  += post
        return post
    })

    section.append(image, title, boxName, inputPost, boxPublic);
    return section;
}


export default inicio;