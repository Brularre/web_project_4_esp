import PopupWithForm from "./PopupWithForm.js";

export default class PopupCardDelete extends PopupWithForm {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector, { submitCallback });
  }

  openPopup(cardElement, id) {
    this._cardElement = cardElement;
    this._cardId = id;
    super.openPopup();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.submitCallback(this._cardId);
      this._cardElement.remove();
      this.closePopup();
    });
  }
}
