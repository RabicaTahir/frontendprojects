"use strict";

// ====== SLIDER ======
const slider = function () {
  // Selecting Elements
  const btnNext = document.querySelector(".brand__btn-right");
  const btnPrev = document.querySelector(".brand__btn-left");
  const brand = document.querySelectorAll(".brand");

  let contSlide = 0;
  let indexTesti = brand.length - 1;

  const slideShow = function (opr) {
    brand.forEach((b) => b.classList.remove("active"));
    brand[opr].classList.add("active");
  };

  const normalOpacity = function (opa) {
    brand[opa].style.opacity = 1;
  };

  const returnSlide = function (index) {
    brand[contSlide].style.opacity = 0;
    contSlide = index;
    brand[contSlide].style.opacity = 1;

    slideShow(index);

    normalOpacity(index);
  };

  // Logic for next
  const nextSlide = function () {
    if (contSlide !== indexTesti) {
      brand[contSlide + 1].previousElementSibling.style.opacity = 0;

      normalOpacity(+`${contSlide + 1}`);

      slideShow(+`${contSlide + 1}`);

      contSlide += 1;
    } else {
      returnSlide(0);
    }
  };

  // Logic to go previous
  const prevSlide = function () {
    if (contSlide <= indexTesti && contSlide !== 0) {
      brand[contSlide].style.opacity = 0;

      normalOpacity(+`${contSlide - 1}`);

      slideShow(+`${contSlide - 1}`);

      contSlide -= 1;
    } else {
      returnSlide(indexTesti);
    }
  };

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);

  // Slide with keydown
  document.addEventListener("keydown", function (e) {
    // short circuit
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });
};
slider();

// ====== Revealing Elements on Scroll ======
const allSection = document.querySelectorAll(".section");

const displaySection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  else entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(displaySection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// ====== Menu fade animation ======
const nav = document.querySelector(".nav");

const menuAnimation = function (opacity) {
  return function (e) {
    const clicked = e.target.closest(".nav__link");

    if (!clicked) return;

    if (clicked.classList.contains("nav__link")) {
      const link = e.target;
      const sibling = document.querySelectorAll(".nav__link");
      const logo = nav.closest(".header-box").querySelector(".header__logo");
      const btn = nav.closest(".header-box").querySelector(".nav__btn");

      sibling.forEach((el) => {
        if (el !== link) el.style.opacity = opacity;
      });
      logo.style.opacity = opacity;
      btn.opacity = opacity;
    }
  };
};

nav.addEventListener("mouseover", menuAnimation(0.5));
nav.addEventListener("mouseout", menuAnimation(1));

// ====== Menu mobile ======
const menuButton = document.querySelector('[data-menu="button"');

const menuList = document.querySelector('[data-menu="menu-list"');
const eventAdd = "click";
const classAct = "active";

const openMenu = function () {
  menuList.classList.add(classAct);
  menuButton.classList.add(classAct);
  menuButton.setAttribute("aria-expanded", "true");

  outsideClick(menuList, eventAdd, () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuList.classList.remove(classAct);
    menuButton.classList.remove(classAct);
  });
};

menuButton.addEventListener(eventAdd, openMenu);

function outsideClick(element, eventAdd, callback) {
  const html = document.querySelector("html");
  const outside = "data-outside";

  if (!element.hasAttribute(outside)) {
    setTimeout(() => html.addEventListener(eventAdd, handleOutsideClick));
    element.setAttribute(outside, "");
  }

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      html.removeEventListener(eventAdd, handleOutsideClick);
      callback();
    }
  }
}