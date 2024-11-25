import { updatedproducts } from "./requireData.js";
import { uploadProducts, showErrorMessage } from "./main.js";
const imputSearch = document.querySelector("[data-busqueda]");

document.addEventListener("dataLoaded", function () {});

function searchProducts() {
  const inputValue = document.querySelector("[data-busqueda]").value;
  const inputSearchValue = inputValue
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const wordSearchProduct = updatedproducts.filter((product) => {
    return [
      "descripcion",
      "codigo",
      "descripcionCompleta",
      "categoría",
      "subcategoría",
    ].some((key) => {
      const productValue = product[key]
        ? product[key]
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "";
      return productValue.includes(inputSearchValue);
    });
  });
  /*return (
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
  });*/
  if (wordSearchProduct.length > 0) {
    uploadProducts(wordSearchProduct);
  } else {
    const productContainer = (document.querySelector(
      "#product-container"
    ).innerHTML = "");
    //uploadProducts(wordSearchProduct);
    showErrorMessage(
      `UPS, Por el momento no contamos con el producto "${inputValue}" :(`
    );
  }
}

imputSearch.addEventListener("input", searchProducts);
