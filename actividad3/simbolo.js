var respuestas = document.querySelectorAll(".clickable")
,btnComprobar = document.getElementById("comprobar")
,h_s_estado = document.getElementById("h_s_estado_js")
,resBien = 0
,resMal = 0

for(i=0; i<respuestas.length; i++){
	respuestas[i].addEventListener("click", validarRes)
}

btnComprobar.addEventListener("click", comprobarRes)

function validarRes(){
	var res = this.getAttribute("resp-data")
	if(res == "bien"){
		resBien += 1
		console.log("bien")
	}
	if(res == "mal"){
		resMal += 1
		console.log("mal")
	}
	var x = this.parentNode.parentNode
	x.classList.add("dis")
	
	var el = x
	,elClone = el.cloneNode(true)
	
	el.parentNode.replaceChild(elClone, el)
}

function comprobarRes(){
	var minResCorrectas = 4
	,article =document.createElement("article")
	,estado =document.createElement("h2")
	,respuestasBien =document.createElement("p")
	,respuestasMal =document.createElement("p")
	
	if(resBien>minResCorrectas){
		article.classList.add("pasaste")
		estado.innerText = "Pasaste"
		this.disabled = true
	}else{
		article.classList.add("perdiste");
		estado.innerText = "Perdio"
		this.disabled = true
	}
	respuestasBien.innerText = "Respuestas Correctas: " + resBien
	respuestasMal.innerText = "Respuestas Incorrectas: " + resMal

	article.appendChild(estado)
	article.appendChild(respuestasBien)
	article.appendChild(respuestasMal)
	h_s_estado.appendChild(article)
}