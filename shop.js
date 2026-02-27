const overlay = document.getElementById("itemOverlay");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    modalImage.src = img.src;
    overlay.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});
