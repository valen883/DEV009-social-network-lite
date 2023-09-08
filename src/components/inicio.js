import img from '../images/fondo.jpg'


function inicio(){
    const section = document.createElement('section')
    const image =document.createElement('img');
    image.src =img;
    const title= document.createElement('h3');
    const boxName =document.createElement('div')
    boxName.setAttribute("id", "boxName");
    const inputPost = document.createElement('input');
    inputPost.setAttribute("id", "post");
    inputPost.type ='text';
    
    
    title.textContent ='Valusic';
    inputPost.placeholder ='¿En qué estas pensando?';
    
    section.append(image, title, boxName, inputPost);
    return section;
}


export default inicio;