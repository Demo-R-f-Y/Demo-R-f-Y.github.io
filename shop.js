const overlay = document.getElementById("itemOverlay");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");

const items = Array.from(document.querySelectorAll(".gallery img"));
let currentIndex = 0;

// Открытие item
items.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    modalImage.src = img.src;
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

modalImage.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modalImage.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = endX - startX;

  if (Math.abs(diff) < swipeThreshold) return;

  if (diff < 0) {
    showNext();
  } else {
    showPrev();
  }
}

function changeItem(direction) {
  // уезд текущей
  modalImage.className = "";
  modalImage.classList.add(
    direction === "next" ? "exit-left" : "exit-right"
  );

  setTimeout(() => {
    // меняем индекс
    currentIndex =
      direction === "next"
        ? (currentIndex + 1) % items.length
        : (currentIndex - 1 + items.length) % items.length;

    // меняем src
    modalImage.src = items[currentIndex].src;

    // старт новой
    modalImage.className = "";
    modalImage.classList.add(
      direction === "next" ? "enter-right" : "enter-left"
    );

    // reflow
    modalImage.offsetHeight;

    // заезд в центр
    modalImage.className = "center";
  }, 300);
}
