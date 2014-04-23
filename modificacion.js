function trim(value) {
  var temp = value;
  var obj = /^(\s*)([\W\w]*)(\b\s*$)/;
  if (obj.test(temp)) { temp = temp.replace(obj, '$2');}
  var obj = /  /g;
  while (temp.match(obj)) { temp = temp.replace(obj, " ");}
  return temp;
}

//Funcion para calcular el largo en pixels det texto dado
function getTextWidth(texto){
  //Valor por default : 150 pixels
  var ancho = 150;

  if(trim(texto) == "")
  {
    return ancho;
  }

  //Creación de un span escondido que se puedá medir
  var span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.position = "absolute";

  //Se agrega el texto al span y el span a la página
  span.appendChild(document.createTextNode(texto));
  document.getElementsByTagName("body")[0].appendChild(span);

  //tamaño del texto
  ancho = span.offsetWidth;

  //Eliminación del span
  document.getElementsByTagName("body")[0].removeChild(span);
  span = null;

  return ancho;
}


//Funcion de modificacion del elemento seleccionado mediante doble-click
function modificar(obj){
  //Objeto que sirve para editar el valor en la pagina
  var input = null;

  input = document.createElement("input");


  //Asignar en la caja el valor de la casilla
  if (obj.innerText)
  input.value = obj.innerText;
  else
  input.value = obj.textContent;
  input.value = trim(input.value);

  //a la caja INPUT se la asigna un tamaño un poco mayor que el texto a modificar
  input.style.width  = getTextWidth(input.value) + 30 + "px";

  //Se remplaza el texto por el objeto INPUT
  obj.replaceChild(input, obj.firstChild);

  //Se selecciona el elemento y el texto a modificar
  input.focus();
  input.select();

  //Asignación de los 2 eventos que provocarón la escritura en la base de datos

  //Salida de la INPUT
  input.onblur = function salir(){
    salvarMod(obj, input.value);
    delete input;
  };

  //La tecla Enter
  input.onkeydown = function keyDown(event){
    if(event.keyCode == 13){
      salvarMod(obj, input.value);
      delete input;
    }
  };
}


//Salvando las modificaciones
function salvarMod(obj, valor){
  var key = obj.id;
  console.log(obj.id);

  var value = valor;
  console.log(valor);

  var request = new XMLHttpRequest();
  request.open('POST', 'submit.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send("key=" + key +"&value=" + value);

  obj.replaceChild(document.createTextNode(valor), obj.firstChild);
}
