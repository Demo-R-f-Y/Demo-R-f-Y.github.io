// ===== ЛЕПЕСТКИ =====

const petalsContainer = document.querySelector(".petals");

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 8 + Math.random() * 6 + "s";
  petal.style.animationDelay = Math.random() * 5 + "s";
  petal.style.opacity = 0.6 + Math.random() * 0.4;

  petalsContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 14000);
}

setInterval(createPetal, 800);
