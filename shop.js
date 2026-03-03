const overlay = document.getElementById("itemOverlay");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");

// ОТКРЫТИЕ ITEM
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    modalImage.src = img.src;
    overlay.classList.add("active");

    // Блокируем скролл страницы
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
  });
});

// ЗАКРЫТИЕ ЧЕРЕЗ КРЕСТИК
closeBtn.addEventListener("click", closeOverlay);

// ЗАКРЫТИЕ ПО КЛИКУ НА ФОН
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeOverlay();
  }
});

// ФУНКЦИЯ ЗАКРЫТИЯ
function closeOverlay() {
  overlay.classList.remove("active");

  // Возвращаем скролл
  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");
}
