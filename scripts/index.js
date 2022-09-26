/* GLOBAL SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

/* FUNCTIONS */

class PopupForm {
  constructor(data) {
    this._name = data.name;
    this._src = data.src;
    this._alt = data.alt;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#template_cards")
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  _getModalTemplate() {
    const modalElement = document
      .querySelector("#template_modal-box")
      .content.querySelector(".modal-box")
      .cloneNode(true);
    return modalElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardName = this._element.querySelector(".elements__name");
    const cardImage = this._element.querySelector(".elements__image");
    cardName.textContent = this._name;
    cardImage.src = this._src;
    cardImage.alt = `Fotografía subida por el usuario de ${this._name}`;
    return this._element;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector(".elements__image");
    const cardLike = this._element.querySelector(".elements__like-btn");
    const cardDelete = this._element.querySelector(".elements__del-btn");

    cardImage.addEventListener("click", (evt) =>
      this._handleOpenModal(evt.target)
    );
    cardDelete.addEventListener("click", () => this._element.remove());
    cardLike.addEventListener("click", (evt) => this._like(evt));
  }

  _handleOpenModal(img) {
    const modalCheckTimeout = 300;
    if (this._modalElement) {
      return;
    }
    setTimeout(() => {
      this.generateModal(img);
    }, modalCheckTimeout);
  }

  _handleCloseModal() {
    const delayValueMs = 600;
    const noOpacity = 0;
    if (!this._modalElement) {
      return;
    }
    this._modalElement.style.transition = "opacity 600ms ease";
    this._modalElement.style.opacity = noOpacity;
    setTimeout(function () {
      document.querySelector(".modal-box").remove();
      document.removeEventListener("keydown", this._handleCloseEsc);
      document.removeEventListener("click", this._handleCloseOutsideClick);
    }, delayValueMs);
  }

  _handleCloseEsc(evt) {
    if (evt.code === "Escape") {
      this._handleCloseModal();
    }
  }

  _handleCloseOutsideClick(evt) {
    const parent = evt.target.closest(".modal-box");
    if (!parent) {
      this._handleCloseModal();
    }
  }

  _like(evt) {
    evt.target.classList.toggle("elements__like-btn_active");
  }
}

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

const closeElement = (evt) => {
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

// for (const key in cards) {
//   const newCardName = cards[key].name;
//   const newCardLink = cards[key].link;
//   addNewCard(newCardName, newCardLink);
//   document.querySelector(".elements__image").alt = cards[key].alt;
// }

// function addNewCard(placeName, placeLink) {
//   const cardsContainer = document.querySelector(".elements");
//   const templateCards = document.querySelector("#template_cards").content;
//   const newCard = templateCards
//     .querySelector(".elements__card")
//     .cloneNode(true);
//   newCard.id = "clonedCard";
//   const cardName = newCard.querySelector(".elements__name");
//   const cardImage = newCard.querySelector(".elements__image");
//   const cardLike = newCard.querySelector(".elements__like-btn");
//   const cardDelete = newCard.querySelector(".elements__del-btn");
//   const noOpacity = 0;
//   cardName.textContent = placeName;
//   cardImage.src = placeLink;
//   cardImage.alt = `Fotografía subida por el usuario de ${placeName}`;
//   cardLike.addEventListener("click", (evt) =>
//     evt.target.classList.toggle("elements__like-btn_active")
//   );
//   cardDelete.addEventListener("click", (evt) =>
//     evt.target.closest("div").remove()
//   );
//   cardImage.addEventListener("click", (evt) => {
//     openModalImage(evt.target);
//     evt.target.closest("div").opacity = noOpacity;
//   });
//   cardsContainer.prepend(newCard);
// }

// /* MODAL BOX LOGIC */

// function openModalImage(img) {
//   const activePopup = document.querySelector(".popup");
//   if (activePopup) {
//     return;
//   }
//   setTimeout(() => {
//     const templateModal = document.querySelector("#template_modal-box").content;
//     const modalBox = templateModal.cloneNode(true);
//     modalBox.id = "clonedModalBox";
//     const modalImg = modalBox.querySelector(".modal-box__image");
//     const modalTitle = modalBox.querySelector(".modal-box__title");
//     const modalCloseBtn = modalBox.querySelector(".modal-box__close-btn");
//     modalImg.src = img.src;
//     modalImg.alt = img.alt;
//     modalTitle.textContent = img.closest("div").textContent;
//     modalCloseBtn.addEventListener("click", (evt) => closeElement(evt));
//     document.body.prepend(modalBox);
//     document.addEventListener("keydown", closeOnEsc);
//     document.addEventListener("click", (event) => {
//       closeOnOutsideClick(event);
//     });
//   }, popupCheckingTimeout);
// }
