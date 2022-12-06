export default class Card {
  constructor(
    { name, link, likes = 0, _id, owner },
    templateSelector,
    { handleCardClick, handleDeleteClick, addLike, removeLike },
    currentUserId
  ) {
    this._name = name;
    this._src = link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = likes;
    this._likesNumber = likes.length;
    this._id = _id;
    this._owner = owner._id;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._currentUserId = currentUserId;
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
    this._isLiked();
    this._cardName.textContent = this._name;
    this._cardNumber.textContent = this._likesNumber;
    this._cardImage.src = this._src;
    this._cardImage.alt = `Fotografía subida de ${this._name}`;
    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleCardClick);
    this._cardDelete.addEventListener("click", this._handleDeleteClick);
    this._cardLike.addEventListener("click", this._like);
  }

  _like = (evt) => {
    if (!evt.target.classList.contains("elements__like-btn_active")) {
      evt.target.classList.add("elements__like-btn_active");
      this._likesNumber++;
      this._cardNumber.textContent = this._likesNumber;
      this._addLike(this._id);
    } else {
      evt.target.classList.remove("elements__like-btn_active");
      this._likesNumber--;
      this._cardNumber.textContent = this._likesNumber;
      this._removeLike(this._id);
    }
  };

  _isLiked() {
    if (this._likes.find((i) => i._id == this._currentUserId)) {
      this._cardLike.classList.add("elements__like-btn_active");
    } else {
      this._cardLike.classList.remove("elements__like-btn_active");
    }
  }

  _isOwner() {
    this._owner == this._currentUserId
      ? this._cardDelete.classList.remove("elements__del-btn_disabled")
      : this._cardDelete.classList.add("elements__del-btn_disabled");
  }

  _getCardId() {
    return this._id;
  }
}
