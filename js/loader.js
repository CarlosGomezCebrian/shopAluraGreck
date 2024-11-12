const containerProducts = document.querySelector("#product-container");
function createLoader() {
  const loaderContainer = document.createElement("div");
  loaderContainer.classList.add("loader");
  for (let i = 0; i < 4; i++) {
    const span = document.createElement("span");
    loaderContainer.appendChild(span);
  }
  containerProducts.appendChild(loaderContainer);
}

export function showLoader() {
  if (containerProducts) {
    createLoader();
    containerProducts.classList.add("loading");
  }
}
export function hideLoader() {
  const loaderContainer = document.querySelector(".loader");
  containerProducts.classList.remove("loading");
  if (loaderContainer) {
    loaderContainer.remove();
  }
}
