import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this.submitCallback = submitCallback;
    this._formElement = document.querySelector(`[name="${popupSelector}"]`);
    this._inputList = this._formElement.querySelectorAll(".popup__input");
  }

  getInputValues() {
    const inputValues = {};

    this._inputList.forEach((input) => {
      const inputName = input.getAttribute("name");
      inputValues[inputName] = input.value;
    });
    return inputValues;
  }

  setInputValues(formData) {
    this._inputList.forEach((input, index) => {
      input.value = formData[index];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this.submitCallback);
  }

  closePopup() {
    super.closePopup();
    this._resetForm.call(this._formElement);
  }

  _resetForm() {
    const delayValueMs = 600;
    setTimeout(() => {
      this.reset();
    }, delayValueMs);
  }
}
