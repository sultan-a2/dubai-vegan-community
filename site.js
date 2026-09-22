const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function bindParallax() {
  if (reduceMotion) return;

  const layers = [...document.querySelectorAll("[data-speed]")];
  if (!layers.length) return;

  let frame = 0;

  const update = () => {
    frame = 0;
    const mid = window.innerHeight / 2;
    for (const el of layers) {
      const slot = el.closest("[data-slot]");
      if (!slot) continue;
      const rect = slot.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > window.innerHeight + 120) continue;
      const fromCenter = (rect.top + rect.height / 2 - mid) / window.innerHeight;
      const speed = Number(el.dataset.speed);
      const compact = window.innerWidth < 800 ? 0.4 : 1;
      const max = Number(el.dataset.max || 24) * compact;
      const shift = Math.max(-max, Math.min(max, fromCenter * speed));
      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    }
  };

  const request = () => {
    if (frame) return;
    frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
}

function bindGuide() {
  const buttons = [...document.querySelectorAll("[data-filter]")];
  const input = document.querySelector("#search");
  const places = [...document.querySelectorAll(".place")];
  const empty = document.querySelector(".empty");
  if (!input || !places.length) return;

  let diet = "all";

  const apply = () => {
    const query = input.value.trim().toLowerCase();
    let shown = 0;
    for (const place of places) {
      const kind = diet === "all" || place.dataset.diet === diet;
      const text = place.textContent.toLowerCase().includes(query);
      const visible = kind && text;
      place.hidden = !visible;
      if (visible) shown += 1;
    }
    if (empty) empty.hidden = shown !== 0;
    document.querySelector(".places")?.dispatchEvent(new Event("gallery:update"));
  };

  for (const button of buttons) {
    button.addEventListener("click", () => {
      diet = button.dataset.filter;
      for (const other of buttons) {
        const on = other === button;
        other.classList.toggle("is-on", on);
        other.setAttribute("aria-pressed", on ? "true" : "false");
      }
      apply();
    });
  }

  input.addEventListener("input", apply);
}

bindParallax();
bindGuide();
