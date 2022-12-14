/* MARKUP SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const avatarBtn = document.querySelector(".profile__avatar-wrapper");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileAvatar = document.querySelector(".profile__avatar");
const cardsContainerSelector = ".elements";
const cardTemplate = document
  .querySelector("#template_cards")
  .content.querySelector(".elements__card");

/* POPUP SELECTORS */

const formList = Array.from(document.forms);
const deleteCardSelector = "popup__delete-card";
const imagePopupSelector = "popup__image";
const addFormSelector = "popup__add-form";
const editFormSelector = "popup__edit-profile";
const avatarFormSelector = "popup__edit-avatar";

const placeName = document.querySelector("#place-name");
const placeLink = document.querySelector("#place-link");
const formName = document.querySelector("#profile-name");
const formAbout = document.querySelector("#profile-about");

/* CONFIG OBJECTS */

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
  baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_02",
  headers: {
    authorization: "3a5f7fd0-4f77-4f83-8848-cbfc8ddc2f6c",
    "Content-Type": "application/json; charset=UTF-8",
  },
};

const userInfoConfig = {
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar,
};

export {
  addBtn,
  editBtn,
  avatarBtn,
  profileName,
  profileAbout,
  cardsContainerSelector,
  cardTemplate,
  formList,
  deleteCardSelector,
  imagePopupSelector,
  addFormSelector,
  editFormSelector,
  avatarFormSelector,
  placeName,
  placeLink,
  formName,
  formAbout,
  cardSelectors,
  validationConfig,
  apiConfig,
  userInfoConfig,
};
