const backBtn = document.querySelector("header nav button");
backBtn.onclick = () => {
  history.back();
};

/* AUDIO PLAYING FOR OPEN STRING NOTES */

const playBtns = document.querySelectorAll("#open-strings article div svg");
const openStrings = document.querySelectorAll(
  "#open-strings article div audio"
);
const indicator = document.querySelectorAll(".indicators div");

playBtns.forEach((btn) => {
  btn.onclick = () => {
    btn.style.transform = "translateX(5px)";
    setTimeout(() => {
      btn.style.transform = "translateX(0px)";
    }, 1000);
    openStrings.forEach((string) => {
      if (btn.className.baseVal === string.id) {
        string.play();
      }
    });
    indicator.forEach((ind) => {
      ind.classList.remove("active");
      if (ind.className == btn.className.baseVal) {
        ind.classList.add("active");
        setTimeout(() => {
          ind.classList.remove("active");
        }, 2000);
      }
    });
  };
});

/* AUDIO PLAYING FOR CHORDS */

const playChordBtns = document.querySelectorAll(".play svg");
const chords = document.querySelectorAll("#chords audio");

playChordBtns.forEach((btn) => {
  btn.onclick = () => {
    btn.parentElement.style.transform = "translateX(10px)";
    btn.parentElement.parentElement.style.border = "3px solid green";
    setTimeout(() => {
      btn.parentElement.style.transform = "translateX(0px)";
      btn.parentElement.parentElement.style.border =
        "3px solid rgba(0, 0, 0, 0.1)";
    }, 2000);
    chords.forEach((chord) => {
      if (btn.className.baseVal === chord.id) {
        chord.play();
      }
    });
  };
});
