import img from '../images/fondo.jpg'


function inicio(){
    const section = document.createElement('section')
    const image =document.createElement('img');
        image.src =img;
    const box =document.createElement('div')
    box.setAttribute("id", "boxI");

    
    
    
    
    
    
    section.append(image,box,);
    return section;
}


export default inicio;