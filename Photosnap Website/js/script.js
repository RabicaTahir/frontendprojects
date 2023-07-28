"use strict";

// MOBILE MENU
const menuToggler = document.querySelector("#menu-toggler");
const fadeElements = document.querySelectorAll(".has-fade");
const header = document.querySelector(".header");
const body = document.querySelector("body");

menuToggler.addEventListener("click", function () {
  if (header.classList.contains("open")) {
    header.classList.remove("open");
    fadeElements.forEach((element) => {
      element.classList.remove("fade-in");
      element.classList.add("fade-out");
    });
    body.classList.remove("noscroll");
  } else {
    header.classList.add("open");
    fadeElements.forEach((element) => {
      element.classList.add("fade-in");
      element.classList.remove("fade-out");
    });
    body.classList.add("noscroll");
  }
});

// PRICE TOGGLE ON CLICKING TOGGLE BUTTON
const toggleButton = document.querySelector("#toggle-element");
const basicPrice = document.querySelector(".basic-price");
const proPrice = document.querySelector(".pro-price");
const businessPrice = document.querySelector(".business-price");
const subscriptionTypeElems = document.querySelectorAll(".subscription-type");

const monthlyPrices = {
  subscriptionType: "per month",
  basic: "$19.00",
  pro: "$39.00",
  business: "$99.00",
};

const yearlyPrices = {
  subscriptionType: "per year",
  basic: "$190.00",
  pro: "$390.00",
  business: "$990.00",
};

let subscriptionMonthly = true;

if (toggleButton) {
  toggleButton.addEventListener("click", function () {
    if (subscriptionMonthly) {
      basicPrice.textContent = yearlyPrices.basic;
      proPrice.textContent = yearlyPrices.pro;
      businessPrice.textContent = yearlyPrices.business;

      subscriptionTypeElems.forEach((element) => {
        element.textContent = yearlyPrices.subscriptionType;
      });
      subscriptionMonthly = false;
    } else {
      basicPrice.textContent = monthlyPrices.basic;
      proPrice.textContent = monthlyPrices.pro;
      businessPrice.textContent = monthlyPrices.business;

      subscriptionTypeElems.forEach((element) => {
        element.textContent = monthlyPrices.subscriptionType;
      });
      subscriptionMonthly = true;
    }
  });
}