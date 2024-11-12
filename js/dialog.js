import { updatedproducts } from "./requireData.js";
import { hideLoader } from "./loader.js";
document.addEventListener("imgLoaded", function () {
  const openDialog = document.querySelectorAll(".product-image");
  const openDialogBtn = document.querySelectorAll(
    ".product-information-button"
  );
  setTimeout(() => {
    hideLoader();
  }, 1000);
  openDialog.forEach((img) => {
    img.addEventListener("click", showDialog);
  });
  openDialogBtn.forEach((btn) => {
    btn.addEventListener("click", showDialog);
  });
  function showDialog() {
    let idParent = this.closest(".product").id;
    const dataProducts = updatedproducts.find(
      (product) => product.id === idParent
    );
    if (!dataProducts) {
      console.error("Producto no encontrado en la variable productos");
      alert("Producto no encontrado");
      return;
    }
    loadDialog(dataProducts);
  }
  function loadDialog(dataDialog) {
    const dataDialogID = dataDialog.id;
    const containerDialog = document.getElementById(dataDialogID);
    const glasDiv = document.createElement("div");
    glasDiv.setAttribute("class", "glassEffectDialog");
    const dialog = document.createElement("dialog");
    dialog.setAttribute("class", "dialog");
    dialog.setAttribute("tabindex", "-1");
    const image = document.createElement("img");
    image.classList.add("dialog-image");
    image.src = dataDialog.imagen;
    image.setAttribute("width", "300px");
    image.alt = dataDialog.descripcion;
    const divText = document.createElement("div");
    divText.classList.add("dialog-text");
    const description = document.createElement("span");
    description.classList.add("dialog-description");
    description.textContent = dataDialog.descripcion;
    divText.appendChild(description);
    const fullDescription = document.createElement("p");
    fullDescription.classList.add("dialog-fullDescription");
    fullDescription.textContent = dataDialog.descripcionCompleta;
    divText.appendChild(fullDescription);
    if (dataDialog.materiales) {
      const detailsMaterials = document.createElement("details");
      detailsMaterials.classList.add("dialog-details");
      const summaryMaterials = document.createElement("summary");
      summaryMaterials.classList.add("dialog-summary");
      summaryMaterials.textContent = "Materiales";
      const materials = document.createElement("p");
      materials.classList.add("dialog-materials");
      materials.textContent = dataDialog.materiales;
      detailsMaterials.appendChild(summaryMaterials);
      detailsMaterials.appendChild(materials);
      divText.appendChild(detailsMaterials);
    }
    const btnClose = document.createElement("button");
    btnClose.classList.add("dialog-buttonClose");
    btnClose.title = "Cerrar Ventana";
    const iClose = document.createElement("i");
    iClose.classList.add("bi", "bi-x");
    btnClose.appendChild(iClose);
    divText.appendChild(btnClose);
    dialog.appendChild(image);
    dialog.appendChild(divText);
    glasDiv.appendChild(dialog);
    containerDialog.appendChild(glasDiv);
    const btnCloseDialog = document.querySelector(".dialog-buttonClose");
    btnCloseDialog.addEventListener("click", () => {
      dialog.close();
      dialog.remove();
      glasDiv.remove();
    });
    const dialogLoadedEvent = new Event("dialogLoaded");
    document.dispatchEvent(dialogLoadedEvent);
  }
  document.addEventListener("dialogLoaded", function () {
    setTimeout(openModal, 200);
  });
  function openModal() {
    const dialog = document.querySelector(".dialog");
    dialog.showModal();
  }
});
