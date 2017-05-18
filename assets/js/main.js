const listas = [];

const anadirLista = document.getElementById("anadir-lista");
anadirLista.addEventListener("click", crearLista);

const contenedor = document.getElementById("contenedor");
contenedor.addEventListener("click", equis);
contenedor.addEventListener("click", equisTarjeta);

function Lista(nombre="", tarjetas=[]) {
	this.nombre = nombre;
	this.tarjetas = tarjetas;
}

function Tarjeta(lista, texto="") {
	this.lista = lista;
	this.texto = texto;
}

function crearListaDom(lista) {
	var id = lista ? "lista-" + listas.indexOf(lista) : "nueva-lista"
	var idTarjetas = id + "-tarjetas";

	var listaDiv = document.createElement("div");
	listaDiv.setAttribute("class", "lista");
	listaDiv.setAttribute("id", id);	

	var tarjetasDiv = document.createElement("div");
	tarjetasDiv.setAttribute("class", "tarjetas");
	tarjetasDiv.setAttribute("id", idTarjetas);

	listaDiv.appendChild(tarjetasDiv);

	if(lista) {
		var labelLista = document.createElement('label');
		labelLista.setAttribute('class', 'label-lista');
		var txtLabelLista = document.createTextNode(lista.nombre);
		labelLista.appendChild(txtLabelLista);

		listaDiv.insertBefore(labelLista, tarjetasDiv);

		var linkAnadirTarjeta = document.createElement('a');
		linkAnadirTarjeta.setAttribute('class', 'link-anadir-tarjeta');
		linkAnadirTarjeta.setAttribute("href", "#");
		var txtLinkAnadirTarjeta = document.createTextNode('Añadir nueva tarjeta...');
		linkAnadirTarjeta.appendChild(txtLinkAnadirTarjeta);

		listaDiv.appendChild(linkAnadirTarjeta);

		linkAnadirTarjeta.addEventListener("click", crearTarjeta);

		lista.tarjetas.forEach(function(tarjeta,i){
			var tarjetaDiv = crearTarjetaDom(lista, tarjeta);
			tarjetasDiv.append(tarjetaDiv);
		});
	} else {
		var br = document.createElement("br");

		var botonGuardarLista = document.createElement("button");
		botonGuardarLista.setAttribute("id", "boton-guardar-lista");
		botonGuardarLista.addEventListener("click", guardarLista);

		var txtBotonGuardarLista = document.createTextNode("Guardar");

		botonGuardarLista.appendChild(txtBotonGuardarLista);

		var botonEquis = document.createElement("a");
		botonEquis.setAttribute("class", "boton-equis");
		botonEquis.setAttribute("href", "#");
		botonEquis.addEventListener("click", equis);
		
		var txtBotonEquis = document.createTextNode("x");
		
		botonEquis.appendChild(txtBotonEquis);
		
		listaDiv.appendChild(anadirLista);
		listaDiv.appendChild(br);
		listaDiv.appendChild(botonGuardarLista);
		listaDiv.appendChild(botonEquis);
	}

	return listaDiv;
}

function crearLista(event) {		
	event.preventDefault();
	event.stopPropagation();

	console.log('CREAR LISTA');
	console.log(event);

	contenedor.removeChild(anadirLista);

	var listaDiv = crearListaDom();
	
	contenedor.appendChild(listaDiv);
	anadirLista.focus();
	anadirLista.removeEventListener("click", crearLista);
}

function equis(event) {
	event.preventDefault();
	event.stopPropagation();

	if ("anadir-lista" != event.target.id) {
		console.log('EQUIS');
		console.log(event);
		var listaDiv = document.getElementById("nueva-lista");
		if (listaDiv) {
			contenedor.removeChild(listaDiv);
			anadirLista.value = "";
			contenedor.appendChild(anadirLista);
			anadirLista.addEventListener("click", crearLista);
		}	
	}	
}

function borrarListasDom() {
	while (contenedor.lastChild) {
	    contenedor.removeChild(contenedor.lastChild);
	}
}

function refrescarListasDom() {
	borrarListasDom();
	listas.forEach(function(lista, i){
		var listaDiv = crearListaDom(lista);
		contenedor.appendChild(listaDiv);
	});
	anadirLista.value = "";
	contenedor.appendChild(anadirLista);
	anadirLista.addEventListener("click", crearLista);
}

function guardarLista(event) {
	event.preventDefault();
	event.stopPropagation();

	console.log('GUARDAR LISTA');
	console.log(event);

	if (anadirLista.value != '') {
		var lista = new Lista(anadirLista.value);
		listas.push(lista);

		refrescarListasDom();
	}
}

function crearTarjetaDom(lista, tarjeta) {	
	var tarjetaDiv = document.createElement("div");
	tarjetaDiv.setAttribute("class", "tarjeta");	

	if (tarjeta) {
		var id = "lista-" + listas.indexOf(tarjeta.lista);
		var i = lista.tarjetas.indexOf(tarjeta);
		var idTarjeta = id + "-tarjeta-" + i;
		tarjetaDiv.setAttribute("id", idTarjeta);

		var txtTarjeta = document.createTextNode(tarjeta.texto);
		console.log(txtTarjeta);
		tarjetaDiv.appendChild(txtTarjeta);

	} else {
		var idTarjeta = "nueva-tarjeta";
		tarjetaDiv.setAttribute("id", idTarjeta);

		var textArea = document.createElement("textarea");
		textArea.setAttribute("id", idTarjeta + "-textarea");

		var br = document.createElement("br");

		var botonGuardarTarjeta = document.createElement("button");
		botonGuardarTarjeta.setAttribute("id", "boton-guardar-tarjeta");
		botonGuardarTarjeta.addEventListener("click", guardarTarjeta);

		var txtBotonGuardarTarjeta = document.createTextNode("Guardar");

		botonGuardarTarjeta.appendChild(txtBotonGuardarTarjeta);

		var botonEquis = document.createElement("a");
		botonEquis.setAttribute("class", "boton-equis");
		botonEquis.setAttribute("href", "#");
		botonEquis.addEventListener("click", equisTarjeta);
		
		var txtBotonEquis = document.createTextNode("x");
		
		botonEquis.appendChild(txtBotonEquis);

		tarjetaDiv.appendChild(textArea);
		tarjetaDiv.appendChild(br);
		tarjetaDiv.appendChild(botonGuardarTarjeta);
		tarjetaDiv.appendChild(botonEquis);

	}

	return tarjetaDiv;
}

function crearTarjeta(event){
	event.preventDefault();
	event.stopPropagation();

	console.log('CREAR TARJETA');
	console.log(event);

	var linkAnadirTarjeta = event.target;

	var listaDiv = linkAnadirTarjeta.parentNode;

	listaDiv.removeChild(linkAnadirTarjeta);

	var i = parseInt(listaDiv.id.slice(listaDiv.id.lastIndexOf('-')+1));
	var lista = listas[i];

	var tarjetaDiv = crearTarjetaDom(lista);

	var tarjetasDiv = document.getElementById(listaDiv.id + '-tarjetas');
	
	tarjetasDiv.appendChild(tarjetaDiv);
}

function guardarTarjeta(event) {
	event.preventDefault();
	event.stopPropagation();

	console.log('GUARDAR TARJETA');
	console.log(event);

	var botonGuardarTarjeta = event.target;
	var tarjetaDiv = botonGuardarTarjeta.parentNode;
	var tarjetasDiv = tarjetaDiv.parentNode;
	var listaDiv = tarjetasDiv.parentNode;

	var i = parseInt(listaDiv.id.slice(listaDiv.id.lastIndexOf('-')+1));
	var lista = listas[i];

	var nuevaTarjetaTextarea = document.getElementById('nueva-tarjeta-textarea');

	if (nuevaTarjetaTextarea.value != '') {
		console.log('DEBE GUARDAR TARJETA: ', nuevaTarjetaTextarea.value);
		var tarjeta = new Tarjeta(lista, nuevaTarjetaTextarea.value);
		lista.tarjetas.push(tarjeta);

		refrescarListasDom();
	}
}

function equisTarjeta(event) {
	event.preventDefault();
	event.stopPropagation();

	if ("nueva-tarjeta-textarea" != event.target.id) {
		console.log('EQUIS TARJETA');
		console.log(event);
		var tarjetaDiv = document.getElementById("nueva-tarjeta");
		if (tarjetaDiv) {
			var tarjetasDiv = tarjetaDiv.parentNode;
			var listaDiv = tarjetasDiv.parentNode;
			tarjetasDiv.removeChild(tarjetaDiv);

			var linkAnadirTarjeta = document.createElement('a');
			linkAnadirTarjeta.setAttribute('class', 'link-anadir-tarjeta');
			linkAnadirTarjeta.setAttribute("href", "#");
			var txtLinkAnadirTarjeta = document.createTextNode('Añadir nueva tarjeta...');
			linkAnadirTarjeta.appendChild(txtLinkAnadirTarjeta);

			listaDiv.appendChild(linkAnadirTarjeta);

			linkAnadirTarjeta.addEventListener("click", crearTarjeta);
		}	
	}	
}


            