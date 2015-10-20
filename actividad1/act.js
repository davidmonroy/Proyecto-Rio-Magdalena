
var artefactos = document.querySelectorAll(".draggable")
,H_BTN_btnValidar = document.getElementById("H_BTN_btnValidar_js")
,dragSrcEl = null
,zonasDescarga = document.getElementsByClassName("dropzone")
,idActual = new Number()

function validarDropzone(arreglo,lugarCorrecto) {

	var correcto = false

	for (var i = 0; i < arreglo.length; i++) {

		var lugaresCorrectosArtefacto = arreglo[i].getAttribute("lugar-data").split(",")

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

function validarRespuesta(){

	var  H_ART_dopzoneCasa = document.getElementById("H_ART_dopzoneCasa_js")
	,H_ART_dopzoneCasaHijos = document.getElementById("H_ART_dopzoneCasa_js").children
	,casa = H_ART_dopzoneCasa.getAttribute("lugar-data")

	var H_ART_dopzoneColegio = document.getElementById("H_ART_dopzoneColegio_js")
	,H_ART_dopzoneColegioHijos = document.getElementById("H_ART_dopzoneColegio_js").children
	,colegio = H_ART_dopzoneColegio.getAttribute("lugar-data")

	validarDropzone(H_ART_dopzoneCasaHijos,casa)
	validarDropzone(H_ART_dopzoneColegioHijos,colegio)

}

function inicioArastre(evento) {
	dragSrcEl = this
	idActual = dragSrcEl.id
	evento.dataTransfer.effectAllowed = 'move'
	evento.dataTransfer.setData('text/html',this.outerHTML)
}

function zoanArastre(evento){

	evento.stopPropagation()
	var seguir = true

	var hijosActuales = this.children

	for (var i = 0; i < hijosActuales.length; i++) {
		if(hijosActuales[i].id == idActual){
			seguir = false
			break
		}
	}


	if (dragSrcEl != this){
		if (seguir){
			this.innerHTML += evento.dataTransfer.getData('text/html')
		}
	}
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
