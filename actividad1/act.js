
var artefactos = document.querySelectorAll(".draggable")
,H_BTN_btnValidar = document.getElementById("H_BTN_btnValidar_js")
,dragSrcEl = null
,zonasDescarga = document.getElementsByClassName("dropzone")
,idActual = new Number()

function validarDropzone(contendedor) {

	var lugarCorrecto = contendedor.getAttribute("lugar-data")
	,contendedorHijos = contendedor.children
	,correcto = false

	if (contendedorHijos.length == 0){
		console.log('ingrese por lo menos un hijo');
	}else{

		for (var i = 0; i < contendedorHijos.length; i++) {

			var lugaresCorrectosArtefacto = contendedorHijos[i].getAttribute("lugar-data").split(",")

			for (var j = 0; j < lugaresCorrectosArtefacto.length; j++) {
				if(lugarCorrecto == lugaresCorrectosArtefacto[j]){
					correcto = true
				}
			}
		}

		if (correcto){
			console.log('bien' + lugarCorrecto);
		}else{
			console.log('mal'  +lugarCorrecto);
		}
	}
}

function validarRespuesta(){

	var  H_ART_dopzoneCasa = document.getElementById("H_ART_dopzoneCasa_js")
	,H_ART_dopzoneColegio = document.getElementById("H_ART_dopzoneColegio_js")

	validarDropzone(H_ART_dopzoneCasa)
	validarDropzone(H_ART_dopzoneColegio)

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

for (var index = 0; index < artefactos.length; index++) {
	artefactos[index].addEventListener("dragstart",inicioArastre,false)
}

for (var index = 0; index < zonasDescarga.length; index++) {
	zonasDescarga[index].addEventListener("drop",zoanArastre,false)
	zonasDescarga[index].addEventListener("dragover",dragOver,false)
}

H_BTN_btnValidar.addEventListener("click", validarRespuesta)
