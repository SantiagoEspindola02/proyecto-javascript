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

    agregar(producto){
        this.listaCarrito.push(producto)
    }


    mostrarProductos(){
        let carrito_productos = document.getElementById("carrito_productos")
        this.listaCarrito.forEach(producto => {
             carrito_productos.innerHTML += `
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
                         <i class="bi bi-trash3-fill" id="eliminar-${producto.id}"></i>
                     </button>
                 </div>`
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
            contenedor_productos.innerHTML += 
            `<div class="producto">
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

            btn.addEventListener("click",() => {
                carrito.agregar(producto)
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


const controlador_productos = new ProductoController()

controlador_productos.agregar(p1)
controlador_productos.agregar(p2)
controlador_productos.agregar(p3)
controlador_productos.agregar(p4)

controlador_productos.mostrarProductos()