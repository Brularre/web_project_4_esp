/* IMPORTS */

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { cards, validationConfig } from "../utils/constants.js";
import { openPopup } from "../utils/utils.js";

/* CONFIGURATION OBJECTS */

/* SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardsContainer = document.querySelector(".elements");

/* POPUP FORM SELECTORS */

const addForm = document.querySelector("#popup__add-form");
const editForm = document.querySelector("#popup__edit-form");

const placeName = addForm.querySelector("#place-name");
const placeLink = addForm.querySelector("#place-link");
const formName = editForm.querySelector("#profile-name");
const formDescription = editForm.querySelector("#profile-description");

/* CARD INJECTOR */

function createCard(data) {
  const newCard = new Card(data);
  const cardElement = newCard.generateCard();
  cardsContainer.prepend(cardElement);
}

(function renderCards() {
  cards.forEach((item) => {
    createCard(item);
  });
})();

/* ADD VALIDATION */

(function addValidation() {
  const popupFormList = document.querySelectorAll(".popup__form");
  popupFormList.forEach((popupForm) => {
    const validateForm = new FormValidator(validationConfig, popupForm);
    validateForm.enableValidation();
  });
})();

/* RESET VALIDATION */

function resetValidation(form) {
  const validateForm = new FormValidator(validationConfig, form);
  validateForm.resetValidation;
}

/* ADD FORM LOGIC */

addBtn.addEventListener("click", () => {
  resetValidation(addForm);
  openPopup(addForm);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = { name: placeName.value, src: placeLink.value };
  createCard(cardData);
  placeName.value = "";
  placeLink.value = "";
  handleClosePopup();
});

/* EDIT FORM LOGIC  */

editBtn.addEventListener("click", () => {
  resetValidation(editForm);
  openPopup(editForm);
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  handleClosePopup();
});

/* CARD POPUP LOGIC */

(function setPopupEventListeners() {
  const popupCloseBtnList = document.querySelectorAll(".popup__close-btn");
  popupCloseBtnList.forEach((popupCloseBtn) => {
    popupCloseBtn.addEventListener("click", handleClosePopup);
  });
  document.addEventListener("keydown", handleCloseEsc);
  document.addEventListener("click", handleCloseOutsideClick);
})();

function checkPopupActive() {
  const activePopup = document.querySelector(".popup_active") ? true : false;
  return activePopup;
}

function handleClosePopup() {
  const delayValueMs = 600;
  if (checkPopupActive()) {
    const activePopup = document.querySelector(".popup_active");
    activePopup.style.animation = "0.6s fadeout ease";
    setTimeout(function () {
      activePopup.classList.remove("popup_active");
      activePopup.removeAttribute("style");
    }, delayValueMs);
  }
}

function handleCloseEsc(evt) {
  if (evt.code === "Escape") {
    handleClosePopup();
  }
}

function handleCloseOutsideClick(evt) {
  const parent = evt.target.closest(".popup");
  if (!parent) {
    handleClosePopup();
  }
}
