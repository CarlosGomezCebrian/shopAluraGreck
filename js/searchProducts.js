import { updatedproducts } from "./requireData.js";
import { uploadProducts, showErrorMessage } from "./main.js";
const imputSearch = document.querySelector("[data-busqueda]");
console.log("imputSearch", imputSearch);

document.addEventListener("dataLoaded", function () {
  console.log("desde search", updatedproducts);
});

function searchProducts() {
  const imputSearchValue = document
    .querySelector("[data-busqueda]")
    .value.toLowerCase();
  console.log("inputSearchValue", imputSearchValue);
  const wordSearchProduct = updatedproducts.filter((product) => {
    return (
      (product.descripcion &&
        product.descripcion.toLowerCase().includes(imputSearchValue)) ||
      (product.codigo &&
        product.codigo.toLowerCase().includes(imputSearchValue)) ||
      (product.descripcionCompleta &&
        product.descripcionCompleta.toLowerCase().includes(imputSearchValue)) ||
      (product.categoría &&
        product.categoría.toLowerCase().includes(imputSearchValue)) ||
      (product.subcategoría &&
        product.subcategoría.toLowerCase().includes(imputSearchValue))
    );
  });
  if (wordSearchProduct.length > 0) {
    uploadProducts(wordSearchProduct);
  } else {
    const productContainer = (document.querySelector(
      "#product-container"
    ).innerHTML = "");
    //uploadProducts(wordSearchProduct);
    showErrorMessage(
      `UPS, Por el momento no contamos con el producto "${imputSearchValue}" :(`
    );
  }
}

imputSearch.addEventListener("input", searchProducts);
