/* MARKUP SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const cardsContainerSelector = ".elements";
const cardTemplate = document
  .querySelector("#template_cards")
  .content.querySelector(".elements__card");

/* POPUP SELECTORS */

const formList = Array.from(document.forms);
const deleteCardSelector = "popup__delete-card";
const imagePopupSelector = "popup__image";
const addFormSelector = "popup__add-form";
const editFormSelector = "popup__edit-form";

const placeName = document.querySelector("#place-name");
const placeLink = document.querySelector("#place-link");
const formName = document.querySelector("#profile-name");
const formAbout = document.querySelector("#profile-about");

const cardSelectors = {
  cardName: ".elements__name",
  cardImage: ".elements__image",
  cardLike: ".elements__like-btn",
  cardNumber: ".elements__like-number",
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

const apiConfig = {
  baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_02/",
  headers: {
    authorization: "3a5f7fd0-4f77-4f83-8848-cbfc8ddc2f6c",
    "Content-Type": "application/json; charset=UTF-8",
  },
};

const userInfoConfig = {
  name: profileName,
  about: profileAbout,
};

export {
  cardSelectors,
  validationConfig,
  apiConfig,
  userInfoConfig,
  addBtn,
  editBtn,
  profileName,
  profileAbout,
  cardsContainerSelector,
  cardTemplate,
  formList,
  deleteCardSelector,
  imagePopupSelector,
  addFormSelector,
  editFormSelector,
  placeName,
  placeLink,
  formName,
  formAbout,
};

// const timesSquareImage = new URL(
//   "../images/elements-img-TimesSquare.jpg",
//   import.meta.url
// );
// const rushmoreImage = new URL(
//   "../images/elements-img-Rushmore.jpg",
//   import.meta.url
// );
// const cloudGateImage = new URL(
//   "../images/elements-img-CloudGate.jpg",
//   import.meta.url
// );
// const goldenGateImage = new URL(
//   "../images/elements-img-GoldenGate.jpg",
//   import.meta.url
// );
// const empireStateImage = new URL(
//   "../images/elements-img-EmpireState.jpg",
//   import.meta.url
// );
// const yellowstoneImage = new URL(
//   "../images/elements-img-Yellowstone.jpg",
//   import.meta.url
// );

// const cards = [
//   {
//     cardName: "Times Square",
//     src: timesSquareImage,
//     alt: "Fotografía de Times Square en NYC",
//   },
//   {
//     cardName: "Monte Rushmore",
//     src: rushmoreImage,
//     alt: "Fotografía del Monte Rushmore en Dakota del Sur",
//   },
//   {
//     cardName: "Puerta de las Nubes",
//     src: cloudGateImage,
//     alt: "Fotografía de la Cloud Gate en Chicago",
//   },
//   {
//     cardName: "Golden Gate",
//     src: goldenGateImage,
//     alt: "Fotografía del Puente Golden Gate en San Francisco",
//   },
//   {
//     cardName: "Empire State",
//     src: empireStateImage,
//     alt: "Fotografía del edificio Empire State en NYC",
//   },
//   {
//     cardName: "Yellowstone",
//     src: yellowstoneImage,
//     alt: "Fotografía del Parque Nacional Yellowstone",
//   },
// ];
