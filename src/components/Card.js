export default class Card {
  constructor(
    { name, link, likes = 0, _id, owner },
    templateSelector,
    { handleCardClick, handleDeleteClick }
  ) {
    this._name = name;
    this._src = link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = likes.length;
    this._id = _id;
    this._owner = owner._id;
  }

  _getTemplate() {
    const cardElement = this._template.cloneNode(true);
    return cardElement;
  }

  generateCard({ cardName, cardImage, cardLike, cardDelete, cardNumber }) {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector(cardName);
    this._cardImage = this._element.querySelector(cardImage);
    this._cardLike = this._element.querySelector(cardLike);
    this._cardDelete = this._element.querySelector(cardDelete);
    this._cardNumber = this._element.querySelector(cardNumber);
    this._setEventListeners();
    this._isOwner();
    this._cardName.textContent = this._name;
    this._cardNumber.textContent = this._likes;
    this._cardImage.src = this._src;
    this._cardImage.alt = `Fotografía subida de ${this._name}`;
    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleCardClick);
    this._cardDelete.addEventListener("click", this._handleDeleteClick);
    this._cardLike.addEventListener("click", this._like);
  }

  _like(evt) {
    evt.target.classList.toggle("elements__like-btn_active");
  }

  _isOwner() {
    this._owner === "137eb5687f7971918b987332"
      ? this._cardDelete.classList.remove("elements__del-btn_disabled")
      : this._cardDelete.classList.add("elements__del-btn_disabled");
  }

  _getCardId() {
    return this._id;
  }
}
