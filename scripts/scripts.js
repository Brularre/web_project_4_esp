const pu = document.querySelector(".popup");
const puCloseBtn = document.querySelector(".popup__close-btn");
const pfEditBtn = document.querySelector(".profile__edit-btn");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-job");

/* EDIT FORM -> EDIT BUTTON LOGIC */

pfEditBtn.addEventListener("click", function () {
    let username = document.querySelector(".profile__name").textContent;
    let userJob = document.querySelector(".profile__job").textContent;
    pu.classList.add("popup_opened");
    nameInput.value = username;
    jobInput.value = userJob;
});

/* EDIT FORM -> CLOSE BUTTON LOGIC */

function closeEdit() {
    pu.classList.remove("popup_opened");
}

puCloseBtn.addEventListener("click", closeEdit);

/* EDIT FORM -> SUBMIT BUTTON LOGIC */

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector(".profile__name").textContent = nameInput.value;
    document.querySelector(".profile__job").textContent = jobInput.value;
    closeEdit();
    return;
}

pu.addEventListener("submit", handleProfileFormSubmit);
