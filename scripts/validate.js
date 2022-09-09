/* FORM VALIDATION */

const enableValidation = (formElement, formSelectors) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formSelectors.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formSelectors.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__submit-btn_inactive");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("popup__submit-btn_inactive");
    buttonElement.removeAttribute("disabled");
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(
    `.popup__error-${inputElement.id}`
  );
  inputElement.classList.add("popup__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error-msg");
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.popup__error-${inputElement.id}`
  );
  inputElement.classList.remove("popup__input_error");
  errorElement.classList.remove("popup__error-msg");
  errorElement.textContent = "";
};
