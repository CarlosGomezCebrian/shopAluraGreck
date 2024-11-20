import { showLoader } from "./loader.js";
//let productsDialog = [];
let updatedproducts = [];

let data;

document.addEventListener("DOMContentLoaded", function () {
  showLoader();
  requireData();
});
function requireData() {
  let urlRut = `http://localhost:3001/variablesPermitidas`;
  fetch(urlRut)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error de red: " + response.status);
      }
      return response.json();
    })
    .then((dataJson) => {
      try {
        data = dataJson;
        updateProduct();
      } catch (error) {
        console.error("Error al convertir el texto JSON:", error);
        showErrorMessage("Error al procesar los datos JSON.");
      }
    })
    .catch((error) => {
      console.error("Error al obtener las variables:", error);
      showErrorMessage(
        "¡UPS! Problema al cargar los datos, actualiza o regresa más tarde."
      );
    });
}

function updateProduct() {
  if (!data) {
    console.error("Error: Los datos no están disponibles.");
    return;
  }
  let url = data[0].dbUpdateProducts;
  setTimeout(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error de red: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        updatedproducts = data;
        const dataLoadedEvent = new Event("dataLoaded");
        document.dispatchEvent(dataLoadedEvent);
      })
      .catch((error) => {
        console.error("Se produjo un error:", error);
        showErrorMessage(
          "¡UPS! Problema al cargar los datos, actualiza o regresa más tarde."
        );
      });
  }, 100);
}
export { updatedproducts };
