
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");


menuOpenButton.addEventListener("click", () => {
    document.body.classList.add("show-mobile-menu");
});


menuCloseButton.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
});

