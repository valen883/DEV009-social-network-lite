import img from '../images/fondo.jpg'


function inicio(){
    const section = document.createElement('section')
    const image =document.createElement('img');
        image.src =img;
    
    
    
    
    
    
    
    section.append(image);
    return section;
}


export default inicio;