import { updatedproducts } from "./requireData.js";
import { hideLoader } from "./loader.js";
const productContainer = document.querySelector("#product-container");
let products = [];
document.addEventListener("dataLoaded", function () {
  products = updatedproducts;
  setTimeout(() => {
    uploadProducts(products);
  }, 100);
});
export function showErrorMessage(message) {
  mainTitle.style.display = "block";
  mainTitle.innerText = message;
}
const btnCategories = document.querySelectorAll(".button-category");
const mainTitle = document.querySelector("#main-title");
let btnsAdd = document.querySelectorAll(".product-add");
const number = document.querySelector("#number");
const mobileNumber = document.querySelector("#mobileNumber");
const aside = document.querySelector("aside");
const headerMobile = document.querySelector(".header-mobile");
var selectMobile = document.getElementById("select-mobile");
var selectMain = document.getElementById("select-main");

btnCategories.forEach((btn) =>
  btn.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
    headerMobile.style.zIndex = "1000";
  })
);

export function uploadProducts(chosenProducts) {
  productContainer.innerHTML = "";
  mainTitle.style.display = "none";
  let thereAreStocks = false;
  let counter = 0;
  chosenProducts.forEach((product) => {
    if (product.cantidad > 0) {
      thereAreStocks = true;
      const div = document.createElement("div");
      div.classList.add("product");
      div.id = product.id;
      const image = document.createElement("img");
      const sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw";
      image.classList.add("product-image");
      image.src = product.imagen + "?v=1.0";
      image.sizes = sizes;
      image.alt = product.descripcion;
      if (counter >= 12) {
        image.loading = "lazy";
      }
      counter++;
      div.appendChild(image);
      const btnImage = document.createElement("button");
      btnImage.classList.add("product-information-button");
      btnImage.title = "Mas información";
      div.appendChild(btnImage);

      const iPlus = document.createElement("i");
      iPlus.classList.add("bi", "bi-plus");
      btnImage.appendChild(iPlus);

      const details = document.createElement("div");
      details.classList.add("product-details");

      const title = document.createElement("h3");
      title.classList.add("product-title");
      title.textContent = product.descripcion;
      details.appendChild(title);

      const price = document.createElement("p");
      const discount = document.createElement("p");
      const priceWithDiscount = document.createElement("p");
      price.classList.add("product-price");
      price.textContent = `$${(product.precio * 1).toFixed(2)}`;
      details.appendChild(price);

      if (product.descuento > 0) {
        discount.classList.add("product-price");
        discount.textContent = `-${product.descuento * 100}%`;
        details.appendChild(discount);
        priceWithDiscount.classList.add("product-price");
        priceWithDiscount.textContent = `$${(
          product.precio_con_descuento * 1
        ).toFixed(2)} Stock ${product.cantidad}`;
        details.appendChild(priceWithDiscount);
      } else {
        discount.classList.add("product-price");
        discount.textContent = "";
        details.appendChild(discount);
        priceWithDiscount.classList.add("product-price");
        priceWithDiscount.textContent = `$${(product.precio * 1).toFixed(
          2
        )} Stock ${product.cantidad}`;
        details.appendChild(priceWithDiscount);
        price.textContent = "";
      }
      const btnAdd = document.createElement("button");
      btnAdd.classList.add("product-add");
      btnAdd.title = "Agregar producto al carrito";
      btnAdd.textContent = "Agregar";
      details.appendChild(btnAdd);

      div.appendChild(details);
      productContainer.appendChild(div);
    }
  });
  if (!thereAreStocks) {
    showErrorMessage("¡UPS! Por el momento no tenemos Existencias nuevas");
  }
  updateAddButtons();
  hideLoader();
  const imgLoadedEvent = new Event("imgLoaded");
  document.dispatchEvent(imgLoadedEvent);
}

let category;
btnCategories.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btnCategories.forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");
    category = e.currentTarget.id;
    if (category != "todos") {
      if (category == "Hogar" || category == "Ropa") {
        updateSelect(category);
        const productsbtn = products.filter(
          (product) => product.categoría === category
        );
        uploadProducts(productsbtn);
      } else {
        const productsbtn = products.filter(
          (product) => product.subcategoría === category
        );
        updateSelect(category);
        uploadProducts(productsbtn);
      }
    } else {
      updateSelect("todos");
      mainTitle.innerText = "Todos los productos";
      uploadProducts(products);
    }
  });
});

selectMobile.addEventListener("change", changeSelect);
selectMain.addEventListener("change", changeSelect);

function changeSelect() {
  category = this.value;
  btnCategories.forEach((btn) => btn.classList.remove("active"));
  var activecategory;
  switch (category) {
    case "Hogar":
    case "Baño":
    case "Casa":
    case "Cocina":
    case "Personal":
    case "Peques":
      activecategory = "Hogar";
      break;
    case "Ropa":
    case "Caballero":
    case "Dama":
    case "Kids":
      activecategory = "Ropa";
      break;
    default:
      activecategory = "todos";
  }

  btnCategories.forEach((btn) => {
    if (btn.id === activecategory) {
      btn.classList.add("active");
    }
  });
  if (category != "todos") {
    if (category == "Hogar" || category == "Ropa") {
      updateSelect(category);
      const productsSelect = products.filter(
        (product) => product.categoría === category
      );
      uploadProducts(productsSelect);
    } else {
      const productsSelect = products.filter(
        (product) => product.subcategoría === category
      );
      updateSelect(category);
      uploadProducts(productsSelect);
    }
  } else {
    updateSelect("todos");
    mainTitle.innerText = "Todos los productos";
    uploadProducts(products);
  }
}

function updateSelect(category) {
  mainTitle.style.display = "none";
  const selectElegido = category;
  selectMobile.value = selectElegido;
  selectMain.value = selectElegido;
}
function updateAddButtons() {
  btnsAdd = document.querySelectorAll(".product-add");
  btnsAdd.forEach((btn) => {
    btn.addEventListener("click", addToShoppingBag);
  });
}

let productsInShoppingBag;

let productsInShoppingBagLS = localStorage.getItem("products-in-shopping-bag");

if (productsInShoppingBagLS) {
  productsInShoppingBag = JSON.parse(productsInShoppingBagLS);
  updateNumber();
} else {
  productsInShoppingBag = [];
}
function addToShoppingBag(e) {
  let idParent = this.closest(".product").id;
  const productAdded = products.find((product) => product.id === idParent);
  const productInShoppingBag = productsInShoppingBag.find(
    (product) => product.id === idParent
  );
  if (
    productInShoppingBag &&
    productInShoppingBag.orderQuantity >= productAdded.cantidad
  ) {
    showMessage(
      `No puedes agregar más ${productAdded.descripcion}... La cantidad en Stock es ${productAdded.cantidad}.`,
      3000,
      "center",
      "none",
      "1rem",
      "0",
      "6rem"
    );
    return;
  } else {
    showMessage(
      "Producto agregado",
      1500,
      "right",
      "uppercase",
      ".8rem",
      "0",
      "1.5rem"
    );
  }
  if (productInShoppingBag) {
    productInShoppingBag.orderQuantity++;
  } else {
    productAdded.orderQuantity = 1;
    productsInShoppingBag.push(productAdded);
  }
  updateNumber();
  localStorage.setItem(
    "products-in-shopping-bag",
    JSON.stringify(productsInShoppingBag)
  );
}
function updateNumber() {
  let newNumber = productsInShoppingBag.reduce(
    (acc, product) => acc + product.orderQuantity,
    0
  );
  number.innerText = newNumber;
  mobileNumber.innerText = newNumber;
}
function showMessage(
  message,
  duration,
  position,
  textTransform,
  fontSize,
  offsetX,
  offsetY
) {
  if (typeof Toastify === "function") {
    Toastify({
      text: message,
      duration: duration,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: position, // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #c7003f, #fc5288)",
        borderRadius: "2rem",
        textTransform: textTransform,
        fontSize: fontSize,
      },
      offset: {
        x: offsetX, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: offsetY, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  } else {
    console.error(
      "La biblioteca Toastify no está disponible. No se pudo mostrar el message:",
      message
    );
    alert(message);
  }
}
