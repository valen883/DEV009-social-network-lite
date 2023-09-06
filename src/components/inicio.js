import img from '../images/fondo.jpg'


function inicio(){
    const section = document.createElement('section')
    const image =document.createElement('img');
    image.src =img;
    const title= document.createElement('h3');
    const boxName =document.createElement('div')
    boxName.setAttribute("id", "boxName");
    
    
    title.textContent ='Valusic';
    
    section.append(image, title, boxName, );
    return section;
}


export default inicio;