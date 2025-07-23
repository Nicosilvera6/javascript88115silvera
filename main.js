//--------------------------------------------------------------------------------------------
//--- LÓGICA DEL PROGRAMA
//--------------------------------------------------------------------------------------------

// Datos del usuario
const usuarioCorrecto = "admin";
const contrasenaCorrecta = "1234";

// Pedimos los datos al usuario
let usuario = prompt("Ingrese su nombre de usuario:");
console.log("El usuario es: " + usuario) 
let contrasena = prompt("Ingrese su contraseña:");
console.log("La contraseña es: " + contrasena) 

// Array de produtos
let productos = ["Championes Nike Tiempo", "Perfume VIP 212", "Remera Adidas"];
let precios = [1500, 1200, 2000];
let descuentos = [10, 15, 20];
console.log("Productos a la venta: " + productos) 

// Validamos login
if (usuario === usuarioCorrecto && contrasena === contrasenaCorrecta) {
  console.log('Usuario logueado');
  // Variable para el bucle
  let seguir = true;

  // Iterar siempre y cuando el usurio quiera seguir viendo productos
  while (seguir) {
    console.log('Usuario consulta por precio de producto');

    // Pedir selección
    let opcion = prompt("¿Qué desea hacer?\n1. Ver precio de producto\n2. Agregar nuevo producto\n3. Salir");

    if (opcion > productos.length || opcion <= 0) {
      alert("Producto incorrecto. Intente nuevamente.");
      continue;
    }

    if (opcion === "1") {
      let seleccion =prompt("¿Cuál producto desea ver?\n" + crearMenuProductos());
      
      if (seleccion > 0 && seleccion <= productos.length) {
        let precioFinal = calcularPrecioFinal(precios[seleccion - 1], descuentos[seleccion - 1]);
        alert("El precio final con descuento de " + productos[seleccion - 1] + " es: $" + precioFinal);
        console.log("Consulta precio: " + productos[seleccion - 1] + " - $" + precioFinal);
      } else {
        alert("Opción inválida.");
      }
    } else if (opcion === "2") {
      agregarProducto();
    } else if (opcion === "3") {
      seguir = false;
    } else {
      alert("Opción inválida.");
    }
  }
  // Fin del programa
  alert("Gracias por usar el simulador. ¡Saludos!");
  console.log("Fin")
} else {
  alert("Usuario o contraseña incorrectos.");
}

//--------------------------------------------------------------------------------------------
//--- FUNCIONES QUE UTILIZA EL PROGRAMA
//--------------------------------------------------------------------------------------------

function calcularPrecioFinal(precio, descuento) {
    return precio - (precio * descuento / 100);
}

function agregarProducto() {
  let nuevoProducto = prompt("Ingrese el nombre del producto: ");
  let nuevoPrecio = Number(prompt("Ingrese el precio del producto: "));
  let nuevoDescuento = Number(prompt("Ingrese el descuento del producto: "));

  if (nuevoPrecio > 0){
    productos.push(nuevoProducto)
    precios.push(nuevoPrecio)
    descuentos.push(nuevoDescuento)

    console.log('Agregue el producto al array: ' + productos);
    console.log('Agregue el precio al array: ' + precios);
    console.log('Agregue el descuento al array: ' + descuentos);
  } else {
    alert("Ingrese un precio de producto valido")
    agregarProducto();
  }
}

function crearMenuProductos(){
  // Crear el menú de productos
  let menu = '';
  for (let i = 1; i <= productos.length; i++) {
      menu += i + ". " + productos[i - 1] + "\n";
  }

  return menu;
}