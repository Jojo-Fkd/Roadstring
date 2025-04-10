/* GUITAR TYPES AND THEIR DESCRIPTIONS (POPUP FUNCTION) */

const guitarArr = [
  {
    guitar: "electric",
    description: `The electric guitar is a stringed instrument that uses electromagnetic pickups to convert string vibrations into electrical signals, allowing for amplification and a wide range of sound effects.`,
    description2: `The development of the electric guitar began in the early 20th century, with inventors experimenting to amplify the sound of traditional guitars. Early models included the "frying pan" guitar created by George Beauchamp in 1931.`,
    images: [
      `Images/clapton.jpeg`,
      `Images/king.jpeg`,
      `Images/page.jpeg`,
      "Images/hendrix.jpeg",
    ],
  },
  {
    guitar: "acoustic",
    description: `The acoustic guitar is a stringed instrument that produces sound through the vibration of its strings, which is amplified by the hollow body of the guitar. It typically has six strings, though variations with more strings exist. Acoustic guitars come in various shapes and sizes, affecting their sound and playability.`,
    description2: `The roots of the acoustic guitar can be traced back over 3,000 years to ancient stringed instruments like the lute and the oud. The modern guitar evolved from these early instruments in Europe during the Renaissance and Baroque periods.`,
    images: [
      `Images/sergovia.jpeg`,
      `Images/kottke.jpeg`,
      `Images/drake.jpeg`,
      "Images/fahey.jpeg",
    ],
  },
  {
    guitar: "bass",
    description: `The ukulele is a small, fretted string instrument that originated in Hawaii in the late 19th century. It typically has four nylon or gut strings and is known for its cheerful sound.`,
    description2: ` The ukulele is derived from the Portuguese braguinha, a small guitar-like instrument brought to Hawaii by immigrants in the 1870s. The Hawaiian adaptation of this instrument led to the creation of the ukulele.`,
    images: [
      `Images/jamerson.jpeg`,
      `Images/entiwtsle.jpeg`,
      `Images/pastorius.jpeg`,
      "Images/wooten.jpeg",
    ],
  },
  {
    guitar: "ukelele",
    description: `The ukulele is a small, fretted string instrument that originated in Hawaii in the late 19th century. It typically has four nylon or gut strings and is known for its cheerful sound.`,
    description2: ` The ukulele is derived from the Portuguese braguinha, a small guitar-like instrument brought to Hawaii by immigrants in the 1870s. The Hawaiian adaptation of this instrument led to the creation of the ukulele.`,
    images: [
      `Images/israel.jpeg`,
      `Images/smeck.jpeg`,
      `Images/eddie.jpeg`,
      "Images/jake.jpeg",
    ],
  },
];

const guitarButtons = document.querySelectorAll(".moreBtn");
const descripPopup = document.getElementById("descriptions");

guitarButtons.forEach((btn) => {
  btn.onclick = () => {
    // POPUP BECOMES VISIBLE
    descripPopup.classList.add("active");

    // ITERATION THROUGH THE ARRAY TO RETRIEVE DATA TO DISPLAY

    const identification = btn.parentElement.id;

    guitarArr.forEach((obj) => {
      // RENDERING OF THE CONTENTS OF THE POPUP (WITH THE DATA RETRIEVED)
      if (identification === obj.guitar) {
        const retrievedData = obj;
        const mainGuitarImage = btn.parentElement.querySelector("img").src;
        descripPopup.innerHTML = `
          <article class="description-popup">
            <div class="header">
              <h3>-- The ${retrievedData.guitar} guitar --</h3>
              <img src="${mainGuitarImage}" alt="" />
            </div>
          <article>
            <p>${retrievedData.description}</p>
          </article>
          <div class="further">
            <section class="legends">
            </section>
            <p>${retrievedData.description2}</p>
          </div>
          <div class="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M3 16.74L7.76 12L3 7.26L7.26 3L12 7.76L16.74 3L21 7.26L16.24 12L21 16.74L16.74 21L12 16.24L7.26 21zm9-3.33l4.74 4.75l1.42-1.42L13.41 12l4.75-4.74l-1.42-1.42L12 10.59L7.26 5.84L5.84 7.26L10.59 12l-4.75 4.74l1.42 1.42z"
              />
            </svg>
          </div>
        </article>
        `;

        // LEGENDS ON THIS GUITAR CATEGORY
        const legends = descripPopup.querySelector(".legends");
        retrievedData.images.forEach((image) => {
          const div = document.createElement("div");
          div.innerHTML = `<img src="${image}" />`;
          legends.appendChild(div);
        });

        // CLOSE POPUP
        const close = descripPopup.querySelector(".close");

        close.onclick = () => {
          descripPopup.classList.remove("active");
        };
      }
    });
  };
});
