const cards = [
  {
    cardName: "Times Square",
    src: "./images/elements-img-TimesSquare.jpg",
    alt: "Fotografía de Times Square en NYC",
  },
  {
    cardName: "Monte Rushmore",
    src: "./images/elements-img-Rushmore.jpg",
    alt: "Fotografía del Monte Rushmore en Dakota del Sur",
  },
  {
    cardName: "Puerta de las Nubes",
    src: "./images/elements-img-CloudGate.jpg",
    alt: "Fotografía de la Cloud Gate en Chicago",
  },
  {
    cardName: "Golden Gate",
    src: "./images/elements-img-GoldenGate.jpg",
    alt: "Fotografía del Puente Golden Gate en San Francisco",
  },
  {
    cardName: "Empire State",
    src: "./images/elements-img-EmpireState.jpg",
    alt: "Fotografía del edificio Empire State en NYC",
  },
  {
    cardName: "Yellowstone",
    src: "./images/elements-img-Yellowstone.jpg",
    alt: "Fotografía del Parque Nacional Yellowstone",
  },
];

const cardSelectors = {
  cardName: ".elements__name",
  cardImage: ".elements__image",
  cardLike: ".elements__like-btn",
  cardDelete: ".elements__del-btn",
  cardPopup: "#popup__image",
  cardPopupCaption: ".popup__image-caption",
  cardPopupImage: ".popup__image",
};

const validationConfig = {
  formSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-msg",
};

/* MARKUP SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document
  .querySelector("#template_cards")
  .content.querySelector(".elements__card");

/* POPUP SELECTORS */

const formList = Array.from(document.forms);
const imagePopupSelector = "popup__image";
const addFormSelector = "popup__add-form";
const editFormSelector = "popup__edit-form";

const placeName = document.querySelector("#place-name");
const placeLink = document.querySelector("#place-link");
const formName = document.querySelector("#profile-name");
const formDescription = document.querySelector("#profile-description");

export {
  cards,
  cardSelectors,
  validationConfig,
  addBtn,
  editBtn,
  profileName,
  profileDescription,
  cardsContainer,
  cardTemplate,
  formList,
  imagePopupSelector,
  addFormSelector,
  editFormSelector,
  placeName,
  placeLink,
  formName,
  formDescription,
};
