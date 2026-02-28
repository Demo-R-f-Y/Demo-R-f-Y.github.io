let scrollPosition = 0;

const overlay = document.getElementById("itemOverlay");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");

// Открытие item
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    // запоминаем позицию скролла
    scrollPosition = window.scrollY;

    // подставляем картинку
    modalImage.src = img.src;

    // показываем overlay
    overlay.classList.add("active");

    // фиксируем страницу
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${scrollPosition}px`;
  });
});

// Закрытие через крестик
closeBtn.addEventListener("click", closeOverlay);

// Закрытие по клику на фон
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeOverlay();
  }
});

// Функция закрытия
function closeOverlay() {
  overlay.classList.remove("active");

  document.body.classList.remove("no-scroll");
  document.body.style.top = "";

  window.scrollTo(0, scrollPosition);
}
