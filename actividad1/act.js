
var artefactos = document.querySelectorAll(".draggable")
,dragSrcEl = null
,zonasDescarga = document.getElementsByClassName("dropzone")

function inicioArastre(evento) {

	dragSrcEl = this
	console.log(dragSrcEl);
	console.log(dragSrcEl.innerHTML);
	evento.dataTransfer.effectAllowed = 'move'
	evento.dataTransfer.setData('text/html',this.outerHTML)

}
function zoanArastre(evento){

	evento.stopPropagation()

	if (dragSrcEl != this){
		dragSrcEl.innerHTML += this.innerHTML
		this.innerHTML += evento.dataTransfer.getData('text/html')
	}

	return false
}


function dragOver(evento){

	evento.preventDefault()
	evento.dataTransfer.dropEffect = 'move'

}

for (var index = 0; index < artefactos.length; index++) {
	artefactos[index].addEventListener("dragstart",inicioArastre,false)
}
for (var i = 0; i < zonasDescarga.length; i++) {
	zonasDescarga[i].addEventListener("dragover",dragOver,false)
	zonasDescarga[i].addEventListener("drop",zoanArastre,false)

};
