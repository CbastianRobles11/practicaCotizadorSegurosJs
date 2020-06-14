const selected=document.getElementById('anio');
const formulario=document.getElementById('cotizar-seguro');


class Formulario
{
    constructor(marca,anio,tipo)
    {
        this.marca=marca;
        this.anio=anio;
        this.tipo=tipo
    }

    respuestas()
    {
        let pago,modelo, base=2000;

        pago=base;
        switch (this.marca) {
            case 1:
                pago=pago*1.35
                modelo='Americano'
            break;
            case 2:
                pago=pago*1.05
                modelo='Asiatico'
            break;
            case 3:
                pago=pago*1.95
                modelo='Europeo'
            break;
        
            default:
                break;
        }
        let a= new Date().getFullYear()-this.anio;
                
        pago=(pago*a*0.01)+pago;

        if(this.tipo=='basico')
        pago=(pago*.3)+pago
        else
        pago=(pago*.5)+pago

        const div=document.getElementById('resultado')
        const respuesta=document.createElement('div')

        respuesta.innerHTML=`
            <p class='header'>      Notaciones</p>
            <p>Modelo: ${modelo}</p>
            <p>Anio:   ${this.anio}</p>
            <p>Tipo:   ${this.tipo}</p>
            <p>Pago:   ${pago}</p>
        `
        respuesta.className='respuesta';



        div.appendChild(respuesta)


    }


}


class Interfaz
{

    mensaje(mensaje,tipo)
    {
        const div=document.createElement('div');

        div.innerHTML=`
            ${mensaje}
        `;
        div.classList.add('mensaje',tipo);

        
        let mensagge= formulario.insertBefore(div,document.querySelector('.form-group'));

        setTimeout(() => {
            mensagge.remove();
        }, 2000);
    }

}


formulario.addEventListener('submit',function (){

    //cerrar la respuesta

    let ff=document.querySelector('.respuesta');
    if(ff){
        ff.remove();
    }


    const marca=document.getElementById('marca');
  let m=marca.options[marca.selectedIndex].value 

    let a=selected.options[selected.selectedIndex].value
  
  const t=document.querySelector("input[name='tipo']:checked").value
    console.log(t);
  
    const interfaz=new Interfaz();
   

    if(m=='' || a=='' || t=='')
    {
        interfaz.mensaje('Flata llenar Formulario','error');
    }
    else
    {
        interfaz.mensaje('Procesando.....','correcto');

        const dato=new Formulario(m,a,t);

        let cargando=document.querySelector('#cargando  img')

        cargando.style.display='block'
        setTimeout(() => {
            cargando.style.display='none';
            let respuesta=dato.respuestas();

        }, 2000);

        


    }

})











//respecto al anio el selected

let present=new Date().getFullYear(),
    pass=present-20;



for (let i = present;  i>=pass ; i--) {
   
    const option=document.createElement('option')
    option.value=i;
    option.textContent=i;
    selected.appendChild(option) ;  
}





