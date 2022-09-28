import Card from "./Card.js";
import { FormValidator, validationConfig } from "./FormValidator.js";

class PopupForm {
  constructor(formData) {
    const title = formData[0].title;
    const firstInput = formData[1];
    const secondInput = formData[2];
    this._firstInput = firstInput;
    this._secondInput = secondInput;
    this._title = title;
  }

  _getTemplate() {
    const formElement = document
      .querySelector("#template_popup")
      .content.querySelector(".popup")
      .cloneNode(true);
    return formElement;
  }

  generatePopupForm() {
    this._element = this._getTemplate();
    this._setCloseEventListeners();
    this.setSubmitEventListener();
    const popupTitle = this._element.querySelector(".popup__title");
    popupTitle.textContent = this._title;
    this._setInput(this._firstInput);
    this._setInput(this._secondInput);
    const validateForm = new FormValidator(validationConfig, this._element);
    validateForm.enableValidation();

    return this._element;
  }

  _setInput(input) {
    const inputSelector =
      input.select === "firstInput"
        ? this._element.querySelector("#input-one")
        : this._element.querySelector("#input-two");
    const inputErrorSelector =
      input.select === "firstInput"
        ? this._element.querySelector(".popup__error-msg-one")
        : this._element.querySelector(".popup__error-msg-two");
    inputSelector.name = input.name;
    inputSelector.id = input.id;
    inputSelector.placeholder = input.placeholder;
    inputSelector.setAttribute("required", "");
    inputSelector.setAttribute("type", input.type);
    inputSelector.setAttribute("minlength", input.minlength);
    inputSelector.setAttribute("maxlength", input.maxlength);
    inputErrorSelector.classList.replace(
      input.errorIdentifier,
      input.errorLocation
    );
  }

  _handleOpenPopup() {
    this.generatePopupForm();
  }

  _handleClosePopup = () => {
    const delayValueMs = 600;
    const noOpacity = 0;
    const formElement = document.querySelector(".popup");
    if (!formElement) {
      return;
    }
    formElement.style.transition = "opacity 600ms ease";
    formElement.style.opacity = noOpacity;
    setTimeout(() => {
      formElement.remove();
      document.removeEventListener("keydown", this._handleCloseEsc);
      document.removeEventListener("click", this._handleCloseOutsideClick);
    }, delayValueMs);
  };

  _handleCloseEsc = (evt) => {
    if (evt.code === "Escape") {
      this._handleClosePopup;
    }
  };

  _handleCloseOutsideClick = (evt) => {
    const formElement = document.querySelector(".popup");
    const isClickInside = formElement.contains(evt.target);

    if (!isClickInside) {
      this._handleClosePopup();
    }
  };

  _setCloseEventListeners() {
    const popupCloseBtn = this._element.querySelector(".popup__close-btn");
    const popupCheckTimeout = 300;
    setTimeout(() => {
      popupCloseBtn.addEventListener("click", this._handleClosePopup);
      document.addEventListener("keydown", this._handleCloseEsc);
      document.addEventListener("click", this._handleCloseOutsideClick);
    }, popupCheckTimeout);
  }

  setSubmitEventListener() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleClosePopup();
    });
  }
}

class AddCardForm extends PopupForm {
  constructor(formData, title) {
    super(formData, title);
  }

  setSubmitEventListener() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const cardsContainer = document.querySelector(".elements");
      const name = document.querySelector("#place-name").value;
      const src = document.querySelector("#place-link").value;
      const cardData = { name, src };
      const newCard = new Card(cardData);
      const cardElement = newCard.generateCard();
      cardsContainer.append(cardElement);
      this._handleClosePopup();
    });
  }
}

class EditProfileForm extends PopupForm {
  constructor(formData, title) {
    super(formData, title);
  }

  generatePopupForm() {
    super.generatePopupForm();
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(".profile__description");
    const nameInput = this._element.querySelector("#profile-name");
    const descriptionInput = this._element.querySelector(
      "#profile-description"
    );

    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;

    return this._element;
  }

  setSubmitEventListener() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const profileName = document.querySelector(".profile__name");
      const profileDescription = document.querySelector(
        ".profile__description"
      );
      const nameInput = this._element.querySelector("#profile-name");
      const descriptionInput = this._element.querySelector(
        "#profile-description"
      );
      profileName.textContent = nameInput.value;
      profileDescription.textContent = descriptionInput.value;

      this._handleClosePopup();
    });
  }
}

export { AddCardForm, EditProfileForm };
