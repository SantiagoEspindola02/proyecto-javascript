//  LE PEDIMOS EL VALOR DEL VEHICULO, SI VALE X EL SEGURO LE CUESTA TANTO, SI VALE X+1 EL
//  SEGURO VALE TANTO, SI VALE X+2 VALE TANTO. DSP SI ASEGURA 2 VEHICULOS O MAS TIENE UN DESCUENTO
//  DEL 20%.

alert("Bienvenido a nuestro sistema de cotización de seguro para su vehículo")
let rta = ""
let resultado = 0
let presupuesto = " "
let presupuestoConDescuento = " "
let i = 0
let cantidadVehiculos = i 

function porcentajeVehiculo(valorVehiculo){
    return valorVehiculo * 0.20
}


do{
    let marca = prompt("Ingrese la marca de su vehiculo").toUpperCase()
    let vehiculo = prompt("Ingrese el nombre de su vehiculo").toUpperCase()
    let valorVehiculo = Number(prompt("Ingrese el valor que cuesta su vehiculo en el mercado"))
 
    i = i + 1
    cantidadVehiculos = i
    resultado = porcentajeVehiculo(valorVehiculo)
    presupuesto = presupuesto +"\n" + marca + " " + vehiculo + "\t$" + resultado 
    presupuestoConDescuento = presupuestoConDescuento +"\n" + marca + " " + vehiculo + "\t$" + (resultado*0.8)
 
    rta = prompt("¿Desea cotizar el seguro de otro vehículo?(Escriba `NO` para finalizar).").toUpperCase()
}while(rta != "NO")


if(cantidadVehiculos == 1){
    alert("Total: " + presupuesto)
}else{
    alert("¡Felicidades! Al asegurar dos o mas vehículos tiene un descuento del 20%\nTotal:" + presupuesto + "\n\nTotal con descuento:" + presupuestoConDescuento)
}