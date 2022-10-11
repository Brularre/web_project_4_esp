/* IMPORTS */

import Card from "./Card.js";

/* SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

/* POPUP FORM SELECTORS */

const addForm = document.querySelector("#popup__add-form");
const editForm = document.querySelector("#popup__edit-form");

const placeName = addForm.querySelector("#place-name");
const placeLink = addForm.querySelector("#place-link");
const formName = editForm.querySelector("#profile-name");
const formDescription = editForm.querySelector("#profile-description");

const popupCheckingTimeout = 100;

/* ADD FORM LOGIC */

addBtn.addEventListener("click", () => {
  setTimeout(function () {
    addForm.classList.add("popup_active");
  }, popupCheckingTimeout);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = { name: placeName.value, src: placeLink.value };
  console.log(cardData);
  const newCard = new Card(cardData);
  const cardElement = newCard.generateCard();
  const cardsContainer = document.querySelector(".elements");
  cardsContainer.append(cardElement);
  handleClosePopup();
});

/* EDIT FORM LOGIC  */

editBtn.addEventListener("click", () => {
  setTimeout(function () {
    editForm.classList.add("popup_active");
    formName.value = profileName.textContent;
    formDescription.value = profileDescription.textContent;
  }, popupCheckingTimeout);
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  handleClosePopup();
});

/* CARD POPUP LOGIC */

(function setPopupEventListeners() {
  const popupCloseBtnList = document.querySelectorAll(".popup__close-btn");
  popupCloseBtnList.forEach((popupCloseBtn) => {
    popupCloseBtn.addEventListener("click", handleClosePopup);
  });
  document.addEventListener("keydown", handleCloseEsc);
  document.addEventListener("click", handleCloseOutsideClick);
})();

function checkPopupActive() {
  const activePopup = document.querySelector(".popup_active") ? true : false;
  return activePopup;
}

function handleClosePopup() {
  const delayValueMs = 600;
  if (checkPopupActive()) {
    const activePopup = document.querySelector(".popup_active");
    activePopup.style.animation = "0.6s fadeout ease";
    setTimeout(function () {
      activePopup.classList.remove("popup_active");
      activePopup.removeAttribute("style");
    }, delayValueMs);
  }
}

function handleCloseEsc(evt) {
  if (evt.code === "Escape") {
    handleClosePopup();
  }
}

function handleCloseOutsideClick(evt) {
  const parent = evt.target.closest(".popup");
  if (!parent) {
    handleClosePopup();
  }
}
