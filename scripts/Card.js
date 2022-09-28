import CardModal from "./CardModal.js";

class Card {
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

    cardImage.addEventListener("click", (evt) => {
      const cardModal = new CardModal(evt.target);
      cardModal._handleOpenModal();
    });
    cardDelete.addEventListener("click", () => this._element.remove());
    cardLike.addEventListener("click", this._like);
  }

  _like(evt) {
    evt.target.classList.toggle("elements__like-btn_active");
  }
}

export default Card;
