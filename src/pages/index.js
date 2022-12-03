/* IMPORTS */

import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {
  cardSelectors,
  validationConfig,
  apiConfig,
  userInfoConfig,
  addBtn,
  editBtn,
  cardsContainerSelector,
  cardTemplate,
  formList,
  imagePopupSelector,
  addFormSelector,
  editFormSelector,
} from "../utils/constants.js";

/* CLASS INSTANCES */

// Api
const api = new Api(apiConfig);

// User
const userInfo = new UserInfo(userInfoConfig);

// Image Popup
const imagePopup = new PopupWithImage(imagePopupSelector);

// Card Section
const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.appendItem(createCard(item));
    },
  },
  cardsContainerSelector
);

// Add Form
const addForm = new PopupWithForm(addFormSelector, {
  submitCallback: (evt) => {
    evt.preventDefault();
    const { ["place-name"]: name, ["place-link"]: link } =
      addForm.getInputValues();
    api
      .postContent(name, link)
      .then((res) => {
        return res.ok
          ? cardSection.prependItem(createCard({ name, link }))
          : Promise.reject(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
    formValidators[addFormSelector].resetValidation();
    addForm.closePopup();
  },
});

addForm.setEventListeners();

addBtn.addEventListener("click", () => {
  addForm.openPopup();
  formValidators[addFormSelector].resetValidation();
});

// Edit Form
const editForm = new PopupWithForm(editFormSelector, {
  submitCallback: (evt) => {
    evt.preventDefault();
    const { ["profile-name"]: username, ["profile-about"]: about } =
      editForm.getInputValues();
    api
      .editUser(username, about)
      .then((res) => {
        return res.ok
          ? userInfo.setUserInfo(username, about)
          : Promise.reject(res.status);
      })
      .catch((err) => {
        alert(`Error ${err}. Inténtalo de nuevo más tarde`);
      })
      .finally(editForm.closePopup());
  },
});

editForm.setEventListeners();

editBtn.addEventListener("click", () => {
  const { username, about } = userInfo.getUserInfo();
  editForm.setInputValues([username, about]);
  editForm.openPopup();
  formValidators[editFormSelector].resetValidation();
});

// Validation
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

/* CARD INJECTOR */

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

api.renderInitialCards({
  renderer: (res) => {
    cardSection.renderItems(res);
  },
});

api
  .getUser()
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  })
  .then(({ name, about }) => {
    userInfo.setUserInfo(name, about);
  })
  .catch((err) => {
    alert(`Error ${err}. Inténtalo de nuevo más tarde`);
  });
