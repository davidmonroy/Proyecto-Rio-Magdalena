var conectorEnergia = document.getElementById("conectorEnergia_js")
,btnPrenderMonitor = document.getElementById("btnPrenderMonitor_js")
,conectorImagen = document.getElementById("conectorImagen_js")
,btnPower = document.getElementById("btnPower_js")
,monitor = document.getElementById("monitor_js")

var computadorEncendido = false
var monitorConSenal = false

//btnPower.addEventListener("click", verificarEnergia)
btnPower.addEventListener("click", encederComputador)
conectorEnergia.addEventListener("change", verificarEnergia)
conectorImagen.addEventListener("change", verificarImagen)
btnPrenderMonitor.addEventListener("change", verificarConexiones)

function verificarEnergia(){
	if (conectorEnergia.checked){
		computadorEncendido = true
	}else{
		computadorEncendido = false
		btnPower.classList.add("apagado")
		btnPower.classList.remove("encendido")
	}
}
function verificarImagen(){
	if (btnPrenderMonitor.checked){

		if (conectorImagen.checked){
			monitorConSenal = true
			if (computadorEncendido){
				monitor.classList.add("withSignal")
				monitor.classList.remove("noSignal")
			}
		}else{
			monitorConSenal = false

			if (computadorEncendido){

				monitor.classList.remove("withSignal")
				monitor.classList.add("noSignal")
			}

		}
	}
}

function encederComputador(){
	if (conectorEnergia.checked){
		btnPower.classList.toggle("apagado")
		btnPower.classList.toggle("encendido")
	}

/*
		console.log('conectado');
		computadorEncendido = true
	}else{
		btnPower.classList.remove("encendido")
		btnPower.classList.add("apagado")
		console.log('desconectado');
		computadorEncendido = false
	}
	*/
}
function verificarConexiones(){

	if (this.checked){
		console.log('monitor encendido');
	}else{

		monitor.classList.remove("withSignal")
		monitor.classList.remove("noSignal")
	}

	if (computadorEncendido){
		if (btnPrenderMonitor.checked){

			if (conectorImagen.checked){
				monitor.classList.add("withSignal")
			}else{
				monitor.classList.remove("withSignal")
				monitor.classList.add("noSignal")
			}
		}else{

		}
	}else{
		btnPrenderMonitor.checked = false
	}
}
