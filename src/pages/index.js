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
  addBtn,
  editBtn,
  avatarBtn,
  cardsContainerSelector,
  cardTemplate,
  formList,
  deleteCardSelector,
  imagePopupSelector,
  addFormSelector,
  editFormSelector,
  avatarFormSelector,
  cardSelectors,
  validationConfig,
  apiConfig,
  userInfoConfig,
} from "../utils/constants.js";

/* CLASS INSTANCES */

// API Methods
const api = new Api(apiConfig);

// User Profile Methods
const userInfo = new UserInfo(userInfoConfig);

// Section Renderer Methods
const cardSection = new Section(
  { renderer: cardRenderer },
  cardsContainerSelector
);

// Popup - Card Image Modal
const imagePopup = new PopupWithImage(imagePopupSelector);

// Popup - Delete Card Form
const popupCardDelete = new PopupWithForm(deleteCardSelector, {
  submitCallback: deleteFormSubmit,
});

// Popup - Add Card Form
const addForm = new PopupWithForm(addFormSelector, {
  submitCallback: addFormSubmit,
});

// Popup - Edit Profile Info Form
const editForm = new PopupWithForm(editFormSelector, {
  submitCallback: editFormSubmit,
});

// Popup - Edit Avatar Form
const avatarForm = new PopupWithForm(avatarFormSelector, {
  submitCallback: avatarFormSubmit,
});

// Validation
const formValidators = {};

(function enableValidation(validationConfig) {
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
})(validationConfig);

/* CARD INJECTOR */

const createCard = (cardData) => {
  const newCard = new Card(cardData, cardTemplate, {
    handleCardClick: (evt) => {
      const popupCaption = newCard._cardName.textContent;
      imagePopup.openPopup(evt.target, popupCaption);
    },
    handleDeleteClick: (evt) => popupCardDelete.openPopup(),
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

  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo(name, about);
    userInfo.setUserAvatar(avatar);
  })
  .catch((err) => {
    console.log(`Error ${err}. Inténtalo de nuevo más tarde`);
  });

/* EVENT LISTENERS */
// Popup Event Listeners

popupCardDelete.setEventListeners();
imagePopup.setEventListeners();
addForm.setEventListeners();
editForm.setEventListeners();
avatarForm.setEventListeners();

// Button Event Listeners

addBtn.addEventListener("click", () => {
  addForm.openPopup();
  formValidators[addFormSelector].resetValidation();
});

editBtn.addEventListener("click", () => {
  const { username, about } = userInfo.getUserInfo();
  editForm.setInputValues([username, about]);
  editForm.openPopup();
  formValidators[editFormSelector].resetValidation();
});

avatarBtn.addEventListener("click", () => {
  avatarForm.openPopup();
  formValidators[avatarFormSelector].resetValidation();
});

/* CALLBACKS */

// Card Renderer
function cardRenderer(item) {
  cardSection.appendItem(createCard(item));
}

// Add Form Submit Handler
function addFormSubmit(evt) {
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
    })
    .finally(() => {
      formValidators[addFormSelector].resetValidation();
      addForm.closePopup();
    });
}

function editFormSubmit(evt) {
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
      console.log(`Error ${err}. Inténtalo de nuevo más tarde`);
    })
    .finally(() => {
      formValidators[editFormSelector].resetValidation();
      editForm.closePopup();
    });
}

function avatarFormSubmit(evt) {
  evt.preventDefault();
  const { ["profile-avatar"]: avatar } = avatarForm.getInputValues();
  api
    .editAvatar(avatar)
    .then((res) => {
      return res.ok
        ? userInfo.setUserAvatar(avatar)
        : Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Error ${err}. Inténtalo de nuevo más tarde`);
    })
    .finally(() => {
      formValidators[avatarFormSelector].resetValidation();
      avatarForm.closePopup();
    });
}

function deleteFormSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatar(avatar)
    .then((res) => {
      return res.ok
        ? userInfo.setUserAvatar(avatar)
        : Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Error ${err}. Inténtalo de nuevo más tarde`);
    })
    .finally(() => {
      formValidators[avatarFormSelector].resetValidation();
      avatarForm.closePopup();
    });
}
