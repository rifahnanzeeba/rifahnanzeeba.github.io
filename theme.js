(() => {
  const root = document.documentElement;
  const storageKey = "rifah-site-theme";

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(storageKey);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  }

  function updateToggleButton(theme) {
    const buttons = document.querySelectorAll("[data-theme-toggle], #theme-toggle");
    const isDark = theme === "dark";

    buttons.forEach((button) => {
      const icon = button.querySelector("i");

      if (icon) {
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }

      const label = isDark ? "Switch to light mode" : "Switch to dark mode";
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    });
  }

  function applyTheme(theme, saveChoice = false) {
    root.setAttribute("data-theme", theme);
    updateToggleButton(theme);

    if (saveChoice) {
      localStorage.setItem(storageKey, theme);
    }
  }

  applyTheme(root.getAttribute("data-theme") || getPreferredTheme());

  document.querySelectorAll("[data-theme-toggle], #theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      applyTheme(newTheme, true);
    });
  });
})();
