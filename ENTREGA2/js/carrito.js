//funcion principal para cargar y pintar el carrito
const pintarCarrito = (carrito, modalContainer) => {
modalContainer.innerHTML = "";

//creo y agrego el header del modal del carrito
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
     <h1 class ="modal-header-titulo"> Carrito</h1> 
  `;
  modalContainer.appendChild(modalHeader);

  //Boton para cerrar el modal
  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "X";
  modalbutton.className = "modal-hear-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.classList.add("hidden"); 
  });

  modalHeader.appendChild(modalbutton);

//Recorro el carrito y muestro los productos
  carrito.forEach((producto) => {
    const carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `  
      <h3>${producto.nombre}</h3>
      <p>${producto.precio} $</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <p>Subtotal: ${producto.precio * producto.cantidad} $</p>
    `;
    modalContainer.append(carritoContent);

    //boton para eliminar producto del carrito
    let eliminar = document.createElement("span");
    eliminar.innerText = "❌"; // con windows + . Busque los iconos 
    eliminar.className= "eliminar-producto";
    carritoContent.appendChild(eliminar);

    eliminar.addEventListener("click", () => {
      //elimino el producto seleccionado del carrito
      carrito = carrito.filter((item) => item.id !== producto.id);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      pintarCarrito(carrito, modalContainer);
    });
  });

  //calculo el total a pagar sumando los subtotales de cada producto
  const total = carrito.reduce((acc, el) => acc +(el.precio * el.cantidad), 0);
   // Muestro el total a pagar en el modal
  const totalComprado = document.createElement("div"); 
    totalComprado.className ="total-content";
    totalComprado.innerHTML = `TOTAL A PAGAR: ${total} $`;
    modalContainer.appendChild(totalComprado);

// Botón para finalizar la compra
  const finalizarCompra = document.createElement("button");
    finalizarCompra.innerText = "Finalizar compra 🛍️";  
    finalizarCompra.className = "finalizar-compra";
    modalContainer.appendChild(finalizarCompra);

    finalizarCompra.addEventListener("click", () => {
      // Muestro el formulario de compra y confirma con SweetAlert
    mostrarFormulario(modalContainer, carrito);

    Swal.fire({
     title: "Desea continuar con la compra?",
     showDenyButton: true,
     confirmButtonText: "Si",
     denyButtonText: `No`
     }).then((result) => {
     if (result.isConfirmed) {
     Swal.fire("Gracias!", "completa tus datos", "success");
     mostrarFormulario(modalContainer, carrito);
     } else if (result.isDenied) {
     modalContainer.classList.add("hidden");
     Swal.fire("Compra Canelada", "Podes seguir viendo otros productos", "info");
  }
});
});
}
//Funcion para mostrar el formulario de compra
  const mostrarFormulario = (modalContainer, carrito) => {
  modalContainer.innerHTML = "";


const formHeader = document.createElement("h2");
  formHeader.innerText = "Completa tus datos para finalizar la compra";
  modalContainer.appendChild(formHeader);

  //Creo el formulario de compra
  const form = document.createElement("form");
  form.innerHTML = `
    <input type="text" id="nombre" placeholder="Nombre completo" required>
    <input type="email" id="email" placeholder="Email" required>
    <input type="text" id="telefono" placeholder="telefono" required>
    <input type="text" id="direccion" placeholder="Dirección" required>
    <input type="text" id="ciudad" placeholder="Ciudad" required>
    <button type="submit">Confirmar compra</button>
  `;
  modalContainer.appendChild(form);

  //Funcion para mostrar el detalle de la compra
 const mostrarDetalleCompraHTML = (carrito) => {
  const detalleDiv = document.getElementById("detalle-compra");
  if (!detalleDiv) return;

  let html = "<h2>Detalle de la compra</h2><ul>";
  carrito.forEach(producto => {
  const subtotal = producto.precio * producto.cantidad;
  html += `<li>
      <strong>${producto.nombre}</strong> - 
      Precio: $${producto.precio} | 
      Cantidad: ${producto.cantidad} | 
      Subtotal: $${subtotal}
    </li>`;
  });
  html += "</ul>";

  const total = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
  html += `<h3>Total a pagar: $${total}</h3>`;

  detalleDiv.innerHTML = html;
};

  //Evento para procesar el envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value; 
    const direccion = document.getElementById("direccion").value; 
    
//Mensaje de agradecimiento por la compra
    modalContainer.innerHTML = `
      <h2>¡Gracias por tu compra, ${nombre}! 🥳</h2>  
      <div id="detalle-compra"></div>
      <h3>El envio lo realizaremos a la dirección, ${direccion}</h3>
    `;
// Muestro el detalle de la compra
    mostrarDetalleCompraHTML(carrito);
//Botón para seguir comprando    
    const seguirComprando = document.createElement("button");
    seguirComprando.innerText = "Seguir comprando 🛒";
    seguirComprando.className = "seguir-comprando";
    modalContainer.appendChild(seguirComprando);

  seguirComprando.addEventListener("click", () => {
    modalContainer.classList.add("hidden"); 
  });
//Vacío el carrito después de la compra
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
};
//Evento para abrir el carrito
verCarrito.addEventListener("click", () => {
  carrito = JSON.parse(localStorage.getItem("carrito"))|| [];
  modalContainer.classList.remove("hidden");
  pintarCarrito(carrito, modalContainer)
});

