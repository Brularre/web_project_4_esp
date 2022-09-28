/* IMPORTS */

import Card from "./Card.js";
import { AddCardForm, EditProfileForm } from "./PopupForm.js";

/* GLOBAL SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");

/* RENDERING OBJECTS */

const cards = [
  {
    name: "Times Square",
    src: "./images/elements-img-TimesSquare.jpg",
    alt: "Fotografía de Times Square en NYC",
  },
  {
    name: "Monte Rushmore",
    src: "./images/elements-img-Rushmore.jpg",
    alt: "Fotografía del Monte Rushmore en Dakota del Sur",
  },
  {
    name: "Puerta de las Nubes",
    src: "./images/elements-img-CloudGate.jpg",
    alt: "Fotografía de la Cloud Gate en Chicago",
  },
  {
    name: "Golden Gate",
    src: "./images/elements-img-GoldenGate.jpg",
    alt: "Fotografía del Puente Golden Gate en San Francisco",
  },
  {
    name: "Empire State",
    src: "./images/elements-img-EmpireState.jpg",
    alt: "Fotografía del edificio Empire State en NYC",
  },
  {
    name: "Yellowstone",
    src: "./images/elements-img-Yellowstone.jpg",
    alt: "Fotografía del Parque Nacional Yellowstone",
  },
];

const addForm = [
  {
    title: "Nuevo lugar",
  },
  {
    select: "firstInput",
    name: "place-name",
    id: "place-name",
    placeholder: "Título",
    type: "text",
    minlength: "2",
    maxlength: "30",
    errorIdentifier: "popup__error-msg-one",
    errorLocation: "popup__error-place-name",
  },
  {
    select: "secondInput",
    name: "place-link",
    id: "place-link",
    placeholder: "Enlace a la imagen",
    type: "url",
    minlength: "",
    maxlength: "",
    errorIdentifier: "popup__error-msg-two",
    errorLocation: "popup__error-place-link",
  },
];

const editForm = [
  {
    title: "Editar perfil",
  },
  {
    select: "firstInput",
    name: "profile-name",
    id: "profile-name",
    placeholder: "Usuario",
    type: "text",
    minlength: "2",
    maxlength: "40",
    errorIdentifier: "popup__error-msg-one",
    errorLocation: "popup__error-profile-name",
  },
  {
    select: "secondInput",
    name: "profile-description",
    id: "profile-description",
    placeholder: "Descripción",
    type: "text",
    minlength: "2",
    maxlength: "200",
    errorIdentifier: "popup__error-msg-two",
    errorLocation: "popup__error-profile-description",
  },
];

/* CARD INJECTOR */

(function renderCards() {
  cards.forEach((item) => {
    const newCard = new Card(item);
    const cardElement = newCard.generateCard();
    const cardsContainer = document.querySelector(".elements");
    cardsContainer.append(cardElement);
  });
})();

/* ADD CARD BUTTON LOGIC */

addBtn.addEventListener("click", () => {
  const formElement = document.querySelector(".popup");
  const modalElement = document.querySelector(".modal-box");
  if (formElement || modalElement) {
    return;
  }
  const newPopupForm = new AddCardForm(addForm, "Nuevo lugar");
  const popupElement = newPopupForm.generatePopupForm();
  document.body.prepend(popupElement);
});

/* EDIT PROFILE BUTTON LOGIC */

editBtn.addEventListener("click", () => {
  const formElement = document.querySelector(".popup");
  const modalElement = document.querySelector(".modal-box");
  if (formElement || modalElement) {
    return;
  }
  const newPopupForm = new EditProfileForm(editForm, "Editar perfil");
  const popupElement = newPopupForm.generatePopupForm();
  document.body.prepend(popupElement);
});
