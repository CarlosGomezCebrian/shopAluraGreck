let productsInShoppingBag = localStorage.getItem("products-in-shopping-bag");
productsInShoppingBag = JSON.parse(productsInShoppingBag);
let dbActualizar, phoneNumberText, phoneWhatsapp, dbUpdateStock, dbUpdateStockJ;
getVariables();
async function getVariables() {
  try {
    const shop = "RWxOScOxb0NvbkNhcnJpdG8=";
    const rut = "./php/nodata2.php";
    let urlRut = `http://localhost:3001/variablesPermitidas`;
    const response = await fetch(urlRut);
    const dataJson = await response.json();
    dbUpdateStock = dataJson[0].dbUpdateProducts;
    dbUpdateStockJ = dataJson[0].dbUpdateProductsJ;
    dbActualizar = dataJson[0].dbUpdateProducts;
    phoneNumberText = dataJson[0].phoneNumber;
    phoneWhatsapp = dataJson[0].phoneWhatsapp;
    updateQuantityInShoppingBag();
  } catch (error) {
    console.error("Error al obtener las variables:", error);
    throw error;
  }
}
async function updateQuantityInShoppingBag() {
  try {
    let url = dbUpdateStock;
    const urlj = dbUpdateStockJ;
    const response = await fetch(url);
    const data = await response.json();
    productsInShoppingBag.forEach((productInShoppingBag) => {
      const updatedProduct = data.find(
        (product) => product.id === productInShoppingBag.id
      );
      if (updatedProduct) {
        if (
          parseInt(updatedProduct.cantidad) <
          parseInt(productInShoppingBag.orderQuantity)
        ) {
          productInShoppingBag.cantidad = parseInt(updatedProduct.cantidad);
          productInShoppingBag.orderQuantity = parseInt(
            updatedProduct.cantidad
          );
        } else {
          productInShoppingBag.cantiadad = parseInt(updatedProduct.cantidad);
        }
      } else {
        productInShoppingBag.cantidadad = 0;
        productInShoppingBag.orderQuantity = 0;
      }
      localStoreSetItem();
    });
    generateIdentifier();
    uploadProductsInShoppingBag();
    getIdentifierValue();
  } catch (error) {
    console.error("Error al obtener los nuevos datos:", error);
    throw error;
  }
}
const emptyShoppingBagContainer = document.querySelector("#shoppingBag-empty");
const shoppingBagContainerProducts = document.querySelector(
  "#shoppingBag-products"
);
const shoppingBagActionsContainer = document.querySelector(
  "#shoppingBag-actions"
);
const shoppingBagBoughtContainer = document.querySelector(
  "#shoppingBag-bought"
);
const containerWarning = document.querySelector("#shoppingBag-warning");
const shoppingBagNoteContainer = document.querySelector("#shoppingBag-note");
let deleteButtons = document.querySelectorAll(".shoppingBag-product-delete");
const buttonEmty = document.querySelector("#shoppingBag-actions-empty");
const total = document.querySelector(".total");
const totalQuantity = document.querySelector(".total-quantity");
function uploadProductsInShoppingBag() {
  containerWarning.innerHTML =
    '<i class="bi bi-exclamation-triangle-fill"></i><strong>¡IMPORTANTE!</strong><br>' +
    "Si tu pedido no pudo ser enviado por WhatsApp favor de enviar una captura de esta pantalla al WhatsApp: " +
    '<a class="shoppingBag-bought" href="https://wa.me/' +
    phoneWhatsapp +
    '?text=Te%20envío%20captura%20de%20mi%20pedido" ' +
    'target="_blank" alt="Enlace a WhatsApp" title="Enviar captura por WhatsApp">' +
    '<strong><i class="bi bi-telephone-plus-fill"></i> ' +
    phoneNumberText +
    " </strong></a>";
  if (productsInShoppingBag && productsInShoppingBag.length > 0) {
    emptyShoppingBagContainer.classList.add("disabled");
    containerWarning.classList.add("disabled");
    shoppingBagContainerProducts.classList.remove("disabled");
    shoppingBagActionsContainer.classList.remove("disabled");
    shoppingBagBoughtContainer.classList.add("disabled");
    shoppingBagNoteContainer.classList.add("disabled");
    shoppingBagContainerProducts.innerHTML = "";
    productsInShoppingBag.forEach((product) => {
      let classType = "shoppingBag-product-container-imagen outOfStock";
      if (product.cantidad > 0) {
        classType = "shoppingBag-product-container-imagen";
      }
      let btnRemoveClassType = "btnRemove btnDisabled";
      if (product.orderQuantity > 1) {
        btnRemoveClassType = "btnRemove";
      }
      let btnAddClassType = "btnAdd btnDisabled";
      if (product.orderQuantity < product.cantidad) {
        btnAddClassType = "btnAdd";
      }
      const div = document.createElement("div");
      div.classList.add("shoppingBag-product");
      div.id = product.id;
      div.innerHTML = `
                <div class="${classType}">
                <img class="shoppingBag-product-imagen" src="${
                  product.imagen
                }" alt="${product.descripcion}">
                </div>
                <div class="shoppingBag-product-title">
                    <small>product</small>
                    <h3>${product.descripcion}</h3>
                </div>
                <div class="shoppingBag-product-container">
                <div class="shoppingBag-product-stock">
                <small>Stock</small>
                <p>${product.cantidad}</p>
                </div>
                <div class="shoppingBag-product-quantity ">
                    <small>Cantidad</small>
                    <div class="divQuantity"">
                    <button class="${btnRemoveClassType}"><i class="bi bi-caret-down-fill"></i></button>
                    <p>${product.orderQuantity}</p>
                    <button class="${btnAddClassType}"><i class="bi bi-caret-up-fill"></i></button>
                    </div>
                </div>
                <div class="shoppingBag-product-price">
                    <small>Precio Con ${product.descuento * 100}%dto</small>
                    <p>$${(
                      product.precio -
                      product.precio * product.descuento
                    ).toFixed(2)}</p>
                </div>
                <div class="shoppingBag-product-subtotal">
                    <small>Subtotal</small>
                    <p>$${(
                      (product.precio - product.precio * product.descuento) *
                      product.orderQuantity
                    ).toFixed(2)}</p>
                </div>
                <button class="shoppingBag-product-delete" title = "Eliminar product de Mi bolsa"><i class="bi bi-trash-fill"></i></button>
                </div>
            `;
      shoppingBagContainerProducts.append(div);
    });
    updeteDeleteButtons();
    updeteTotal();
    updateBtn();
  } else {
    emptyShoppingBagContainer.classList.remove("disabled");
    shoppingBagContainerProducts.classList.add("disabled");
    shoppingBagActionsContainer.classList.add("disabled");
    shoppingBagBoughtContainer.classList.add("disabled");
    shoppingBagNoteContainer.classList.add("disabled");
  }
}
function localStoreSetItem() {
  localStorage.setItem(
    "products-in-shopping-bag",
    JSON.stringify(productsInShoppingBag)
  );
}
function updateBtn() {
  const btnRemove = document.querySelectorAll(".btnRemove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", updateBtnRemove);
  });
  const btnAdd = document.querySelectorAll(".btnAdd");
  btnAdd.forEach((btn) => {
    btn.addEventListener("click", updateBtnAdd);
  });
}
function updateBtnRemove() {
  let idParent = this.closest(".shoppingBag-product").id;
  const dataProducts = productsInShoppingBag.find(
    (product) => product.id === idParent
  );
  if (dataProducts.orderQuantity > 1) {
    dataProducts.orderQuantity--;
  }
  localStoreSetItem();
  uploadProductsInShoppingBag();
}
function updateBtnAdd() {
  let idParent = this.closest(".shoppingBag-product").id;
  const dataProducts = productsInShoppingBag.find(
    (product) => product.id === idParent
  );
  if (dataProducts.orderQuantity < dataProducts.cantidad) {
    dataProducts.orderQuantity++;
  }
  localStoreSetItem();
  uploadProductsInShoppingBag();
}
function updeteDeleteButtons() {
  deleteButtons = document.querySelectorAll(".shoppingBag-product-delete");
  deleteButtons.forEach((boton) => {
    boton.addEventListener("click", deleteProduct);
  });
}
function deleteProduct() {
  if (typeof Toastify === "function") {
    Toastify({
      text: "product eliminado",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #c7003f, #fc5288)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem",
      },
      offset: {
        x: "0", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: "1.5rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  } else {
    console.error(
      "La biblioteca Toastify no está disponible. No se pudo mostrar el message:",
      "product eliminado"
    );
    alert("product eliminado");
  }
  let idParent = this.closest(".shoppingBag-product").id;
  const index = productsInShoppingBag.findIndex(
    (product) => product.id === idParent
  );
  productsInShoppingBag.splice(index, 1);
  localStoreSetItem();
  uploadProductsInShoppingBag();
}
buttonEmty.addEventListener("click", emptyShoppingBag);
function emptyShoppingBag() {
  if (typeof Swal === "function") {
    Swal.fire({
      title: "¿Estás seguro?",
      icon: "question",
      html: `Se van a borrar ${productsInShoppingBag.reduce(
        (acc, product) => acc + product.orderQuantity,
        0
      )} productos.`,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      confirmButtonColor: "#c7003f",
    }).then((result) => {
      if (result.isConfirmed) {
        productsInShoppingBag.length = 0;
        localStoreSetItem();
        uploadProductsInShoppingBag();
      }
    });
  } else {
    if (showAlternativeConfirmation("¿Estás seguro?")) {
      productsInShoppingBag.length = 0;
      localStoreSetItem();
      uploadProductsInShoppingBag();
    }
  }
}
function calculateTotals() {
  adjustTheOrderedQuantity(productsInShoppingBag);
  const calculatedTotal = productsInShoppingBag.reduce(
    (acc, product) =>
      acc + product.precio_con_descuento * product.orderQuantity,
    0
  );
  const totalQuantityCalculated = productsInShoppingBag.reduce(
    (acc, product) => acc + product.orderQuantity,
    0
  );
  return { calculatedTotal, totalQuantityCalculated };
}
function updeteTotal() {
  const { calculatedTotal, totalQuantityCalculated } = calculateTotals();
  let piece = totalQuantityCalculated > 1 ? "Pzas" : "Pza";
  total.innerText = `$${calculatedTotal.toFixed(2)}`;
  totalQuantity.innerText = `${totalQuantityCalculated} ${piece}`;
}
function adjustTheOrderedQuantity(products) {
  products.forEach((product) => {
    if (product.cantidad === "0") {
      product.orderQuantity = 0;
    }
  });
}
function buildMessage() {
  let message =
    "Hola, Buen día Carlos.\nMe puedes confirmar existencia de los\nsiguientes productos de *Mi Bolsa*:\n\n";
  adjustTheOrderedQuantity(productsInShoppingBag);
  productsInShoppingBag.forEach((product, index) => {
    let pieceproduct = product.orderQuantity > 1 ? "Pzas" : "Pza";
    let pieceStock = product.cantidad > 0 ? "YY" : "NN";
    message += `*Producto ${index + 1}:*\n`;
    message += `Stock: ${pieceStock}${product.cantidad}${pieceStock}\n`;
    message += `Código: ${product.codigo}\n`;
    message += `Descripción: ${product.descripcion}\n`;
    message += `Precio: $${(product.precio_con_descuento * 1).toFixed(2)}\n`;
    message += `quantity: ${product.orderQuantity} ${pieceproduct}\n`;
    message += `Subtotal: $${
      product.orderQuantity * product.precio_con_descuento
    }\n\n`;
  });
  return message;
}
const botonBuy = document.querySelector("#shoppingBag-actions-buy");
botonBuy.addEventListener("click", sendMessage);
async function sendMessage() {
  try {
    await updateQuantityInShoppingBag();
    const { calculatedTotal, totalQuantityCalculated } = calculateTotals();
    const pieceMessage = totalQuantityCalculated > 1 ? "Pzas" : "Pza";
    const message = buildMessage();
    let data =
      "*Total de productos* " +
      `${totalQuantityCalculated} ${pieceMessage}\n` +
      "*Pago total* " +
      `$${calculatedTotal.toFixed(2)}\n\n`;
    let textBoot = "CarloShopPedido ";
    let orderNumber = generateOrderNumber();
    let phoneNumber = phoneNumberText.replace(/\s/g, "").replace(/-/g, "");
    let alert =
      "*NOTA:*\nEste no es un pedido real solo es para muestra del desarrollo de la página";
    let fullMessage = textBoot + orderNumber + message + data + alert;
    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;
    let newLink = document.createElement("a");
    newLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;
    newLink.classList.add("shoppingBag-actions-buy");
    newLink.setAttribute("alt", "Enlace a WhatsApp");
    newLink.setAttribute("title", "Enviar pedido por WhatsApp");
    newLink.setAttribute("target", "_blank");
    newLink.click();
    updateDB();
    //cleanData();
  } catch (error) {
    console.error("Error al actualizar la cantidad en la bolsa:", error);
  }
}
let numberOfVisits = localStorage.getItem("number-visits");
numberOfVisits = numberOfVisits ? parseInt(numberOfVisits) : 0;
numberOfVisits++;
localStorage.setItem("number-visits", numberOfVisits);
function generateOrderNumber() {
  let dateHour = new Date();
  return `${numberOfVisits}_${dateHour.getFullYear()}${padZero(
    dateHour.getMonth() + 1
  )}${padZero(dateHour.getDate())}_${hourFormat(dateHour)}\n\n`;
}
function hourFormat(date) {
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}${minutes}`;
}
function padZero(num) {
  return (num < 10 ? "0" : "") + num;
}
function cleanData() {
  productsInShoppingBag.length = 0;
  localStoreSetItem();
  emptyShoppingBagContainer.classList.add("disabled");
  shoppingBagContainerProducts.classList.add("disabled");
  shoppingBagActionsContainer.classList.add("disabled");
  shoppingBagBoughtContainer.classList.remove("disabled");
  containerWarning.classList.remove("disabled");
  shoppingBagNoteContainer.classList.remove("disabled");
  let paragraph = document.getElementById("shoppingBag-bought");
  let note = document.getElementById("shoppingBag-note");
  let phoneNumberScreen = phoneNumberText.replace(/\s/g, "").replace(/-/g, "");
  paragraph.innerHTML =
    'Muchas gracias por tu compra.<i class="bi bi-emoji-laughing"></i><br><br>';
  note.innerHTML =
    '<i class="bi bi-exclamation-triangle-fill"></i><strong>¡NOTA!</strong><br>' +
    "Este no es un pedido real, solo es una muestra del desarollo de la página " +
    '<a class="shoppingBag-bought" href="https://wa.me/' +
    phoneNumberScreen +
    '?text=Me%20interesa%20una%20página%20similar%20me%20puedes%20dar%20información" ' +
    'target="_blank" alt="Enlace a WhatsApp" title="Enviar mensaje por WhatsApp">' +
    '<strong><i class="bi bi-telephone-plus-fill"></i> ' +
    phoneNumberText +
    " </strong></a>";
}
function updateDB() {
  productsInShoppingBag.forEach((product, index) => {
    const nuevaCantidad = product.cantidad - product.orderQuantity;
    const idProducto = parseInt(product.id);
    const dataUpdate = { cantidad: nuevaCantidad };
    console.log("dataUpdate", JSON.stringify(dataUpdate));
    fetch(`${dbUpdateStock}/${idProducto}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error when trying to update quantity");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  const newOrderNumber = generateOrderNumber().trim();
  localStorage.setItem("orderNumber", newOrderNumber);
  updateOrderNumber();
  cleanData();
}
function obtainOrGenerateOrderNumber() {
  let orderNumber = localStorage.getItem("orderNumber");
  if (!orderNumber) {
    orderNumber =
      "¡UPS! Lo sentimos no tienes compras registradas en los utimos días";
    localStorage.setItem("orderNumber", orderNumber);
  }
  return orderNumber;
}
function updateOrderNumber() {
  const orderNumberElement = document.getElementById("order-number");
  const orderNumber = obtainOrGenerateOrderNumber();
  orderNumberElement.textContent = orderNumber;
}
window.addEventListener("load", updateOrderNumber);
//localStorage.removeItem("orderNumber");
//localStorage.removeItem("number-visits");
function generateIdentifier() {
  return Math.random().toString(36).substr(2, 9);
}
if (!document.cookie.includes("u")) {
  let Identifier = generateIdentifier();
  document.cookie = `u=${Identifier}; path=/; max-age=31536000`;
}
function getIdentifierValue() {
  let cookieString = document.cookie;
  let Identifier = null;
  let cookies = cookieString.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith("u=")) {
      Identifier = cookie.substring(2);
      break;
    }
  }
  return Identifier;
}
