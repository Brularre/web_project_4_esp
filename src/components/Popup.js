export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(`#${popupSelector}`);
    this._popupCloseBtn = this._popup.querySelector(".popup__close-btn");
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener(
      "click",
      function () {
        this.closePopup();
      }.bind(this)
    );
  }

  openPopup() {
    const popupCheckingTimeout = 100;
    setTimeout(() => {
      this._popup.classList.add("popup_active");
      document.addEventListener("keydown", this._handleEscClose);
      document.addEventListener("click", this._handleOutsideClick);
    }, popupCheckingTimeout);
  }

  _checkPopupActive() {
    const activePopup = document.querySelector(".popup_active") ? true : false;
    return activePopup;
  }

  closePopup() {
    const delayValueMs = 600;
    if (this._checkPopupActive) {
      this._popup.style.animation = "0.6s fadeout ease";
      setTimeout(() => {
        document.removeEventListener("keydown", this._handleEscClose);
        document.removeEventListener("click", this._handleOutsideClick);
        this._popup.classList.remove("popup_active");
        this._popup.removeAttribute("style");
      }, delayValueMs);
    }
  }

  _handleEscClose = (evt) => {
    if (evt.code === "Escape") {
      this.closePopup();
    }
  };

  _handleOutsideClick = (evt) => {
    const parent = evt.target.closest(".popup");
    if (!parent) {
      this.closePopup();
    }
  };
}
