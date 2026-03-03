const themeStorageKey = "hollowtube-theme";
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

(function initializeTheme() {
  const savedTheme = window.localStorage.getItem(themeStorageKey);
  const theme =
    savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : systemThemeQuery.matches
        ? "dark"
        : "light";

  document.documentElement.dataset.theme = theme;
}());

function getThemeIcon(theme) {
  if (theme === "dark") {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3c0 .5.05.99.15 1.46A7 7 0 0 0 19.54 12c.47.1.96.15 1.46.15Z"/></svg>';
  }

  return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"></path></svg>';
}

window.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const blockList = document.getElementById("blockList");
  const navCreate = document.getElementById("navCreate");
  const navDeleteUpdate = document.getElementById("navDeleteUpdate");
  const createView = document.getElementById("createView");
  const deleteUpdateView = document.getElementById("deleteUpdateView");
  const deleteUpdateInput = document.getElementById("deleteUpdateInput");
  const deleteUpdateList = document.getElementById("deleteUpdateList");

  let activeView = "create";
  let deleteUpdateDetectedIds = new Set();

  navCreate.addEventListener("click", (e) => {
    e.stopPropagation();
    activeView = "create";
    createView.style.display = "";
    deleteUpdateView.style.display = "none";
    navCreate.classList.add("is-active");
    navDeleteUpdate.classList.remove("is-active");
    updatePageState();
  });

  navDeleteUpdate.addEventListener("click", (e) => {
    e.stopPropagation();
    activeView = "deleteUpdate";
    createView.style.display = "none";
    deleteUpdateView.style.display = "";
    navDeleteUpdate.classList.add("is-active");
    navCreate.classList.remove("is-active");
    updatePageState();
    deleteUpdateInput.focus();
  });

  if (typeof ELEMENTS !== "undefined" && blockList) {
    ELEMENTS.forEach(item => {
      const li = document.createElement("li");
      li.className = "block-item";

      const label = document.createElement("label");
      label.className = "block-label";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.dataset.id = item.id;

      const span = document.createElement("span");
      span.className = "block-text";
      span.textContent = item.label;

      label.appendChild(input);
      label.appendChild(span);
      li.appendChild(label);
      blockList.appendChild(li);
    });
  }

  const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
  const finalText = document.getElementById("finalText");
  const copyButton = document.getElementById("copyButton");
  const outputPanel = document.getElementById("outputPanel");
  const outputOverlay = document.getElementById("outputOverlay");
  const pageBody = document.body;
  const root = document.documentElement;
  let themeSwitchTimeoutId = null;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeIcon.innerHTML = getThemeIcon(theme);
    themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  }

  function animateThemeToggle() {
    window.clearTimeout(themeSwitchTimeoutId);
    themeToggle.classList.add("is-switching");
    themeSwitchTimeoutId = window.setTimeout(() => {
      themeToggle.classList.remove("is-switching");
    }, 220);
  }

  function resolveInitialTheme() {
    const savedTheme = window.localStorage.getItem(themeStorageKey);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return systemThemeQuery.matches ? "dark" : "light";
  }

  function toggleTheme(e) {
    if (e) e.stopPropagation();
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(themeStorageKey, nextTheme);
    animateThemeToggle();
    applyTheme(nextTheme);
  }

  function handleSystemThemeChange(event) {
    if (window.localStorage.getItem(themeStorageKey)) {
      return;
    }

    animateThemeToggle();
    applyTheme(event.matches ? "dark" : "light");
  }

  function openOutput() {
    pageBody.classList.add("output-open");
    requestAnimationFrame(() => {
      finalText.focus();
    });
  }

  function closeOutput() {
    pageBody.classList.remove("output-open");
    finalText.blur();
  }

  async function copyFinalText(event) {
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(finalText.value);
      window.showMessage("Copied", 1500);
    } catch (error) {
      finalText.focus();
      finalText.select();
      window.showMessage("Select text", 1500);
    }
  }

  function handleCopyButtonPointerDown(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function buildAddOutput(lines, selectedIds) {
    const out = new Set(lines.filter(l => l.trim().length > 0));

    for (const item of ELEMENTS) {
      if (!selectedIds.includes(item.id)) continue;
      for (const rule of item.filters) out.add(rule);
    }

    return [...out].join("\n");
  }

  function renderDeleteUpdateList() {
    deleteUpdateList.innerHTML = "";

    const itemsToRender = ELEMENTS.filter(item => deleteUpdateDetectedIds.has(item.id));

    itemsToRender.forEach(item => {
      const li = document.createElement("li");
      li.className = "block-item";

      const label = document.createElement("label");
      label.className = "block-label is-selected";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.dataset.id = item.id;
      input.checked = true;

      const span = document.createElement("span");
      span.className = "block-text";
      span.textContent = item.label;

      label.appendChild(input);
      label.appendChild(span);
      li.appendChild(label);
      deleteUpdateList.appendChild(li);
    });
  }

  function handleDeleteUpdateInput() {
    if (!deleteUpdateInput) return;
    const lines = deleteUpdateInput.value.split('\n');
    const newDetected = new Set();

    ELEMENTS.forEach(item => {
      const isMatched = item.matchers.some(matcher => lines.some(line => line.includes(matcher)));
      if (isMatched) {
        newDetected.add(item.id);
      }
    });

    let changed = false;
    if (newDetected.size !== deleteUpdateDetectedIds.size) changed = true;
    else {
      for (const id of newDetected) {
        if (!deleteUpdateDetectedIds.has(id)) { changed = true; break; }
      }
    }

    if (changed) {
      deleteUpdateDetectedIds = newDetected;
      renderDeleteUpdateList();
      if (deleteUpdateDetectedIds.size > 0) {
        window.showMessage("Filters detected and updated!", 2500);
      }
    }

    updatePageState();
  }

  function updatePageState() {
    if (activeView === "create") {
      const createCheckboxes = Array.from(blockList.querySelectorAll('input[type="checkbox"]'));
      const selectedIds = createCheckboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.dataset.id);

      createCheckboxes.forEach((checkbox) => {
        checkbox.closest(".block-label").classList.toggle("is-selected", checkbox.checked);
      });

      finalText.value = buildAddOutput([], selectedIds);
    } else {
      const deleteUpdateCheckboxes = Array.from(deleteUpdateList.querySelectorAll('input[type="checkbox"]'));
      const selectedIds = deleteUpdateCheckboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.dataset.id);

      deleteUpdateCheckboxes.forEach((checkbox) => {
        if (!checkbox.checked) {
          checkbox.closest(".block-item").remove();
        } else {
          checkbox.closest(".block-label").classList.add("is-selected");
        }
      });

      const lines = deleteUpdateInput.value.split('\n');
      const detectedMatchers = [];
      deleteUpdateDetectedIds.forEach(id => {
        const item = ELEMENTS.find(e => e.id === id);
        if (item) detectedMatchers.push(...item.matchers);
      });

      const filteredLines = lines.filter(line => {
        const trimmed = line.trim();
        if (!trimmed) return false;
        return !detectedMatchers.some(matcher => line.includes(matcher));
      });

      finalText.value = buildAddOutput(filteredLines, selectedIds);
    }
  }

  blockList.addEventListener("change", updatePageState);
  deleteUpdateList.addEventListener("change", updatePageState);

  if (deleteUpdateInput) {
    deleteUpdateInput.addEventListener("input", handleDeleteUpdateInput);
  }

  themeToggle.addEventListener("click", toggleTheme);
  outputPanel.addEventListener("click", openOutput);
  finalText.addEventListener("focus", openOutput);
  copyButton.addEventListener("pointerdown", handleCopyButtonPointerDown);
  copyButton.addEventListener("click", copyFinalText);
  outputOverlay.addEventListener("click", closeOutput);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOutput();
    }
  });

  if (typeof systemThemeQuery.addEventListener === "function") {
    systemThemeQuery.addEventListener("change", handleSystemThemeChange);
  } else if (typeof systemThemeQuery.addListener === "function") {
    systemThemeQuery.addListener(handleSystemThemeChange);
  }

  applyTheme(resolveInitialTheme());
  updatePageState();
});

window.showMessage = function (message, duration = 3000) {
  const el = document.createElement("div");
  el.className = "dynamic-message";
  el.textContent = message;
  document.body.appendChild(el);

  void el.offsetWidth;

  el.classList.add("is-visible");

  setTimeout(() => {
    el.classList.remove("is-visible");
    setTimeout(() => el.remove(), 300);
  }, duration);
};
