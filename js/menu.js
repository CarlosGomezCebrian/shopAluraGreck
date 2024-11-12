document.addEventListener("DOMContentLoaded", function () {
  const openMenu = document.querySelector("#open-menu");
  const closeMenu = document.querySelector("#close-menu");
  const aside = document.querySelector("aside");
  const headerMobile = document.querySelector(".header-mobile");

  openMenu.addEventListener("click", function (event) {
    event.stopPropagation();
    aside.classList.add("aside-visible");
    headerMobile.style.zIndex = "unset";
  });

  closeMenu.addEventListener("click", function () {
    aside.classList.remove("aside-visible");
    headerMobile.style.zIndex = "1000";
  });
  document.addEventListener("click", function (event) {
    if (!aside.contains(event.target) && event.target !== openMenu) {
      aside.classList.remove("aside-visible");
      headerMobile.style.zIndex = "1000";
    }
  });
});
