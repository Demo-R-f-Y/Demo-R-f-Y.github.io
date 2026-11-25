// ===== СНЕГ =====
// Чтобы выключить снег: поставьте false вместо true
const SNOW_ENABLED = true;

(function () {
  if (!SNOW_ENABLED) return;

  // Если у человека в системе включено "уменьшить анимацию", снег не показываем
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // ===== НАСТРОЙКИ =====
  const DENSITY = 1 / 16000;   // больше число знаменателя = меньше снежинок
  const MAX_FLAKES = 120;      // потолок количества снежинок
  const MIN_SIZE = 1.2;        // минимальный радиус снежинки, px
  const MAX_SIZE = 3.4;        // максимальный радиус снежинки, px
  const FALL_SPEED = 28;       // скорость падения, px в секунду (средняя)
  const TILT = 16;             // наклон: снос вправо, px в секунду (0 = строго вниз)
  const SWAY = 10;             // лёгкое покачивание вбок, px

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;" +
    "pointer-events:none;z-index:500;";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let flakes = [];

  function createFlake(randomY) {
    const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
    const k = size / MAX_SIZE; // крупные снежинки падают чуть быстрее и ярче
    return {
      x: Math.random() * (width + 100) - 50,
      y: randomY ? Math.random() * height : -10,
      size: size,
      speed: FALL_SPEED * (0.6 + k * 0.8),
      drift: TILT * (0.7 + Math.random() * 0.6),
      phase: Math.random() * Math.PI * 2,
      swaySpeed: 0.4 + Math.random() * 0.6,
      alpha: 0.45 + k * 0.45
    };
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.min(MAX_FLAKES, Math.round(width * height * DENSITY));
    while (flakes.length < target) flakes.push(createFlake(true));
    if (flakes.length > target) flakes.length = target;
  }

  let last = performance.now();

  function frame(now) {
    // защита от больших скачков времени (например, после возврата во вкладку)
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";

    for (const f of flakes) {
      f.phase += f.swaySpeed * dt;
      f.y += f.speed * dt;
      f.x += f.drift * dt + Math.sin(f.phase) * SWAY * dt;

      // вышла за экран — возвращаем наверх
      if (f.y > height + 10 || f.x > width + 20) {
        f.y = -10;
        f.x = Math.random() * (width + 100) - 50;
      }

      ctx.globalAlpha = f.alpha;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(frame);
})();
