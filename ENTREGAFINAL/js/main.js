//Elementos del DOM
const tienda = document.getElementById("tienda")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
// Inicializo el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];  

//Cargo productos desde el archivo productos.JSON
async function cargarProductos() { 
  try {
    const response = await fetch('data/productos.json'); 
    if (!response.ok) throw new Error('Error al cargar productos');
    const productos = await response.json();

//recorro los productos y los muestro en la pagina
  productos.forEach((producto) => { 
  let content = document.createElement("div");
  // creo la clase card para cada producto
  content.className = "card";
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
//agrego el producto al carrito
  comprar.addEventListener("click", () =>{ 
// busco si el producto ya existe en el carrito 
    const existe = carrito.find((item) => item.id === producto.id);
     if (existe) {
//si existe aumentamos cantidad       
      existe.cantidad++; //si existe aumentamos cantidad 
    } else {
//si no existe lo agregamos      
      carrito.push({
      id : producto.id,
      nombre : producto.nombre,
      precio : producto.precio,
      cantidad: 1,
    });
  }
//guardo el carrito en el localstorage
  localStorage.setItem("carrito", JSON.stringify(carrito)); 
//  muestro mensaje de producto agregado al carrito una vez seleccionamos en comprar
      Toastify({ 
    text: `${producto.nombre} agregado al carrito 🛒`,
    duration: 3000, 
    gravity: "bottom", 
    position: "right", 
    backgroundColor: "linear-gradient(to right, #0356dcff, #05ddedff)",
  }).showToast();

  });
});
//si el archivo no tiene la ruta correcta o no existe damos un mensaje PAGINA EN MANTENIMIENTO    
  }catch (error) { 
    Swal.fire("PAGINA EN MANTENIMIENTO");
  }
}
cargarProductos();
  


