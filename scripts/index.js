/* GLOBAL SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

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
  closeElement(evt);
  // const closedElement = evt.currentTarget;
  // closeElement(closedElement);
  // closedElement.removeEventListener("click", closeOnOutsideClick);
};
// document.removeEventListener("click", closeOnOutsideClick);
//   if (modalBox && evt.target === modalBox) {
//     console.log("a");
//     modalBox.remove();
//     window.removeEventListener("click", closeOnOutsideClick);
//   }
// };
// document.addEventListener("click", (e) => {
//   // Check if the filter list parent element exist
//   const isClosest = e.target.closest(popupQuerySelector);

//   // If `isClosest` equals falsy & popup has the class `show`
//   // then hide the popup
//   if (!isClosest && popupEl.classList.contains("show")) {
//     popupEl.classList.remove("show");
//   }
// });

/* ADD FORM CREATOR */

addBtn.addEventListener("click", () => {
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
});

/* EDIT FORM CREATOR */

editBtn.addEventListener("click", () => {
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
  popup.addEventListener("focusout", closeOnOutsideClick);
});

/* CARD TEMPLATE INJECTOR */

const cards = [
  {
    name: "Times Square",
    link: "./images/elements-img-TimesSquare.jpg",
    alt: "Fotografía de Times Square en NYC",
  },
  {
    name: "Monte Rushmore",
    link: "./images/elements-img-Rushmore.jpg",
    alt: "Fotografía del Monte Rushmore en Dakota del Sur",
  },
  {
    name: "Puerta de las Nubes",
    link: "./images/elements-img-CloudGate.jpg",
    alt: "Fotografía de la Cloud Gate en Chicago",
  },
  {
    name: "Golden Gate",
    link: "./images/elements-img-GoldenGate.jpg",
    alt: "Fotografía del Puente Golden Gate en San Francisco",
  },
  {
    name: "Empire State",
    link: "./images/elements-img-EmpireState.jpg",
    alt: "Fotografía del edificio Empire State en NYC",
  },
  {
    name: "Yellowstone",
    link: "./images/elements-img-Yellowstone.jpg",
    alt: "Fotografía del Parque Nacional Yellowstone",
  },
];

for (const key in cards) {
  const newCardName = cards[key].name;
  const newCardLink = cards[key].link;
  addNewCard(newCardName, newCardLink);
  document.querySelector(".elements__image").alt = cards[key].alt;
}

function addNewCard(placeName, placeLink) {
  const templateCards = document.querySelector("#template_cards").content;
  const cardsContainer = document.querySelector(".elements");
  const newCard = templateCards
    .querySelector(".elements__card")
    .cloneNode(true);
  newCard.id = "clonedCard";
  const cardName = newCard.querySelector(".elements__name");
  const cardImage = newCard.querySelector(".elements__image");
  const cardLike = newCard.querySelector(".elements__like-btn");
  const cardDelete = newCard.querySelector(".elements__del-btn");
  const noOpacity = 0;
  cardName.textContent = placeName;
  cardImage.src = placeLink;
  cardImage.alt = `Fotografía subida por el usuario de ${placeName}`;
  cardLike.addEventListener("click", (evt) =>
    evt.target.classList.toggle("elements__like-btn_active")
  );
  cardDelete.addEventListener("click", (evt) =>
    evt.target.closest("div").remove()
  );
  cardImage.addEventListener("click", (evt) => {
    openModalImage(evt.target);
    evt.target.closest("div").opacity = noOpacity;
  });
  cardsContainer.prepend(newCard);
}

/* MODAL BOX LOGIC */

function openModalImage(img) {
  const templateModal = document.querySelector("#template_modal-box").content;
  const modalBox = templateModal.cloneNode(true);
  modalBox.id = "clonedModalBox";
  const modalImg = modalBox.querySelector(".modal-box__image");
  const modalTitle = modalBox.querySelector(".modal-box__title");
  const modalCloseBtn = modalBox.querySelector(".modal-box__close-btn");
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  modalTitle.textContent = img.closest("div").textContent;
  modalCloseBtn.addEventListener("click", (evt) => closeElement(evt));
  document.body.prepend(modalBox);
  document.addEventListener("keydown", closeOnEsc);
  modalBox.addEventListener("focusout", (evt) => closeOnOutsideClick(evt));
}
