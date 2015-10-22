
var artefactos = document.querySelectorAll(".draggable")
,H_BTN_btnValidar = document.getElementById("H_BTN_btnValidar_js")
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
		console.log('ingrese por lo menos un hijo');
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

		if (correcto){
			console.log('bien' + lugarCorrecto);
		}else{
			console.log('mal'  +lugarCorrecto);
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

		if (repuestasBien >= Math.round(maximoRespuestasBien*pocentajeExito )){
			console.log('pasaste');
		}else{
			console.log('perdio');

		}
	}

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
