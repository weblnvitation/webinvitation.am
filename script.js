document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // MOBILE MENU
  // ========================
  const toggle = document.getElementById("mobileMenuToggle");
  const menu = document.getElementById("mobileMenu");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      const isActive = menu.classList.contains("active");
      toggle.setAttribute("aria-expanded", String(isActive));
      toggle.setAttribute(
        "aria-label",
        isActive ? "Закрыть меню" : "Открыть меню"
      );
    });

    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Открыть меню");
      });
    });
  }

  // ========================
  // CATEGORY FILTER
  // ========================
  const categoryButtons = document.querySelectorAll(".category-btn");
  const templates = document.querySelectorAll(".template-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.category;
      templates.forEach((template) => {
        template.style.display =
          category === "all" || template.classList.contains(category)
            ? "block"
            : "none";
      });
    });
  });

  // ========================
  // TEMPLATE BUTTONS
  // ========================
  document.querySelectorAll(".template-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const href = button.dataset.href;
      if (href) window.open(href, "_blank");
    });
  });

  // ========================
  // FAQ TOGGLE
  // ========================
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const icon = item.querySelector(".icon");

    question.addEventListener("click", () => {
      // Close others
      faqItems.forEach((i) => {
        if (i !== item) {
          i.classList.remove("open");
          const ic = i.querySelector(".icon");
          if (ic) ic.textContent = "＋";
        }
      });

      const isOpen = item.classList.contains("open");
      item.classList.toggle("open");
      if (icon) icon.textContent = isOpen ? "＋" : "✕";
    });
  });

  // ========================
  // MODAL
  // ========================
  const openBtns = document.getElementsByClassName("openOrderModal");
  const modal = document.getElementById("orderModal");
  const closeBtn = document.querySelector(".close-modal");

  if (openBtns && modal && closeBtn) {
    // Loop through all buttons
    Array.from(openBtns).forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.style.display = "flex";
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  // ========================
  // WORKFLOW CAROUSEL (MOBILE)
  // ========================
  const track = document.querySelector(".workflow-grid");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const scrollHint = document.querySelector(".scroll-hint");

  if (track && prevBtn && nextBtn) {
    const getScrollAmount = () => {
      const card = track.querySelector(".workflow-card");
      if (!card) return 260;
      const style = getComputedStyle(card);
      const gap = parseInt(style.marginRight) || 16; // fallback gap
      return card.offsetWidth + gap;
    };

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      if (scrollHint) scrollHint.style.display = "none";
    });

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
      if (scrollHint) scrollHint.style.display = "none";
    });

    // Drag / touch support
    let isDragging = false,
      startX,
      scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      if (scrollHint) scrollHint.style.display = "none";
    });

    track.addEventListener("mouseup", () => (isDragging = false));
    track.addEventListener("mouseleave", () => (isDragging = false));

    track.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 2;
    });

    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = track.scrollLeft;
      if (scrollHint) scrollHint.style.display = "none";
    });

    track.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX;
      track.scrollLeft = scrollLeft + (startX - x);
    });
  }

  // ========================
  // ANIMATIONS ON VIEW
  // ========================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(
      ".fade-in, .price-card, .workflow-card, .main-title, .subtitle, .lead, .section-title, .workflow-card-title, .template-title"
    )
    .forEach((el) => observer.observe(el));
});
