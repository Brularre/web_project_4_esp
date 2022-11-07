/* IMPORTS */

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithImage, PopupWithForm } from "../components/Popup.js";

import {
  cards,
  cardSelectors,
  validationConfig,
  addBtn,
  editBtn,
  profileName,
  profileDescription,
  cardsContainer,
  cardTemplate,
  cardPopup,
  formList,
  addFormSelector,
  editFormSelector,
  placeName,
  placeLink,
  formName,
  formDescription,
} from "../utils/constants.js";

/* CARD INJECTOR */

const cardList = new Section(
  {
    items: cards,
    renderer: (item) => {
      const newCard = new Card(item, cardTemplate);
      const cardElement = newCard.generateCard(cardSelectors);
      cardList.addItem(cardElement);
    },
  },
  cardsContainer
);

cardList.renderItems();

/* USER METHODS */

const userInfo = new UserInfo({
  name: profileName,
  description: profileDescription,
});

/* ADD VALIDATION INSTANCES */

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

/* POPUP INSTANCES  */

// const imagePopup = new PopupWithImage(cardPopup, {
//   handleCardClick: () => {},
// });

function createCard(data) {
  const newCard = new Card(data, cardTemplate);
  const cardElement = newCard.generateCard(cardSelectors);
  cardsContainer.prepend(cardElement);
}

const addForm = new PopupWithForm(addFormSelector, {
  submitCallback: (evt) => {
    // evt.preventDefault();
    // const cardData = { name: placeName.value, src: placeLink.value };
    // const newCard = new Card(data, cardTemplate);
    // const cardElement = newCard.generateCard(cardSelectors);
    // cardsContainer.prepend(cardElement);
    // evt.target.reset();
    // formValidators[addFormSelector].resetValidation();
    // handleClosePopup();
  },
});

addForm._setEventListeners();

const editForm = new PopupWithForm(editFormSelector, {
  submitCallback: (evt) => {
    evt.preventDefault();
    const { ["profile-name"]: username, ["profile-description"]: description } =
      editForm._getInputValues();
    profileName.textContent = username;
    profileDescription.textContent = description;
    editForm.closePopup();
  },
});

editForm._setEventListeners();

addBtn.addEventListener("click", () => {
  addForm.openPopup();
  formValidators[addFormSelector].resetValidation();
});

/* EDIT FORM LOGIC  */

editBtn.addEventListener("click", () => {
  editForm.openPopup();
  formValidators[editFormSelector].resetValidation();
});
