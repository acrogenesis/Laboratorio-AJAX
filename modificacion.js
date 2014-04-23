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

function getLastId(){
  var result = 0;
  request = new XMLHttpRequest();
  request.open('GET', 'lastID.php', false);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
      result = request.responseText;
      // console.log(result);
    }
  };
  request.send();

  return result;
}

//borrar row
function borrar(obj,id){
  var request = new XMLHttpRequest();
  request.open('POST', 'borrar.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send("id=" + id);
  console.log(obj.parentNode.parentNode);
  document.getElementById("tabla-usuarios").deleteRow(obj.parentNode.parentNode.rowIndex);
}

//insertar row
function insertRow(){

  var request = new XMLHttpRequest();
  request.open('POST', 'insertar.php', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();

  var rowID = getLastId();
  var table = document.getElementById("tabla-usuarios");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);
  cell1.innerHTML = "nombre";
  cell1.className = "celda";
  cell1.id = "nombre-" + rowID;
  cell1.setAttribute("ondblclick", "modificar(this)");

  cell2.innerHTML = "apellido";
  cell2.className = "celda";
  cell2.id = "apellido-" + rowID;
  cell2.setAttribute("ondblclick", "modificar(this)");

  cell3.innerHTML = "direccion";
  cell3.className = "celda";
  cell3.id = "direccion-" + rowID;
  cell3.setAttribute("ondblclick", "modificar(this)");

  cell4.innerHTML = "codigo";
  cell4.className = "celda";
  cell4.id = "codigo-" + rowID;
  cell4.setAttribute("ondblclick", "modificar(this)");

  cell5.innerHTML = "ciudad";
  cell5.className = "celda";
  cell5.id = "ciudad-" + rowID;
  cell5.setAttribute("ondblclick", "modificar(this)");

  cell6.innerHTML = "0";
  cell6.className = "celda";
  cell6.id = "hijos-" + rowID;
  cell6.setAttribute("ondblclick", "modificar(this)");

  cell7.innerHTML = "email";
  cell7.className = "celda";
  cell7.id = "email-" + rowID;
  cell7.setAttribute("ondblclick", "modificar(this)");

  cell8.innerHTML = "<button onclick='borrar(" + rowID +")'>Borrar</button>";
  cell8.className = "celda";
}
