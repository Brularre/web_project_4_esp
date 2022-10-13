/* UTILS */

function openPopup(popupElement) {
  const popupCheckingTimeout = 100;
  setTimeout(function () {
    popupElement.classList.add("popup_active");
  }, popupCheckingTimeout);
}

export { openPopup };
