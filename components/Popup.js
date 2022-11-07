class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(`#${popupSelector}`);
    this._popupCloseBtn = this._popup.querySelector(".popup__close-btn");
  }

  _setEventListeners() {
    this._popupCloseBtn.addEventListener("click", this.closePopup);
  }

  openPopup() {
    const popupCheckingTimeout = 100;
    setTimeout(() => {
      this._popup.classList.add("popup_active");
      document.addEventListener("keydown", this._handleEscClose);
      document.addEventListener("click", this._handleOutsideClick);
    }, popupCheckingTimeout);
  }

  _checkPopupActive() {
    const activePopup = document.querySelector(".popup_active") ? true : false;
    return activePopup;
  }

  closePopup() {
    const delayValueMs = 600;
    if (this._checkPopupActive) {
      this._popup.style.animation = "0.6s fadeout ease";
      setTimeout(() => {
        document.removeEventListener("keydown", this._handleEscClose);
        document.removeEventListener("click", this._handleOutsideClick);
        this._popup.classList.remove("popup_active");
        this._popup.removeAttribute("style");
      }, delayValueMs);
    }
  }

  _handleEscClose = (evt) => {
    if (evt.code === "Escape") {
      this.closePopup();
    }
  };

  _handleOutsideClick = (evt) => {
    const parent = evt.target.closest(".popup");
    if (!parent) {
      this.closePopup();
    }
  };
}

class PopupWithImage extends Popup {
  constructor(popupSelector, handleCardClick) {
    super(popupSelector);
    // this._handleCardClick = handleCardClick;
    // this._cardPopupCaption = this._cardPopup.querySelector(cardPopupCaption);
    // this._cardPopupImage = this._cardPopup.querySelector(cardPopupImage);
  }
  openPopup() {
    this._cardPopupImage.src = this._src;
    this._cardPopupImage.alt = this._cardImage.alt;
    this._cardPopupCaption.textContent = this._name;
    super.openPopup();
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this.submitCallback = submitCallback;
    this._formElement = document.querySelector(`[name="${popupSelector}"]`);
  }

  _getInputValues() {
    const inputValues = {};
    const inputList = this._formElement.querySelectorAll(".popup__input");

    inputList.forEach((input, index) => {
      const inputName = input.getAttribute("name");
      inputValues[inputName] = input.value;
    });
    return inputValues;
  }

  // this._firstValue = this._formElement.elements[firstInput].value;
  // this._secondValue = this._formElement.elements[secondInput].value;

  _setEventListeners() {
    super._setEventListeners();
    this._formElement.addEventListener("submit", this.submitCallback);
    // this._popup.addEventListener("submit", (evt) => {
    //   evt.preventDefault();
    //   this._getInputValues();
    //   console.log(this._formValues);
    //   document.querySelector(".profile__name").textContent =
    //     document.querySelector("#profile-name").value;
    //   this._secondInput.querySelector(".profile__description").textContent =
    //     this._secondInput.value;
    //   this.closePopup();
    // });
  }

  closePopup() {
    super.closePopup();
    this._resetForm();
  }

  _resetForm() {
    const delayValueMs = 600;
    setTimeout(() => {
      this._formElement.reset();
    }, delayValueMs);
  }
}

//CREAR INSTANCIA DE POPUPWITHFORM PARA CADA POPUP

// _handleOpenPopup = () => {
//   this._cardPopupImage.src = this._src;
//   this._cardPopupImage.alt = this._cardImage.alt;
//   this._cardPopupCaption.textContent = this._name;
//   openPopup(this._cardPopup);
// };

export { Popup, PopupWithImage, PopupWithForm };
