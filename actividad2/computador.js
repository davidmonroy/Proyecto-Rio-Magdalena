var conectorEnergia = document.getElementById("conectorEnergia_js")
,btnPrenderMonitor = document.getElementById("btnPrenderMonitor_js")
,conectorImagen = document.getElementById("conectorImagen_js")
,btnPower = document.getElementById("btnPower_js")
,monitor = document.getElementById("monitor_js")

var computadorEncendido = false

btnPower.addEventListener("click", verificarEnergia)
btnPrenderMonitor.addEventListener("change", verificarConexiones)

function verificarEnergia(){
	if (conectorEnergia.checked){
		btnPower.addEventListener("click", encederComputador)
		this.classList.remove("apagado")
		this.classList.add("encendido")
		console.log('conectado');
		this.click()
		computadorEncendido = true
	}else{
		this.classList.remove("encendido")
		this.classList.add("apagado")
		btnPower.removeEventListener("click", encederComputador)
		console.log('desconectado');
	}
}

function encederComputador(){
	console.log('encendiendo');

}
function verificarConexiones(){
	if (btnPrenderMonitor.checked){

		if (computadorEncendido){
			console.log('listo');
			if (conectorImagen.checked){
				console.log('listo');
				monitor.classList.add("withSignal")
			}else{
				console.log('computador de conexion a imagen');
				monitor.classList.remove("withSignal")
				monitor.classList.add("noSignal")
			}
		}else{
			console.log('computador sin energia');

		}
	}else{
		monitor.classList.remove("noSignal")

	}
}
