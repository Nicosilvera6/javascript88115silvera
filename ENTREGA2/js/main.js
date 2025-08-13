const usuarioCorrecto = "admin";
const contrasenaCorrecta = "1234";

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let precios = JSON.parse(localStorage.getItem("precios")) || [];
let descuentos = JSON.parse(localStorage.getItem("descuentos")) || [];

// Funciones
function calcularPrecioFinal(precio, descuento) {
  return precio - (precio * descuento / 100);
};

function guardarLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
  localStorage.setItem("precios", JSON.stringify(precios));
  localStorage.setItem("descuentos", JSON.stringify(descuentos));
};

function agregarProducto(nombre, precio, descuento) {
  productos.push(nombre);
  precios.push(precio);
  descuentos.push(descuento);
  guardarLocalStorage();
};

function crearListaProductos() {
  const lista = document.createElement("ul");
  productos.forEach((producto, index) => {
    const li = document.createElement("li");
    li.textContent = `${producto} - $${precios[index]} (${descuentos[index]}% descuento)`;
    lista.appendChild(li);
  });
  return lista;
};

function mostrarQuitarProducto(contenedor) {
  contenedor.innerHTML = "<h3>Seleccione un producto a eliminar:</h3>";

  productos.forEach((prod, index) => {
    const btn = document.createElement("button");
    btn.textContent = prod;

    btn.addEventListener("click", () => {
      productos.splice(index, 1);
      precios.splice(index, 1);
      descuentos.splice(index, 1);
      guardarLocalStorage();
      mostrarQuitarProducto(contenedor);
    });

    contenedor.appendChild(btn);
  });
};

const loginSection = document.createElement("section");
loginSection.id = "loginSection";

const accionesSection = document.createElement("section");
accionesSection.id = "accionesSection";
accionesSection.style.display = "none";

const app = document.getElementById("tienda");
app.appendChild(loginSection);
app.appendChild(accionesSection);

//Login
const loginForm = document.createElement("form");
const usuarioInput = document.createElement("input");
usuarioInput.type = "text";
usuarioInput.placeholder = "Usuario";
usuarioInput.required = true;

const contrasenaInput = document.createElement("input");
contrasenaInput.type = "password";
contrasenaInput.placeholder = "Contraseña";
contrasenaInput.required = true;

const loginBtn = document.createElement("button");
loginBtn.type = "submit";
loginBtn.textContent = "Ingresar";

const loginMensaje = document.createElement("p");

const tituloLogin = document.createElement("h2");
tituloLogin.textContent = "Ingreso a la Tienda Online";

loginForm.append(usuarioInput, contrasenaInput, loginBtn);
loginSection.append(tituloLogin, loginForm, loginMensaje);

//acciones
const verProductosBtn = document.createElement("button");
verProductosBtn.textContent = "Ver productos";

const mostrarFormAgregarBtn = document.createElement("button");
mostrarFormAgregarBtn.textContent = "Agregar producto";

const listarProductosBtn = document.createElement("button");
listarProductosBtn.textContent = "Detalle Producto";

const quitarProductoBtn = document.createElement("button");
quitarProductoBtn.textContent = "Quitar producto";

const salirBtn = document.createElement("button");
salirBtn.textContent = "Salir";

const resultadoDiv = document.createElement("div");

accionesSection.append(
  verProductosBtn,
  mostrarFormAgregarBtn,
  listarProductosBtn,
  quitarProductoBtn,
  salirBtn,
  resultadoDiv
);

//agregar producto
const formAgregarProducto = document.createElement("form");
const nuevoNombreInput = document.createElement("input");
nuevoNombreInput.placeholder = "Nombre del producto";
nuevoNombreInput.required = true;

const nuevoPrecioInput = document.createElement("input");
nuevoPrecioInput.placeholder = "Precio";
nuevoPrecioInput.type = "number";
nuevoPrecioInput.required = true;

const nuevoDescuentoInput = document.createElement("input");
nuevoDescuentoInput.placeholder = "Descuento (%)";
nuevoDescuentoInput.type = "number";
nuevoDescuentoInput.required = true;

const guardarProductoBtn = document.createElement("button");
guardarProductoBtn.type = "submit";
guardarProductoBtn.textContent = "Guardar";

formAgregarProducto.append(nuevoNombreInput, nuevoPrecioInput, nuevoDescuentoInput, guardarProductoBtn);
formAgregarProducto.style.display = "none";

// Eventos
loginForm.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const usuario = usuarioInput.value.trim();
  const contrasena = contrasenaInput.value.trim();

  if (usuario === usuarioCorrecto && contrasena === contrasenaCorrecta) {
    loginMensaje.textContent = "Login exitoso";
    loginSection.style.display = "none";
    accionesSection.style.display = "block";
  } else {
    loginMensaje.textContent = "Usuario o contraseña incorrectos";
  }
});

verProductosBtn.addEventListener("click", () => {
  resultadoDiv.innerHTML = "<h3>Selecciona un producto:</h3>";
  productos.forEach((prod, index) => {
    const btn = document.createElement("button");
    btn.textContent = prod;
    btn.addEventListener("click", () => {
      const precioFinal = calcularPrecioFinal(precios[index], descuentos[index]);
      resultadoDiv.innerHTML = `<p>El precio final de <b>${prod}</b> es: $${precioFinal}</p>`;
    });
    resultadoDiv.appendChild(btn);
  });
  formAgregarProducto.style.display = "none";
});

mostrarFormAgregarBtn.addEventListener("click", () => {
  if (!accionesSection.contains(formAgregarProducto)) {
    accionesSection.appendChild(formAgregarProducto);
  };
  formAgregarProducto.style.display = "block";
  resultadoDiv.innerHTML = "";
});

formAgregarProducto.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nombre = nuevoNombreInput.value.trim();
  const precio = parseFloat(nuevoPrecioInput.value);
  const descuento = parseFloat(nuevoDescuentoInput.value);

  if (nombre && !isNaN(precio) && !isNaN(descuento)) {
    agregarProducto(nombre, precio, descuento);
    resultadoDiv.innerHTML = `<p>Producto agregado: ${nombre}</p>`;
    formAgregarProducto.reset();
    formAgregarProducto.style.display = "none";
  } else {
    resultadoDiv.innerHTML = `<p>Datos inválidos</p>`;
  };
});

listarProductosBtn.addEventListener("click", () => {
  resultadoDiv.innerHTML = "<h3>Lista de productos</h3>";
  resultadoDiv.appendChild(crearListaProductos());
  formAgregarProducto.style.display = "none"; 
});

quitarProductoBtn.addEventListener("click", () => {
  mostrarQuitarProducto(resultadoDiv);
  formAgregarProducto.style.display = "none"; 
});

salirBtn.addEventListener("click", () => {
  accionesSection.style.display = "none";
  loginSection.style.display = "block";
  usuarioInput.value = "";
  contrasenaInput.value = "";
  loginMensaje.textContent = "";
  resultadoDiv.innerHTML = "";
  formAgregarProducto.style.display = "none";
});