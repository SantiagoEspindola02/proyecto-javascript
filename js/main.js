class Producto{
    constructor({id,nombre,precio,descripcion,img}){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = 1
        this.descripcion = descripcion
        this.img = img
    }

    aumentarCantidad(){
    this.cantidad++
    }

    disminuirCantidad(){
        if(this.cantidad > 1){
            this.cantidad--
            return true
        }

        return false
    }

    descripcionHTMLCarrito(){
        return`
        <div class="carrito_producto">
        <img class="carrito_producto-img" src="${this.img}" alt="jordan">
        <div class="carrito_producto-titulo">
            <small>Titulo</small>
            <h3>${this.nombre}</h3>
        </div>
        <div class="carrito_producto-cantidad">
            <small>Cantidad</small>
            <p>${this.cantidad}</p>
        </div>
        <div class="carrito_producto-precio">
            <small>Precio</small>
            <p>$${this.precio}</p>
        </div>
        <div class="carrito_producto-subtotal">
            <small>Subtotal</small>
            <p>$${this.precio}</p>
        </div>
        <button class="carrito_producto-borrar">
            <i class="bi bi-trash3-fill" id="eliminar${this.id}"></i>
        </button>
    </div>`
    }

    descripcionHTML(){
        return`<div class="producto">
        <img class="producto_img" src="${this.img}" alt="jordan">
        <div class="producto_detalle">
            <h3 class="producto_detalle-titulo">${this.nombre}</h3>
            <p class="producto_detalle-precio">$${this.precio}</p>
            <button class="producto_detalle-agregar" id="agregar${this.id}">Agregar</button>
        </div>
    </div>`
    }
}

class Carrito{
    constructor(){
        this.listaCarrito= []
        this.contenedor_carrito = document.getElementById(`carrito_productos`)
        this.total = document.getElementById('total')
        this.finalizar_compra = document.getElementById(`finalizar_compra`)
        this.keyStorage = "listaCarrito"
    }
    levantarStorage(){
        this.listaCarrito = JSON.parse(localStorage.getItem(this.keyStorage)) || []

        if(this.listaCarrito.length > 0){
            let listaAuxiliar = []

            for (let i = 0; i < this.listaCarrito.length; i++) {
                let productoDeLaClaseProducto = new Producto(this.listaCarrito[i])
                listaAuxiliar.push(productoDeLaClaseProducto)                
            }

            this.listaCarrito = listaAuxiliar
        }
    }
    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem(this.keyStorage, listaCarritoJSON)
    }
    agregar(productoAgregar) {
        let existeElProducto = this.listaCarrito.some(producto => producto.id == productoAgregar.id)
        
        if( existeElProducto ){
            let producto = this.listaCarrito.find(producto => producto.id == productoAgregar.id)
            producto.cantidad = producto.cantidad + 1
        }else{
            this.listaCarrito.push(productoAgregar)
        }
    }
    eliminar(productoEliminar){
        let producto = this.listaCarrito.find(producto => producto.id == productoEliminar.id)
        let indice = this.listaCarrito.indexOf(producto)
        this.listaCarrito.splice(indice,1)
    }

    limpiarContenedorCarrito(){
        this.contenedor_carrito.innerHTML = " "
    }
    mostrarProductos() {
        this.limpiarContenedorCarrito()

        this.listaCarrito.forEach( producto => { 
            contenedor_carrito.innerHTML += producto.descripcionHTMLCarrito()
        })

        this.listaCarrito.forEach(producto => {
            
            let btn_eliminar = document.getElementById(`eliminar${producto.id}`)

            btn_eliminar.addEventListener("click", () => {
                this.eliminar(producto)
                this.guardarEnStorage()
                this.mostrarProductos()
            })
        })
        
        total.innerHTML = "Precio Total: $" + this.calcular_total()
    }

    calcular_total(){
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad ,0)
    }
    eventoFinalizarCompra(){
        this.finalizar_compra.addEventListener("click", ()=> {
            
            if(this.listaCarrito.length > 0){
                let precio_total = this.calcular_total()
                this.listaCarrito = []
                localStorage.removeItem(this.keyStorage)
                this.limpiarContenedorCarrito()
                
                this.contenedor_carrito.innerHTML = '<h3 class="text-center">Compra realizada con éxito!</h3>'
                this.total.innerText = 'Por el precio total de: $'+precio_total
            }else{
                this.contenedor_carrito.innerHTML = '<h3 class="text-center">¡No hay productos en el carrito de compras!</h3>'
            }
        })
    }

}

class ProductoController {
    constructor() {
        this.listaProductos = []
    }
    cargarProductos(){
        const p1 = new Producto({id:1, nombre:"Zapatillas Jordan", precio:500, img:"airforce1.jpeg"})
        const p2 = new Producto({id:2, nombre:"Zapatillas Airforce 1", precio:300, img:"jordan.jpg"})
        const p3 = new Producto({id:3, nombre:"Zapatillas Ozelia", precio:250, img:"ozelia.jpg"})
        const p4 = new Producto({id:4, nombre:"Zapatillas Yeezy", precio:550, img:"yeezy.jpg"})

        this.agregar(p1)
        this.agregar(p2)
        this.agregar(p3)
        this.agregar(p4)
    }
    agregar(producto) {
        this.listaProductos.push(producto)
    }
    mostrarProductos() {
        let contenedor_productos = document.getElementById(`contenedor_productos`)
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += producto.descripcionHTML()
        })

        this.listaProductos.forEach(producto => {

            const btn = document.getElementById(`agregar${producto.id}`)

            btn.addEventListener("click", () => {
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarProductos()
            })
        })
    }
}

//Instancia de Carrito | Es para los productos que el cliente escoja
const carrito = new Carrito()
carrito.levantarStorage()
carrito.mostrarProductos()
carrito.eventoFinalizarCompra()

//Instancia de ProductoController - Gestiona todos los productos, es decir: mostrar, calcularTotal
const controlador_productos = new ProductoController()
controlador_productos.cargarProductos()
controlador_productos.mostrarProductos()
