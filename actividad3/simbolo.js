var respuestas = document.querySelectorAll(".respuesta")
,numeroMaxBien = 0
,numeroMaxMal = 0

for (var i = 0; i < respuestas.length; i++) {
	if(respuestas[i].getAttribute("resp-data").indexOf("bien") != -1){
		numeroMaxBien += 1
	}
	if(respuestas[i].getAttribute("resp-data").indexOf("mal") != -1){
		numeroMaxMal += 1
	}
}