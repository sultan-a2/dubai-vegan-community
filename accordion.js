(function () {
  const root = document.querySelector(".accordion-gallery");
  if (!root || typeof gsap === "undefined") return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = 0.6;
  const ease = "power3.out";
  const expandRatio = 0.52;
  const parallax = 0.5;
  const tilt = 8;
  const stagger = 0.06;
  const gap = 16;

  let active = 1;
  let first = true;
  let timeline = null;
  let mediaSize = 320;

  const visible = () => [...root.querySelectorAll(".ag-panel")].filter((panel) => !panel.hidden);

  const layout = (animate) => {
    const panels = visible();
    if (!panels.length) return;
    if (active > panels.length - 1) active = 0;

    const count = panels.length;
    const grow = count > 1 ? (expandRatio * (count - 1)) / (1 - expandRatio) : 1;
    const vertical = window.innerWidth <= 720;
    const dur = animate && !reduce ? duration : 0;

    timeline?.kill();
    const tl = gsap.timeline();

    panels.forEach((panel, i) => {
      const open = i === active;
      const media = panel.querySelector(".ag-panel__media");
      const bar = panel.querySelector(".ag-panel__bar");
      const text = panel.querySelector(".ag-panel__text");
      const rot = open || vertical ? 0 : i < active ? tilt : -tilt;

      panel.classList.toggle("ag-panel--active", open);
      if (open) panel.setAttribute("aria-current", "true");
      else panel.removeAttribute("aria-current");
      panel.tabIndex = 0;

      tl.to(
        panel,
        {
          flexGrow: open ? grow : 1,
          rotateY: vertical ? 0 : rot,
          duration: dur,
          ease
        },
        0
      );

      if (media) {
        const drift = Math.max(-1.5, Math.min(1.5, active - i));
        const shift = open ? 0 : drift * parallax * mediaSize * 0.06;
        tl.to(
          media,
          {
            xPercent: -50,
            yPercent: -50,
            x: vertical ? 0 : shift,
            y: 0,
            "--ag-gray": open ? 0 : 1,
            "--ag-dim": open ? 0 : 0.35,
            duration: dur,
            ease
          },
          0
        );
      }

      if (bar && text) {
        if (open) {
          tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: reduce ? 0 : stagger }, 0);
        } else {
          tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
        }
      }
    });

    timeline = tl;
  };

  const measure = () => {
    const rect = root.getBoundingClientRect();
    const panels = visible();
    const usable = Math.max(rect.width - gap * Math.max(panels.length - 1, 0), 120);
    mediaSize = Math.max(140, usable * expandRatio * 1.22);
    root.style.setProperty("--ag-media-size", mediaSize + "px");
    layout(!first);
    first = false;
  };

  const open = (index) => {
    const panels = visible();
    const next = panels[index];
    if (!next) return;
    active = index;
    layout(true);
    next.focus({ preventScroll: true });
  };

  root.addEventListener("mouseenter", (event) => {
    const panel = event.target.closest?.(".ag-panel");
    if (!panel || panel.hidden) return;
    const index = visible().indexOf(panel);
    if (index < 0 || index === active) return;
    active = index;
    layout(true);
  }, true);

  root.addEventListener("focusin", (event) => {
    const panel = event.target.closest?.(".ag-panel");
    if (!panel || panel.hidden) return;
    const index = visible().indexOf(panel);
    if (index < 0 || index === active) return;
    active = index;
    layout(true);
  });

  root.addEventListener("click", (event) => {
    const panel = event.target.closest?.(".ag-panel");
    if (!panel || panel.hidden) return;
    const index = visible().indexOf(panel);
    if (index !== active) {
      event.preventDefault();
      active = index;
      layout(true);
    }
  });

  root.addEventListener("keydown", (event) => {
    const panel = event.target.closest?.(".ag-panel");
    if (!panel) return;
    const panels = visible();
    const index = panels.indexOf(panel);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      open((index + 1) % panels.length);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      open((index - 1 + panels.length) % panels.length);
    }
  });

  root.addEventListener("gallery:update", () => {
    active = 0;
    measure();
  });

  measure();
  new ResizeObserver(measure).observe(root);
})();
