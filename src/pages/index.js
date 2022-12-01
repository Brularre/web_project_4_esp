/* IMPORTS */

import "./index.css";
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
  cardsContainerSelector,
  cardTemplate,
  formList,
  imagePopupSelector,
  addFormSelector,
  editFormSelector,
} from "../utils/constants.js";

/* USER METHODS */

const userInfo = new UserInfo({
  name: profileName,
  description: profileDescription,
});

/* IMAGE POPUP LOGIC */

const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup.setEventListeners();

/* CARD INJECTOR */

const cardList = new Section(
  {
    items: cards,
    renderer: (item) => {
      cardList.appendItem(createCard(item));
    },
  },
  cardsContainerSelector
);

const createCard = (cardData) => {
  const newCard = new Card(cardData, cardTemplate, {
    handleCardClick: function (evt) {
      const popupCaption = newCard._cardName.textContent;
      imagePopup.openPopup(evt.target, popupCaption);
    },
  });
  const cardElement = newCard.generateCard(cardSelectors);
  return cardElement;
};

cardList.renderItems();

/* ADD FORM LOGIC */

const addForm = new PopupWithForm(addFormSelector, {
  submitCallback: (evt) => {
    evt.preventDefault();
    const { ["place-name"]: cardName, ["place-link"]: src } =
      addForm.getInputValues();
    cardList.prependItem(createCard({ cardName, src }));
    formValidators[addFormSelector].resetValidation();
    addForm.closePopup();
  },
});

addForm.setEventListeners();

addBtn.addEventListener("click", () => {
  addForm.openPopup();
  formValidators[addFormSelector].resetValidation();
});

/* EDIT FORM LOGIC */

const editForm = new PopupWithForm(editFormSelector, {
  submitCallback: (evt) => {
    evt.preventDefault();
    const { ["profile-name"]: username, ["profile-description"]: description } =
      editForm.getInputValues();
    userInfo.setUserInfo(username, description);
    editForm.closePopup();
  },
});

editForm.setEventListeners();

editBtn.addEventListener("click", () => {
  const { username, description } = userInfo.getUserInfo();
  editForm.setInputValues([username, description]);
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
