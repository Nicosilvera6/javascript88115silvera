//Elementos del DOM
const tienda = document.getElementById("tienda")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];  // Inicializo el carrito


async function cargarProductos() { //Cargo productos desde el archivo productos.JSON
  try {
    const response = await fetch('data/productos.json'); //
    if (!response.ok) throw new Error('Error al cargar productos');
    const productos = await response.json();


  productos.forEach((producto) => { //recorro los productos y los muestro en la pagina
  let content = document.createElement("div");
  content.className = "card";// creo la clase card para cada producto
  content.innerHTML =`
  <img src ="${producto.img}">
  <h3>${producto.nombre}</h3>
  <p class="precio">${producto.precio} $</p>
  `;

  tienda.appendChild(content);

  let comprar = document.createElement("button")

  comprar.innerText = "Comprar";
  comprar.className = "comprar";

  content.appendChild(comprar);

  comprar.addEventListener("click", () =>{ //agrego el producto al carrito
    const existe = carrito.find((item) => item.id === producto.id);// busco si el producto ya existe en el carrito 
     if (existe) {
      existe.cantidad++; //si existe aumentamos cantidad 
    } else {
      carrito.push({//si no existe lo agregamos
      id : producto.id,
      nombre : producto.nombre,
      precio : producto.precio,
      cantidad: 1,
    });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito)); //guardo el carrito en el localstorage

      Toastify({ //  muestro mensaje de producto agregado al carrito una vez seleccionamos en comprar
    text: `${producto.nombre} agregado al carrito 🛒`,
    duration: 3000, 
    gravity: "bottom", 
    position: "right", 
    backgroundColor: "linear-gradient(to right, #0356dcff, #05ddedff)",
  }).showToast();

  });
});
    
  }catch (error) { //si el archivo no tiene la ruta correcta o no existe damos un mensaje PAGINA EN MANTENIMIENTO
    Swal.fire("PAGINA EN MANTENIMIENTO");
  }
}
cargarProductos();
  


