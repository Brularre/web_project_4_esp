/* IMPORTS */

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { cards, validationConfig } from "../utils/constants.js";
import { openPopup, handleClosePopup } from "../utils/utils.js";

/* CONFIGURATION OBJECTS */

/* SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document
  .querySelector("#template_cards")
  .content.querySelector(".elements__card");

/* POPUP FORM SELECTORS */

const formList = Array.from(document.forms);
const addForm = document.querySelector("#popup__add-form");
const editForm = document.querySelector("#popup__edit-form");

const placeName = addForm.querySelector("#place-name");
const placeLink = addForm.querySelector("#place-link");
const formName = editForm.querySelector("#profile-name");
const formDescription = editForm.querySelector("#profile-description");

/* CARD INJECTOR */

function createCard(data) {
  const newCard = new Card(data, cardTemplate);
  const cardElement = newCard.generateCard();
  cardsContainer.prepend(cardElement);
}

(function renderCards() {
  cards.forEach(createCard);
})();

/* POPUP CLOSE LISTENERS */

(function setPopupEventListeners() {
  const popupCloseBtnList = document.querySelectorAll(".popup__close-btn");
  popupCloseBtnList.forEach((popupCloseBtn) => {
    popupCloseBtn.addEventListener("click", handleClosePopup);
  });
})();

/* ADD VALIDATION */

const formValidators = {};

const enableValidation = (validationConfig) => {
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

/* ADD FORM LOGIC */

addBtn.addEventListener("click", () => {
  openPopup(addForm);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = { name: placeName.value, src: placeLink.value };
  createCard(cardData);
  evt.target.reset();
  formValidators["add-place"].resetValidation();
  handleClosePopup();
});

/* EDIT FORM LOGIC  */

editBtn.addEventListener("click", () => {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  openPopup(editForm);
  formValidators["edit-profile"].resetValidation();
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  handleClosePopup();
});
