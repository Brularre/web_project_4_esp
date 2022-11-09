/* IMPORTS */

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

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
  formList,
  imagePopupSelector,
  addFormSelector,
  editFormSelector,
  placeName,
  placeLink,
} from "../utils/constants.js";

/* USER METHODS */

const userInfo = new UserInfo({
  name: profileName,
  description: profileDescription,
});

/* IMAGE POPUP LOGIC */

const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup._setEventListeners();

/* CARD INJECTOR */

const cardList = new Section(
  {
    items: cards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  cardsContainer
);

const createCard = (cardData) => {
  const newCard = new Card(cardData, cardTemplate, {
    handleCardClick: function () {
      const popupCaption = newCard._cardName.textContent;
      imagePopup.openPopup(this, popupCaption);
    },
  });
  const cardElement = newCard.generateCard(cardSelectors);
  return cardElement;
  cardList.addItem(cardElement);
};

cardList.renderItems();

/* ADD FORM LOGIC */

const addForm = new PopupWithForm(addFormSelector, {
  submitCallback: (evt) => {
    evt.preventDefault();
    const cardData = { cardName: placeName.value, src: placeLink.value };
    cardsContainer.prepend(createCard(cardData));
    formValidators[addFormSelector].resetValidation();
    addForm.closePopup();
  },
});

addForm._setEventListeners();

addBtn.addEventListener("click", () => {
  addForm.openPopup();
  formValidators[addFormSelector].resetValidation();
});

/* EDIT FORM LOGIC */

const editForm = new PopupWithForm(editFormSelector, {
  submitCallback: (evt) => {
    evt.preventDefault();
    const { ["profile-name"]: username, ["profile-description"]: description } =
      editForm._getInputValues();
    userInfo.setUserInfo(username, description);
    editForm.closePopup();
  },
});

editForm._setEventListeners();

editBtn.addEventListener("click", () => {
  const { username, description } = userInfo.getUserInfo();
  editForm._setInputValues([username, description]);
  editForm.openPopup();
  formValidators[editFormSelector].resetValidation();
});

/* VALIDATION LOGIC */

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
