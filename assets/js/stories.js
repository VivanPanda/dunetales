/* DuneTales stories/story pages JS:
   - mobile nav toggle
   - light/dark theme toggle (persists in localStorage)
   - region filter for polaroid grid
*/
(function () {
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("is-open");
    });
  }

  const themeToggle = document.querySelector("[data-theme-toggle]");
  const moon = document.querySelector(".theme-toggle__moon");
  const sun = document.querySelector(".theme-toggle__sun");

  const setTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggle?.setAttribute("aria-pressed", "true");
      themeToggle?.setAttribute("aria-label", "Switch to light mode");
      moon?.classList.add("is-hidden");
      sun?.classList.remove("is-hidden");
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeToggle?.setAttribute("aria-pressed", "false");
      themeToggle?.setAttribute("aria-label", "Switch to dark mode");
      moon?.classList.remove("is-hidden");
      sun?.classList.add("is-hidden");
    }
  };

  const stored = localStorage.getItem("dt-theme");
  if (stored) setTheme(stored);

  themeToggle?.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    localStorage.setItem("dt-theme", next);
    setTheme(next);
  });

  /**
   * Region filter for stories grid
   */
  const filterPills = document.querySelectorAll(".filter-pill");
  const polaroids = document.querySelectorAll(".polaroid[data-region]");

  if (filterPills.length > 0 && polaroids.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener("click", () => {
        // Update active pill
        filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");

        const region = pill.getAttribute("data-filter");

        polaroids.forEach(card => {
          if (region === "all" || card.getAttribute("data-region") === region) {
            card.classList.remove("is-hidden");
          } else {
            card.classList.add("is-hidden");
          }
        });
      });
    });
  }
})();