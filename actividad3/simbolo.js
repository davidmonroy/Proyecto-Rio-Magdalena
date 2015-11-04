var respuestas = document.querySelectorAll(".clickable")
,resBien = 0
,resMal = 0
for(i=0; i<respuestas.length; i++){
	respuestas[i].addEventListener("click", validarRes)
}


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
}
