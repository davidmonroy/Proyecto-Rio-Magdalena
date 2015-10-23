
var artefactos = document.querySelectorAll(".draggable")
,H_BTN_btnValidar = document.getElementById("H_BTN_btnValidar_js")
,h_s_estado = document.getElementById("h_s_estado_js")
,zonasDescarga = document.getElementsByClassName("dropzone")
,artefactos = document.getElementById("h_s_contenedorArtefactos_js").children
,dragSrcEl = null
,idActual = new Number()
,numeroMaximoResBienCasa = 0
,numeroMaximoResBienColegio = 0
,lugarUno = "casa"
,lugarDos = "colegio"

for (var i = 0; i < artefactos.length; i++) {
	if(artefactos[i].getAttribute("lugar-data").indexOf(lugarUno) != -1){
		numeroMaximoResBienCasa += 1
	}
	if(artefactos[i].getAttribute("lugar-data").indexOf(lugarDos) != -1){
		numeroMaximoResBienColegio += 1
	}
}

function validarDropzone(contendedor) {

	var lugarCorrecto = contendedor.getAttribute("lugar-data")
	,contendedorHijos = contendedor.children
	,correcto = false
	,contadorResBien = 0

	if (contendedorHijos.length == 0){

		var article =document.createElement("article")
		,mensaje =document.createElement("p")

		mensaje.innerText = "Relacione por lo menos un artefacto."

		article.classList.add("pasaste","mensaje")
		article.appendChild(mensaje)

		h_s_estado.appendChild(article)

		setTimeout(function(){
			h_s_estado.removeChild(article)
		}, 3000)

		return -1
	}else{

		for (var i = 0; i < contendedorHijos.length; i++) {

			var lugaresCorrectosArtefacto = contendedorHijos[i].getAttribute("lugar-data").split(",")

			for (var j = 0; j < lugaresCorrectosArtefacto.length; j++) {

				if(lugarCorrecto == lugaresCorrectosArtefacto[j]){
					correcto = true
					contadorResBien += 1
				}
			}
		}

		return contadorResBien
	}
}

function validarRespuesta(){

	var pocentajeExito = 0.8

	var  H_ART_dopzoneCasa = document.getElementById("H_ART_dopzoneCasa_js")
	,H_ART_dopzoneColegio = document.getElementById("H_ART_dopzoneColegio_js")

	var validacionCasa = validarDropzone(H_ART_dopzoneCasa)
	,validacionColegio = validarDropzone(H_ART_dopzoneColegio)

	if (validacionCasa != -1 && validacionColegio != -1){
		var repuestasBien = validacionCasa + validacionColegio
		,maximoRespuestasBien = numeroMaximoResBienCasa + numeroMaximoResBienColegio

		var article =document.createElement("article")
		,estado =document.createElement("h2")
		,resBien =document.createElement("p")
		,resMal =document.createElement("p")

		article.classList.add("mensaje")
		article.id = "mensaje_js"


		if (repuestasBien >= Math.round(maximoRespuestasBien*pocentajeExito )){
			article.classList.add("pasaste")
			estado.innerText = "Pasaste"
			this.disabled = true
		}else{
			article.classList.add("perdiste");
			estado.innerText = "Perdio"
			this.disabled = true
		}
		resBien.innerText = "Respuestas Correcta: " + repuestasBien
		resMal.innerText = "Respuestas Incorrectas: " + (maximoRespuestasBien-repuestasBien)

		article.appendChild(estado)
		article.appendChild(resBien)
		article.appendChild(resMal)
		botonReiniciar = document.createElement("button")
		botonReiniciar.innerText = "Reiniciar"
		botonReiniciar.classList.add("btn","btnAcept","btninline")
		botonReiniciar.addEventListener("click", reiniciarActivcidad)

		h_s_estado.appendChild(article)
		h_s_estado.appendChild(botonReiniciar)
	}

}

function reiniciarActivcidad(){
	while(H_ART_dopzoneCasa_js.hasChildNodes()){
		H_ART_dopzoneCasa_js.removeChild(H_ART_dopzoneCasa_js.firstChild)
	}
	while(H_ART_dopzoneColegio_js.hasChildNodes()){
		H_ART_dopzoneColegio_js.removeChild(H_ART_dopzoneColegio_js.firstChild)
	}
	H_BTN_btnValidar.disabled = false
	h_s_estado_js.removeChild(document.getElementById("mensaje_js"))
	h_s_estado_js.removeChild(this)
}

function inicioArastre(evento) {
	dragSrcEl = this
	idActual = dragSrcEl.id
	evento.dataTransfer.effectAllowed = 'move'
	evento.dataTransfer.setData('text/html',this.outerHTML)
}

function eliminarArtefacto(){
	var nodoPadre = this.parentNode
	this.classList.add("eliminarArtefacto")

	var nodoActual = this

	setTimeout(function(){
		nodoPadre.removeChild(nodoActual)
	}, 2000)
}

function zoanArastre(evento){

	evento.stopPropagation()
	var seguir = true
	this.classList.toggle("descargaEnZona")
	var hijosActuales = this.children

	for (var i = 0; i < hijosActuales.length; i++) {
		if(hijosActuales[i].id == idActual){
			seguir = false
		}
	}


	if (dragSrcEl != this){
		if (seguir){
			this.innerHTML += evento.dataTransfer.getData('text/html')
			this.lastChild.addEventListener("click", eliminarArtefacto)
		}
	}

	hijosActuales = this.children

	for (var i = 0; i < hijosActuales.length; i++) {
		hijosActuales[i].addEventListener("click", eliminarArtefacto)
	};

	return false
}

function dragOver(evento){
	evento.preventDefault()
}
function dragenter(){
	this.classList.toggle("descargaEnZona")
}
function dragleave(){
	this.classList.toggle("descargaEnZona")
}

for (var index = 0; index < artefactos.length; index++) {
	artefactos[index].addEventListener("dragstart",inicioArastre,false)
}

for (var index = 0; index < zonasDescarga.length; index++) {
	zonasDescarga[index].addEventListener("drop",zoanArastre,false)
	zonasDescarga[index].addEventListener("dragover",dragOver,false)
	zonasDescarga[index].addEventListener("dragenter",dragenter,false)
	zonasDescarga[index].addEventListener("dragleave",dragleave,false)
}

H_BTN_btnValidar.addEventListener("click", validarRespuesta)
