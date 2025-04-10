const expand = document.querySelector(".expand");
const sideBarEl = document.querySelector(".side-bar-el");

expand.onclick = () => {
  expand.classList.toggle("active");
  sideBarEl.classList.toggle("active");
};
