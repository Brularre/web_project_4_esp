class FormValidator {
  constructor(formSelector, formElement) {
    this._formSelector = formSelector.formSelector;
    this._input = formSelector.inputSelector;
    this._submitBtn = formSelector.submitButtonSelector;
    this._inactiveSubmit = formSelector.inactiveButtonClass;
    this._inputErrorClass = formSelector.inputErrorClass;
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
      buttonElement.classList.add(this._inactiveSubmit);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(this._inactiveSubmit);
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
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(
      `.popup__error-${inputElement.id}`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
}

export default FormValidator;
