const navbar = document.querySelector("nav");
const openMenu = document.getElementById("menu-button");
const closeMenu = document.getElementById("menu-close");

openMenu.addEventListener("click", () => {
  navbar.classList.add("open");
});

closeMenu.addEventListener("click", () => {
  navbar.classList.remove("open");
});