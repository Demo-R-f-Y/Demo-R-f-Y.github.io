let scrollPosition = 0;

const overlay = document.getElementById("itemOverlay");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    scrollPosition = window.scrollY;

modalImage.src = img.src;
overlay.classList.add("active");

document.body.classList.add("no-scroll");
document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add("no-scroll");   // ← ДОБАВИТЬ
  });
});

closeBtn.addEventListener("click", closeOverlay);
  document.body.classList.remove("no-scroll");  // ← ДОБАВИТЬ
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeOverlay();
  }
});
    document.body.classList.remove("no-scroll");  // ← ДОБАВИТЬ
  }
});

function closeOverlay() {
  overlay.classList.remove("active");

  document.body.classList.remove("no-scroll");
  document.body.style.top = "";

  window.scrollTo(0, scrollPosition);
}
