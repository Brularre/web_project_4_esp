import Card from "./Card.js";
import CardModal from "./CardModal.js";
import { FormValidator, validationConfig } from "./FormValidator.js";
import { AddCardForm, EditProfileForm } from "./PopupForm.js";

/* GLOBAL SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupCheckingTimeout = 300;

/* FUNCTIONS */

/* POPUP CREATION AND CONFIG */

function createPopup() {
  const templatePopup = document.querySelector("#template_popup").content;
  const newPopup = templatePopup.cloneNode(true);
  newPopup.id = "clonedPopup";
  return newPopup;
}

const setPopupVariables = (popup) => {
  const firstInput = popup.querySelector("#input-one");
  const firstInputError = popup.querySelector(".popup__error-msg-one");
  const secondInput = popup.querySelector("#input-two");
  const secondInputError = popup.querySelector(".popup__error-msg-two");
  const popupTitle = popup.querySelector(".popup__title");
  const popupVariables = [
    firstInput,
    secondInput,
    firstInputError,
    secondInputError,
    popupTitle,
  ];
  return popupVariables;
};

function configInputs(
  popup,
  setWhich,
  title,
  name,
  id,
  placeholder,
  type,
  minlength,
  maxlength,
  errorLocation
) {
  const [
    firstInput,
    secondInput,
    firstInputError,
    secondInputError,
    popupTitle,
  ] = setPopupVariables(popup);
  if (setWhich === "setFirstInput") {
    popupTitle.textContent = title;
    firstInput.name = name;
    firstInput.id = id;
    firstInput.placeholder = placeholder;
    firstInput.setAttribute("required", "");
    firstInput.setAttribute("type", type);
    firstInput.setAttribute("minlength", minlength);
    firstInput.setAttribute("maxlength", maxlength);
    firstInputError.classList.replace("popup__error-msg-one", errorLocation);
  } else if (setWhich === "setSecondInput") {
    secondInput.name = name;
    secondInput.id = id;
    secondInput.placeholder = placeholder;
    secondInput.setAttribute("required", "");
    secondInput.setAttribute("type", type);
    secondInput.setAttribute("minlength", minlength);
    secondInput.setAttribute("maxlength", maxlength);
    secondInputError.classList.replace("popup__error-msg-two", errorLocation);
  }
}

const closeElement = () => {
  const delayValueMs = 600;
  const noOpacity = 0;
  const formElement = document.querySelector(".popup");
  const modalBox = document.querySelector(".modal-box");
  if (formElement) {
    formElement.style.transition = "opacity 600ms ease";
    formElement.style.opacity = noOpacity;
    setTimeout(function () {
      formElement.remove();
    }, delayValueMs);
  } else if (modalBox) {
    modalBox.style.transition = "opacity 600ms ease";
    modalBox.style.opacity = noOpacity;
    setTimeout(function () {
      modalBox.remove();
    }, delayValueMs);
  }
};

const closeOnEsc = (evt) => {
  if (evt.code === "Escape") {
    closeElement(evt);
    document.removeEventListener("keydown", closeOnEsc);
  }
};

const closeOnOutsideClick = (evt) => {
  const parent = evt.target.closest(".popup");
  if (!parent) {
    closeElement(evt);
  }
};

/* ADD FORM CREATOR */

addBtn.addEventListener("click", () => {
  const activePopup = document.querySelector(".popup");
  if (activePopup) {
    return;
  }
  setTimeout(() => {
    const newPopup = createPopup();
    const popup = newPopup.querySelector(".popup");
    const popupClose = popup.querySelector(".popup__close-btn");
    const [placeName, placeLink] = setPopupVariables(popup);
    configInputs(
      popup,
      "setFirstInput",
      "Nuevo lugar",
      "place-name",
      "place-name",
      "Título",
      "text",
      "2",
      "30",
      "popup__error-place-name"
    );
    configInputs(
      popup,
      "setSecondInput",
      "",
      "place-link",
      "place-link",
      "Enlace a la imagen",
      "url",
      "",
      "",
      "popup__error-place-link"
    );
    popupClose.addEventListener("click", (evt) => closeElement(evt));
    popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      addNewCard(placeName.value, placeLink.value);
      closeElement(evt);
    });
    enableValidation(popup, {
      formSelector: ".popup",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__submit-btn",
      inactiveButtonClass: ".popup__submit-btn_inactive",
      inputErrorClass: ".popup__input_error",
      errorClass: ".popup__error-msg",
    });
    document.body.prepend(popup);
    document.addEventListener("keydown", closeOnEsc);
    popup.addEventListener("click", closeOnOutsideClick);
  }, popupCheckingTimeout);
});

/* EDIT FORM CREATOR */

editBtn.addEventListener("click", () => {
  const activePopup = document.querySelector(".popup");
  if (activePopup) {
    return;
  }
  setTimeout(() => {
    const newPopup = createPopup();
    const popup = newPopup.querySelector(".popup");
    const popupClose = popup.querySelector(".popup__close-btn");
    const [nameInput, jobInput] = setPopupVariables(popup);
    configInputs(
      popup,
      "setFirstInput",
      "Editar perfil",
      "profile-name",
      "profile-name",
      "Usuario",
      "text",
      "2",
      "40",
      "popup__error-profile-name"
    );
    configInputs(
      popup,
      "setSecondInput",
      "",
      "profile-job",
      "profile-job",
      "Ocupación",
      "text",
      "2",
      "200",
      "popup__error-profile-job"
    );
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupClose.addEventListener("click", (evt) => closeElement(evt));
    popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closeElement(evt);
    });
    enableValidation(popup, {
      formSelector: ".popup",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__submit-btn",
      inactiveButtonClass: ".popup__submit-btn_inactive",
      inputErrorClass: ".popup__input_error",
      errorClass: ".popup__error-msg",
    });
    document.body.prepend(popup);
    document.addEventListener("keydown", closeOnEsc);
    document.addEventListener("click", (event) => {
      closeOnOutsideClick(event);
    });
  }, popupCheckingTimeout);
});
