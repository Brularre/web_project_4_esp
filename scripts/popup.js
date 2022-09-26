const addForm = [
  {
    input: "setFirstInput",
    title: "Nuevo lugar",
    name: "place-name",
    id: "place-name",
    placeholder: "Título",
    type: "text",
    minlength: "2",
    maxlength: "30",
    errorLocation: "popup__error-place-name",
  },
  {
    input: "setSecondInput",
    title: "",
    name: "place-link",
    id: "place-link",
    placeholder: "Enlace a la imagen",
    type: "url",
    minlength: "",
    maxlength: "",
    errorLocation: "popup__error-place-link",
  },
];

const editForm = [
  {
    input: "setFirstInput",
    title: "Editar perfil",
    name: "profile-name",
    id: "profile-name",
    placeholder: "Usuario",
    type: "text",
    minlength: "2",
    maxlength: "40",
    errorLocation: "popup__error-profile-name",
  },
  {
    input: "setSecondInput",
    title: "",
    name: "profile-description",
    id: "profile-description",
    placeholder: "Descripción",
    type: "text",
    minlength: "2",
    maxlength: "200",
    errorLocation: "popup__error-profile-description",
  },
];

class PopupForm {
  constructor(formType) {
    this._formType = formType;
  }

  _getTemplate() {
    const formElement = document
      .querySelector("#template_popup")
      .content.querySelector(".popup")
      .cloneNode(true);
    return formElement;
  }

  _handleOpenPopup() {
    const popupCheckTimeout = 300;
    if (formElement) {
      return;
    }
    setTimeout(() => {
      this.generatePopupForm();
    }, popupCheckTimeout);
  }

  generatePopupForm() {
    this._element = this._getTemplate();
    this._setEventListeners();
  }

  _handleClosePopup() {
    const delayValueMs = 600;
    const noOpacity = 0;
    if (!this._modalElement) {
      return;
    }
    formElement.style.transition = "opacity 600ms ease";
    formElement.style.opacity = noOpacity;
    setTimeout(function () {
      formElement.remove();
    }, delayValueMs);
  }

  _handleCloseEsc(evt) {
    if (evt.code === "Escape") {
      this._handleClosePopup;
    }
  }

  _handleCloseOutsideClick(evt) {
    const parent = evt.target.closest(".popup");
    if (!parent) {
      this._handleClosePopup;
    }
  }

  // _setEventListeners() {
  //   document.addEventListener("keydown", closeOnEsc);
  //   popup.addEventListener("click", closeOnOutsideClick);
  // }
  // popupClose.addEventListener("click", (evt) => closeElement(evt));
  // popup.addEventListener("submit", (evt) => {
  //   evt.preventDefault();
  //   addNewCard(placeName.value, placeLink.value);
  //   closeElement(evt);
  // });

  //   cardImage.addEventListener("click", (evt) =>
  //     this._handleOpenModal(evt.target)
  //   );
  //   cardDelete.addEventListener("click", () => this._element.remove());
  //   cardLike.addEventListener("click", (evt) => this._like(evt));
  // }
}

class AddCardForm extends PopupForm {
  constructor(firstInput, secondInput, formType) {
    super(formType);
    this._title = data.title;
    this._name = data.name;
    this._id = data.id;
    this._placeholder = data.placeholder;
    this._type = data.type;
    this._minlength = data.minlength;
    this._maxlength = data.minlength;
    this._errorLocation = data.errorLocation;
    this._formType = formType;
  }

  generatePopupForm() {
    super.generatePopupForm();
    const popupTitle = this._element.querySelector(".popup__title");
    popupTitle.textContent = title;

    return this._element;
  }

  _setFirstInput() {
    const firstInput = this._element.querySelector("#input-one");
    const firstInputError = this._element.querySelector(
      ".popup__error-msg-one"
    );
    firstInput.name = data.name;
    firstInput.id = id;
    firstInput.placeholder = placeholder;
    firstInput.setAttribute("required", "");
    firstInput.setAttribute("type", type);
    firstInput.setAttribute("minlength", minlength);
    firstInput.setAttribute("maxlength", maxlength);
    firstInputError.classList.replace("popup__error-msg-one", errorLocation);
  }
  _setSecondInput() {
    const secondInput = this._element.querySelector("#input-two");
    const secondInputError = this._element.querySelector(
      ".popup__error-msg-two"
    );
    secondInput.name = name;
    secondInput.id = id;
    secondInput.placeholder = placeholder;
    secondInput.setAttribute("required", "");
    secondInput.setAttribute("type", type);
    secondInput.setAttribute("minlength", minlength);
    secondInput.setAttribute("maxlength", maxlength);
    secondInputError.classList.replace("popup__error-msg-two", errorLocation);
  }

  _handleOpenPopup() {
    popupCaption.textContent = this._description;
    super._handleOpenPopup();
  }

  _handleClosePopup() {
    popupCaption.textContent = "";
    super._handleClosePopup();
  }
}

// addBtn.addEventListener("click", () => {
//   const activePopup = document.querySelector(".popup");
//   if (activePopup) {
//     return;
//   }
//   setTimeout(() => {
//     const newPopup = createPopup();
//     const popup = newPopup.querySelector(".popup");
//     const popupClose = popup.querySelector(".popup__close-btn");
//     const [placeName, placeLink] = setPopupVariables(popup);
//     configInputs(
//       popup,
//       "setFirstInput",
//       "Nuevo lugar",
//       "place-name",
//       "place-name",
//       "Título",
//       "text",
//       "2",
//       "30",
//       "popup__error-place-name"
//     );
//     configInputs(
//       popup,
//       "setSecondInput",
//       "",
//       "place-link",
//       "place-link",
//       "Enlace a la imagen",
//       "url",
//       "",
//       "",
//       "popup__error-place-link"
//     );
//     popupClose.addEventListener("click", (evt) => closeElement(evt));
//     popup.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//       addNewCard(placeName.value, placeLink.value);
//       closeElement(evt);
//     });
//     // enableValidation(popup, {
//     //   formSelector: ".popup",
//     //   inputSelector: ".popup__input",
//     //   submitButtonSelector: ".popup__submit-btn",
//     //   inactiveButtonClass: ".popup__submit-btn_inactive",
//     //   inputErrorClass: ".popup__input_error",
//     //   errorClass: ".popup__error-msg",
//     // });
//     document.body.prepend(popup);
//     document.addEventListener("keydown", closeOnEsc);
//     popup.addEventListener("click", closeOnOutsideClick);
//   }, popupCheckingTimeout);
// });

/* EDIT FORM CREATOR */

// editBtn.addEventListener("click", () => {
//   const activePopup = document.querySelector(".popup");
//   if (activePopup) {
//     return;
//   }
//   setTimeout(() => {
//     const newPopup = createPopup();
//     const popup = newPopup.querySelector(".popup");
//     const popupClose = popup.querySelector(".popup__close-btn");
//     const [nameInput, jobInput] = setPopupVariables(popup);
//     configInputs(
//       popup,
//       "setFirstInput",
//       "Editar perfil",
//       "profile-name",
//       "profile-name",
//       "Usuario",
//       "text",
//       "2",
//       "40",
//       "popup__error-profile-name"
//     );
//     configInputs(
//       popup,
//       "setSecondInput",
//       "",
//       "profile-job",
//       "profile-job",
//       "Ocupación",
//       "text",
//       "2",
//       "200",
//       "popup__error-profile-job"
//     );
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileJob.textContent;
//     popupClose.addEventListener("click", (evt) => closeElement(evt));
//     popup.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//       profileName.textContent = nameInput.value;
//       profileJob.textContent = jobInput.value;
//       closeElement(evt);
//     });
//     enableValidation(popup, {
//       formSelector: ".popup",
//       inputSelector: ".popup__input",
//       submitButtonSelector: ".popup__submit-btn",
//       inactiveButtonClass: ".popup__submit-btn_inactive",
//       inputErrorClass: ".popup__input_error",
//       errorClass: ".popup__error-msg",
//     });
//     document.body.prepend(popup);
//     document.addEventListener("keydown", closeOnEsc);
//     document.addEventListener("click", (event) => {
//       closeOnOutsideClick(event);
//     });
//   }, popupCheckingTimeout);
// });
