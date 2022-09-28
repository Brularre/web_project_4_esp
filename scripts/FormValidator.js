const validationConfig = {
  formSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: ".popup__submit-btn_inactive",
  inputErrorClass: ".popup__input_error",
  errorClass: ".popup__error-msg",
};

class FormValidator {
  constructor(formSelector, formElement) {
    this._formSelector = formSelector.formSelector;
    this._input = formSelector.inputSelector;
    this._submitBtn = formSelector.submitButtonSelector;
    this._inactiveSubmit = formSelector.inactiveButtonClass;
    this._inputError = formSelector.inputErrorClass;
    this._errorClass = formSelector.errorClass;
    this._form = formElement;
  }

  enableValidation() {
    const formElement = this._form;
    const inputList = Array.from(formElement.querySelectorAll(this._input));
    const buttonElement = this._form.querySelector(this._submitBtn);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add("popup__submit-btn_inactive");
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove("popup__submit-btn_inactive");
      buttonElement.removeAttribute("disabled");
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(
      `.popup__error-${inputElement.id}`
    );
    inputElement.classList.add("popup__input_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__error-msg");
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(
      `.popup__error-${inputElement.id}`
    );
    inputElement.classList.remove("popup__input_error");
    errorElement.classList.remove("popup__error-msg");
    errorElement.textContent = "";
  }
}

export { FormValidator, validationConfig };
