/* UTILS */

function openPopup(popupElement) {
  const popupCheckingTimeout = 100;
  setTimeout(function () {
    popupElement.classList.add("popup_active");
    document.addEventListener("keydown", handleCloseEsc);
    document.addEventListener("click", handleCloseOutsideClick);
  }, popupCheckingTimeout);
}

function handleClosePopup() {
  const delayValueMs = 600;
  if (checkPopupActive()) {
    const activePopup = document.querySelector(".popup_active");
    activePopup.style.animation = "0.6s fadeout ease";
    setTimeout(function () {
      document.removeEventListener("keydown", handleCloseEsc);
      document.removeEventListener("click", handleCloseOutsideClick);
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

function checkPopupActive() {
  const activePopup = document.querySelector(".popup_active") ? true : false;
  return activePopup;
}

export { openPopup, handleClosePopup };
