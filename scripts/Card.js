import { openPopup } from "../utils/utils.js";

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._src = data.src;
    this._template = templateSelector;
  }

  _getTemplate() {
    const cardElement = this._template.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector(".elements__name");
    this._cardImage = this._element.querySelector(".elements__image");
    this._cardLike = this._element.querySelector(".elements__like-btn");
    this._cardDelete = this._element.querySelector(".elements__del-btn");
    this._cardPopup = document.querySelector("#popup__image");
    this._cardPopupCaption = this._cardPopup.querySelector(
      ".popup__image-caption"
    );
    this._cardPopupImage = this._cardPopup.querySelector(".popup__image");
    this._setEventListeners();
    this._cardName.textContent = this._name;
    this._cardImage.src = this._src;
    this._cardImage.alt = `Fotografía subida por usuario/a de ${this._name}`;
    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleOpenPopup);
    this._cardDelete.addEventListener("click", () => this._element.remove());
    this._cardLike.addEventListener("click", this._like);
  }

  _handleOpenPopup = (img) => {
    this._cardPopupImage.src = this._src;
    this._cardPopupImage.alt = this._cardImage.alt;
    this._cardPopupCaption.textContent = this._name;
    openPopup(this._cardPopup);
  };

  _like(evt) {
    evt.target.classList.toggle("elements__like-btn_active");
  }
}

export default Card;
