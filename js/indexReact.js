//Elemento generico para crear botones / u otros
let element = {
  type: null,
  class: null,
  clic: null,
  name: null
};

//Creo titulo
element = {type: 'h1', class: 'titv2', clic: null, name: 'DAILY TASKS'}
createElementsGeneric("title",element)

//Creo subtitulo
element = {type: 'p', class: 'subtiv2', clic: null, 
           name: 'This is the website that gives you the chance to MAKE IT easy...'}
createElementsGeneric("subtitle",element)

//Creo hora v2
setTimeout(function() {
                      setInterval(tick, 1000);
                      } ,2000);          

function tick(){
element = {type: 'h1', class: 'hour', clic: null, name: new Date().toLocaleString()}
createElementsGeneric("hour",element)
}

//Habilitar el input al ratito
setTimeout(function()
{
textBox = document.getElementById("idtask");
textBox.disabled = false;
textBox.focus();  
},2000)

//Creo Save
element = {type: 'button', class: 'buttonSave', clic: saveTask, name: 'SAVE'}
createElementsGeneric("saveID",element)

//Creo Reset
element = {type: 'button', class: 'buttonReset', clic: reload, name: 'Reset'}
createElementsGeneric("resetID",element)

//Funcion generica para crear elementos (1)
function createElementsGeneric(dataEleByID, element) 
{
  const mynodo = document.getElementById(dataEleByID);
  const myroot = ReactDOM.createRoot(mynodo);
  myroot.render(React.createElement(createMyElement,element))
}

//Funcion generica que RETORNA el elemento (2)
function createMyElement(elem)
{
  return React.createElement(
    elem.type,
    {
      className: elem.class
      ,onClick: () => {elem.clic();}
    },
    elem.name
  ); 
}
