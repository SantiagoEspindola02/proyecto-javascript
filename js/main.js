class Producto{
    constructor(id,nombre,precio,talle,cantidad){
        this.prenda= prenda
        this.nombre= nombre
        this.precio= precio
        this.talle= talle
        this.cantidad= cantidad
    }
    aumentaCantidad(cantidad){
        this.cantidad= this.cantidad + cantidad
    }
    descripcion(){
        return "Prenda: "+ this.prenda + 
        "\n Nombre del producto: "+ this.nombre +
        "\n Precio: "+ this.precio + 
        "\n Talle: "+ this.talle + 
        "\n Cantidad: "+ this.cantidad 
    }
}

class Carrito{
    constructor(){
        this.carrito= []
    }

    agregar(producto,cantidad){
        let productoRepetido= this.carrito.some(elemento => elemento.prenda == producto.prenda)
        if(productoRepetido){
            producto.aumentaCantidad(cantidad)
        }else{
            producto.aumentaCantidad(cantidad)
            this.carrito.push(producto)
        }
    }
    mostrarProducto(){
        let productosAgregados= ""
        this.carrito.forEach(producto =>{
            productosAgregados= productosAgregados + producto.descripcion()
        })
        alert(productosAgregados)
    }
    sumaTotal(){
        return this.carrito.reduce((acumulador,producto)=> acumulador + producto.precio * producto.cantidad,0)
    }
}

class ControladorDeProductos{
    constructor(){
        this.listaProductos= []
    }
    agregar(producto){
        this.listaProductos.push(producto)
    }
    visualizarProductos(){
        let listaParaUsuario= ""
        this.listaProductos.forEach(producto =>{
            listaParaUsuario= listaParaUsuario + producto.descripcion()
        })
        alert(listaParaUsuario)
    }
    buscarProductoPorPrenda(prenda){
        this.listaProductos.filter(producto =>{
            return this.listaProductos.find(producto => producto.prenda == prenda)
        })
    }
}

const CP= new ControladorDeProductos()
const CARRITO= new Carrito()

CP.agregar (new Producto("Remera", "Remera Nike", 1000, "L", 0))
CP.agregar (new Producto("Pantalon", "Pantalon Jordan", 5000, "M", 0))
CP.agregar (new Producto("Campera", "Campera Puma", 7000, "L", 0))
CP.agregar (new Producto("Zapatillas", "Air Force 1", 30000, "43", 0))

let rta= ""


do{
    alert("¿Bienvenido/a a RaimondiStore que producto buscaba?")    
    CP.visualizarProductos()
    let producto= CP.buscarProductoPorPrenda(prenda)
    let cantidad= Number(prompt("Ingrese cuantas unidades desea comprar"))
    CARRITO.agregar(producto,cantidad)
    alert("El producto fue añadido con éxito")
    CARRITO.mostrarProducto()

    rta= prompt("Si desea finalizar su compra escriba OK").toUpperCase()
}while(rta != "OK")


