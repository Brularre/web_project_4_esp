export default class Card {
  constructor({ name, link }, templateSelector, { handleCardClick }) {
    this._name = name;
    this._src = link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._template.cloneNode(true);
    return cardElement;
  }

  generateCard({ cardName, cardImage, cardLike, cardDelete }) {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector(cardName);
    this._cardImage = this._element.querySelector(cardImage);
    this._cardLike = this._element.querySelector(cardLike);
    this._cardDelete = this._element.querySelector(cardDelete);
    this._setEventListeners();
    this._cardName.textContent = this._name;
    this._cardImage.src = this._src;
    this._cardImage.alt = `Fotografía subida de ${this._name}`;
    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleCardClick);
    this._cardDelete.addEventListener("click", () => this._element.remove());
    this._cardLike.addEventListener("click", this._like);
  }

  _like(evt) {
    evt.target.classList.toggle("elements__like-btn_active");
  }
}
