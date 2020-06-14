

///COnstructor para seguro

function Seguro(marca, anio, tipo)
{
    this.marca=marca;
    this.anio=anio;
    this.tipo=tipo
}

Seguro.prototype.cotizarSeguro=function(seguro)
{
    // console.log(seguro);

    let cantidad;
    const base=2000;
    

    switch (seguro.marca) {
        case '1':
            cantidad=base*1.15;
            break;
        case '2':
            cantidad=base*1.05;
        break;

        case '3':
            cantidad=base*1.35;
            break;   

        
    }

    //dierencia e anio
 
    const diferencia=new Date().getFullYear()- seguro.anio;
  
    
    cantidad-=((diferencia*3)*cantidad)/100;
   
    //si el serguro es basico 30% si es completo 50% +

    if(seguro.tipo=='basico'){
        cantidad*= 1.30;
    }
    else{
        cantidad*=1.50;
    }


    console.log(cantidad);

    return cantidad;



    
}

//para los objetos visuales
function Interfaz(){}
//mensaje que imprime en html
Interfaz.prototype.mostrarError=function(mensaje,tipo)
{
    const div =document.createElement('div');
    if(tipo=='error')
    {
        div.classList.add('mensaje','error')   
    }
    else
    {
        div.classList.add('mensaje','correcto')
    }

    div.innerHTML=`
        ${mensaje}
    `;

    formulario.insertBefore(div,document.querySelector('.form-group'))

    setTimeout(function()
    {
        document.querySelector('.mensaje').remove()
    },3000);
}

//mostrar
Interfaz.prototype.mostrarResultado=function(seguro,total)
{
    const resultado=document.getElementById('resultado');
    let marca;

    switch(seguro.marca)
    {
        case '1':
            marca="Americana";
        break;

        case '2':
            marca="Asiatico";
        break;

        case '3':
            marca="Europeo";
        break;
    }

    //crer div\
    const div =document.createElement('div');
    //insertar info
    div.innerHTML=`
        <p class='header'>Tu Resumen:</p>
        Marca: ${marca}
        <br>
        Anio: ${seguro.anio}<br>
        Tipo: ${seguro.tipo}<br>
        Total: ${total}
    `;

    const spinner=document.querySelector('#cargando img');
    spinner.style.display='block';

    setTimeout(function(){
        spinner.style.display='none'
    },3000
    );

    resultado.appendChild(div);
}



//eventos escuchados
const formulario=document.getElementById('cotizar-seguro')

formulario.addEventListener('submit',function(e){
    e.preventDefault();
    alert('ya')
    const marca=document.getElementById("marca")
    const marcaSeleccionada=marca.options[marca.selectedIndex].value

   const anio=document.getElementById('anio')
   const selectAnio=anio.options[anio.selectedIndex].value
    
   //radio
        const tipo=document.querySelector("input[name='tipo']:checked").value
//    console.log(selectAnio);

    //crer instancia de interfaz

    const interfaz=new Interfaz();

    //revisamos que campo no este vacio
    if(marcaSeleccionada=='' || selectAnio=='' || tipo==''){
        
        interfaz.mostrarError('Faltan datos, revisa el formulario y prueba denuevo','error')
        
    }
    else{
       //limpiar resultados anteriores
       const resultado=document.querySelector('#resultado div');

       if(resultado){
           resultado.remove();
       }
       
        //instancioar seguro y mostrar interfaz
       const seguro=new Seguro(marcaSeleccionada,selectAnio,tipo)

       const cantidad=seguro.cotizarSeguro(seguro);

       //mostrar resultado
       interfaz.mostrarError('Cotizando','bien')

       interfaz.mostrarResultado(seguro, cantidad);
       
        
    }
   
    
});


//obtener minimo a;io y maximo
const max =new Date().getFullYear(),
        min=max-20;

        // console.log(max);
        // console.log(min);
const selectAnios=document.getElementById('anio');
for (let i=max;  i>=min; i--) {
    
    let option=document.createElement('option')
    option.value=i;
    option.innerHTML=i;
    selectAnios.appendChild(option)
}

        