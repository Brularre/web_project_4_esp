const cards = [
  {
    name: "Times Square",
    src: "./images/elements-img-TimesSquare.jpg",
    alt: "Fotografía de Times Square en NYC",
  },
  {
    name: "Monte Rushmore",
    src: "./images/elements-img-Rushmore.jpg",
    alt: "Fotografía del Monte Rushmore en Dakota del Sur",
  },
  {
    name: "Puerta de las Nubes",
    src: "./images/elements-img-CloudGate.jpg",
    alt: "Fotografía de la Cloud Gate en Chicago",
  },
  {
    name: "Golden Gate",
    src: "./images/elements-img-GoldenGate.jpg",
    alt: "Fotografía del Puente Golden Gate en San Francisco",
  },
  {
    name: "Empire State",
    src: "./images/elements-img-EmpireState.jpg",
    alt: "Fotografía del edificio Empire State en NYC",
  },
  {
    name: "Yellowstone",
    src: "./images/elements-img-Yellowstone.jpg",
    alt: "Fotografía del Parque Nacional Yellowstone",
  },
];

const validationConfig = {
  formSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-msg",
};

export { cards, validationConfig };
