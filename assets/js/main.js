document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".main-nav");
  const yearSpan = document.querySelector("[data-year]");
  const searchPanels = document.querySelectorAll("[data-search-panel]");
  const scrollTopBtn = document.querySelector("[data-scroll-top]");

  if (mobileToggle && nav) {
    mobileToggle.addEventListener("click", () => {
      body.classList.toggle("mobile-nav-open");
    });

    nav.addEventListener("click", (evt) => {
      if (evt.target.matches("a")) {
        body.classList.remove("mobile-nav-open");
      }
    });
  }

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 48);
    });
  }

  document.querySelectorAll("img").forEach((img) => {
    if (img.closest(".brand") || img.dataset.lazy === "false") {
      return;
    }
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
    if (!img.hasAttribute("decoding")) {
      img.setAttribute("decoding", "async");
    }
  });

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (searchPanels.length) {
    searchPanels.forEach((panel) => {
      const form = panel.querySelector("form");
      const submitButton = panel.querySelector("[data-search-submit]");

      if (!form || !submitButton) return;

      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        submitButton.disabled = true;
        submitButton.dataset.loading = "true";

        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.dataset.loading = "false";
          const toast = document.createElement("div");
          toast.className = "search-toast";
          toast.textContent = "Search updated with the latest offers!";
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 3200);
        }, 1100);
      });
    });
  }

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.hidden = window.scrollY < 480;
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const dropdownToggles = document.querySelectorAll("[data-dropdown-toggle]");

  const closeDropdown = (toggle) => {
    const parent = toggle.closest(".dropdown");
    if (!parent) return;
    parent.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  dropdownToggles.forEach((toggle) => {
    const parent = toggle.closest(".dropdown");
    if (!parent) return;
    const menu = document.getElementById(toggle.dataset.dropdownToggle);

    if (menu) {
      menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => closeDropdown(toggle));
      });
    }

    toggle.addEventListener("click", (evt) => {
      evt.preventDefault();
      const isOpen = parent.classList.contains("open");
      dropdownToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          closeDropdown(otherToggle);
        }
      });
      if (!isOpen) {
        parent.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
      } else {
        closeDropdown(toggle);
      }
    });
  });

  document.addEventListener("click", (evt) => {
    dropdownToggles.forEach((toggle) => {
      const parent = toggle.closest(".dropdown");
      if (!parent) return;
      if (!parent.contains(evt.target)) {
        closeDropdown(toggle);
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      dropdownToggles.forEach((toggle) => closeDropdown(toggle));
    });
  }

  // FAQ Toggle Functionality (Vanilla JS - works without jQuery)
  const faqContainers = document.querySelectorAll("[data-faq]");
  faqContainers.forEach((container) => {
    const faqQuestions = container.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        const item = this.closest(".faq-item");
        const isActive = item.classList.contains("active");
        
        // Close all FAQ items
        container.querySelectorAll(".faq-item").forEach((faqItem) => {
          faqItem.classList.remove("active");
        });
        
        // Toggle the clicked item
        if (!isActive) {
          item.classList.add("active");
        }
      });
    });
  });

  if (window.jQuery) {
    const $ = window.jQuery;

    // Keep jQuery version as fallback
    $("[data-faq]").on("click", ".faq-question", function () {
      const $item = $(this).closest(".faq-item");
      const isActive = $item.hasClass("active");
      $item.siblings().removeClass("active");
      if (!isActive) {
        $item.addClass("active");
      } else {
        $item.removeClass("active");
      }
    });

    $("[data-tabs]").each(function () {
      const $tabs = $(this);
      $tabs.on("click", ".tab", function () {
        const target = $(this).data("target");
        $(this).addClass("active").siblings().removeClass("active");
        $tabs.find(".tab-panel").removeClass("active");
        $tabs.find(`.tab-panel[data-panel='${target}']`).addClass("active");
      });
    });

    $("[data-newsletter]").on("submit", function (evt) {
      evt.preventDefault();
      const $form = $(this);
      const $button = $form.find("button[type='submit']");
      const email = $form.find("input[type='email']").val();

      if (!email) {
        $button.text("Enter an email");
        setTimeout(() => $button.text("Subscribe"), 1800);
        return;
      }

      $button.prop("disabled", true).text("Subscribing…");

      $.ajax({
        url: "https://httpbin.org/post",
        method: "POST",
        data: { email },
      })
        .done(() => {
          $form[0].reset();
          $button.text("Welcome aboard!");
          setTimeout(() => $button.text("Subscribe"), 2200);
        })
        .fail(() => {
          $button.text("Try again");
        })
        .always(() => {
          setTimeout(() => $button.prop("disabled", false), 1500);
        });
    });
  }

  // Theme Toggle Functionality
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const html = document.documentElement;
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    html.setAttribute("data-theme", "dark");
    updateThemeIcons(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = html.getAttribute("data-theme") === "dark";
      
      if (isDark) {
        html.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        updateThemeIcons(false);
      } else {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        updateThemeIcons(true);
      }
    });
  }

  function updateThemeIcons(isDark) {
    const lightIcons = document.querySelectorAll(".theme-icon-light");
    const darkIcons = document.querySelectorAll(".theme-icon-dark");
    const toggleTexts = document.querySelectorAll(".theme-toggle-text");
    
    lightIcons.forEach(icon => {
      icon.style.display = isDark ? "none" : "block";
    });
    
    darkIcons.forEach(icon => {
      icon.style.display = isDark ? "block" : "none";
    });
    
    toggleTexts.forEach(text => {
      text.textContent = isDark ? "Light mode" : "Dark mode";
    });
  }
});

