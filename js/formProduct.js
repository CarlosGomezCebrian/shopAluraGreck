import { conexionAPI } from "./conexionAPI.js";
const formulario = document.querySelector("[data-formulario]");
const subCategoria = document.querySelector("[data-subcategoria]");
const categoria = document.querySelector("[data-categoria]");
const categoriaHogar = ["Baño", "Casa", "Cocina", "Personal", "Peques"];
const categoriaRopa = ["Caballero", "Dama", "Kids"];
const btnBorrar = document.getElementById("borrar");

categoria.addEventListener("change", () => {
  switch (categoria.value) {
    case "Hogar":
      crearSelect(categoriaHogar);
      break;
    case "Ropa":
      crearSelect(categoriaRopa);
      break;
    default:
      console.log("No se encontraron casos");
  }
});

function crearSelect(subcategorias) {
  subCategoria.disabled = false;
  subCategoria.innerHTML = "";
  const option = document.createElement("option");
  option.value = "";
  option.textContent = "Selecciona una Subcategoría";
  option.disabled = true;
  option.selected = true;
  subCategoria.appendChild(option);

  subcategorias.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    subCategoria.appendChild(option);
  });
}

async function crearProducto(event) {
  event.preventDefault();
  const codigo = document.querySelector("[data-codigo]").value;
  const descripcion = document.querySelector("[data-descripcion]").value;
  const imagen = document.querySelector("[data-url]").value;
  const categoria = document.querySelector("[data-categoria]").value;
  const subcategoria = document.querySelector("[data-subcategoria]").value;
  const cantidad = document.querySelector("[data-cantidad]").value;
  const precio = document.querySelector("[data-precio]").value;
  const descuento = document.querySelector("[data-descuento]").value;
  const descuentoFloat = parseFloat(descuento);
  const descuentoDecimal = `.${descuentoFloat}`;
  const precioConDescuento =
    parseFloat(precio) - parseFloat(precio) * descuentoDecimal;
  const descripcionCompleta = document.querySelector(
    "[data-descripcionCompleta]"
  ).value;
  const materiales = document.querySelector("[data-materiales]").value;

  try {
    await conexionAPI.guardarProducto(
      codigo,
      descripcion,
      imagen,
      categoria,
      subcategoria,
      cantidad,
      precio,
      descuentoDecimal,
      precioConDescuento,
      descripcionCompleta,
      materiales
    );
    //window.location.href = "../index.html";
    clearInput();
  } catch (e) {
    alert(e);
  }
}
formulario.addEventListener("submit", (event) => crearProducto(event));
btnBorrar.addEventListener("click", clearInput);
//clearInput();
function clearInput() {
  const inputs = document.querySelectorAll("form .input");
  const selects = document.querySelectorAll("form select");
  inputs.forEach((element) => {
    element.value = "";
  });
  selects.forEach((element) => {
    element.value = "";
  });
}
