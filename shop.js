const overlay = document.getElementById("itemOverlay");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");

// Открытие item
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    modalImage.src = img.src;
    overlay.classList.add("active");

    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
  });
});

// Закрытие
closeBtn.addEventListener("click", closeOverlay);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeOverlay();
  }
});

function closeOverlay() {
  overlay.classList.remove("active");

  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");
}
