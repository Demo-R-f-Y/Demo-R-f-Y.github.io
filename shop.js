const overlay = document.getElementById("itemOverlay");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    modalImage.src = img.src;
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");   // ← ДОБАВИТЬ
  });
});

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");  // ← ДОБАВИТЬ
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");  // ← ДОБАВИТЬ
  }
});
