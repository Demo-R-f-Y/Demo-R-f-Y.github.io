const overlay = document.getElementById("itemOverlay");
const currentImg = document.getElementById("modalImageCurrent");
const nextImg = document.getElementById("modalImageNext");
const closeBtn = document.getElementById("closeModal");

const items = Array.from(document.querySelectorAll(".gallery img"));
let currentIndex = 0;

// Открытие item
items.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;

    currentImg.src = img.src;
    currentImg.className = "modal-img active";

    nextImg.className = "modal-img";

    overlay.classList.add("active");
  });
});

// Закрытие
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});

/* ===== СВАЙП ===== */

let startX = 0;
let endX = 0;
const swipeThreshold = 50; // минимальная дистанция свайпа

currentImg.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

currentImg.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = endX - startX;

  if (Math.abs(diff) < swipeThreshold) return;

  if (diff < 0) {
    changeItem("next");
  } else {
    changeItem("prev");
  }
}

function changeItem(direction) {
  const exitClass = direction === "next" ? "exit-left" : "exit-right";
  const enterClass = direction === "next" ? "enter-right" : "enter-left";

  const nextIndex =
    direction === "next"
      ? (currentIndex + 1) % items.length
      : (currentIndex - 1 + items.length) % items.length;

  nextImg.src = items[nextIndex].src;
  nextImg.className = `modal-img ${enterClass}`;

  // reflow
  nextImg.offsetHeight;

  currentImg.classList.add(exitClass);
  nextImg.classList.add("active");

  setTimeout(() => {
    currentIndex = nextIndex;

    currentImg.src = nextImg.src;
    currentImg.className = "modal-img active";
    nextImg.className = "modal-img";
  }, 300);
}
