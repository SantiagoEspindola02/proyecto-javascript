class Producto{
    constructor({id,nombre,precio,descripcion,img}){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = 1
        this.descripcion = descripcion
        this.img = img
    }
}

class Carrito{
    constructor(){
        this.listaCarrito= []
    }

    levantarStorage(){
        let listaCarritoJSON = localStorage.getItem("listaCarrito")
        this.listaCarrito = JSON.parse(listaCarritoJSON)    
    }
    
    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }
    agregar(productoAgregar) {
        let existeElProducto = this.listaCarrito.some(producto => producto.id == productoAgregar.id)
        
        if( existeElProducto ){
            let producto = this.listaCarrito.find(producto => producto.id == productoAgregar.id)
            producto.cantidad++
        }else{
            this.listaCarrito.push(productoAgregar)
        }
    }
    eliminar(productoEliminar){
        let producto = this.listaCarrito.find(producto => producto.id == productoEliminar.id)
        let indice = this.listaCarrito.indexOf(producto)
        this.listaCarrito.splice(indice,1)
    }

    mostrarProductos(){
    let contenedor_carrito = document.getElementById('carrito_productos')
        //contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += `
            <p class="carrito_vacio">Aún no has ingresado productos al carrito.</p>
                <div class="carrito_productos">
                    <div class="carrito_producto">
                        <img class="carrito_producto-img" src="${producto.img}" alt="jordan">
                        <div class="carrito_producto-titulo">
                            <small>Titulo</small>
                            <h3>${producto.nombre}</h3>
                        </div>
                        <div class="carrito_producto-cantidad">
                            <small>Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carrito_producto-precio">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carrito_producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <button class="carrito_producto-borrar">
                            <i class="bi bi-trash3-fill" ></i>
                        </button>
                    </div>`
        })

        this.listaCarrito.forEach(producto => {
            let btn_eliminar = document.getElementById(`eliminar-${producto.id}`)
            btn_eliminar.addEventListener("click", () => {
                this.eliminar(producto)
                this.guardarEnStorage()
                this.mostrarProductos()
            })
        })
    }
}
    

class ProductoController {
    constructor() {
        this.listaProductos = []
    }
    agregar(producto) {
        this.listaProductos.push(producto)
    }
    mostrarProductos() {
        let contenedor_productos = document.getElementById("contenedor_productos")
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += `<div class="producto">
            <img class="producto_img" src="${producto.img}" alt="jordan">
            <div class="producto_detalle">
                <h3 class="producto_detalle-titulo">${producto.nombre}</h3>
                <p class="producto_detalle-precio">$${producto.precio}</p>
                <button class="producto_detalle-agregar" id="agregar-${producto.id}">Agregar</button>
            </div>
        </div>`
        })

         this.listaProductos.forEach(producto => {

            const btn = document.getElementById(`agregar-${producto.id}`)

            btn.addEventListener("click", () => {
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarProductos()
            })
        })
    }
}

const p1 = new Producto({id:1, nombre:"Zapatillas Jordan", precio:500, img:"airforce1.jpeg"})
const p2 = new Producto({id:2, nombre:"Zapatillas Airforce 1", precio:300, img:"jordan.jpg"})
const p3 = new Producto({id:3, nombre:"Zapatillas Ozelia", precio:250, img:"ozelia.jpg"})
const p4 = new Producto({id:4, nombre:"Zapatillas Yeezy", precio:550, img:"yeezy.jpg"})



const carrito = new Carrito()
carrito.levantarStorage()
carrito.mostrarProductos()


const controlador_productos = new ProductoController()
controlador_productos.agregar(p1)
controlador_productos.agregar(p2)
controlador_productos.agregar(p3)
controlador_productos.agregar(p4)

controlador_productos.mostrarProductos()