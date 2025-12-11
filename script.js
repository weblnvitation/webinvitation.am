document.addEventListener("DOMContentLoaded", () => {
  // ====== MOBILE MENU ======
  const toggle = document.getElementById("mobileMenuToggle");
  const menu = document.getElementById("mobileMenu");
  const yearEl = document.getElementById("year");

  if (!toggle || !menu) return; // safety check
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  toggle.addEventListener("click", () => {
    console.log("Mobile menu toggle clicked"); // log
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
      console.log("Mobile menu link clicked:", link.textContent); // log
      menu.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
    });
  });

  // ====== CATEGORY BUTTONS ======
  const categoryButtons = document.querySelectorAll(".category-btn");
  const templates = document.querySelectorAll(".template-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Category button clicked:", button.dataset.category); // log
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.category;

      templates.forEach((template) => {
        if (category === "all") {
          template.style.display = "block";
        } else {
          template.style.display = template.classList.contains(category)
            ? "block"
            : "none";
        }
      });
    });
  });

  // ====== TEMPLATE BUTTONS ======
  const templateButtons = document.querySelectorAll(".template-btn");

  templateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Template button clicked:", button.dataset.href); // log
      const href = button.dataset.href;
      if (href) {
        window.open(href, "_blank");
      }
    });
  });

  // ====== FAQ ======
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const icon = item.querySelector(".icon");

    question.addEventListener("click", () => {
      console.log("FAQ clicked:", question.textContent); // log

      // Close all others
      items.forEach((i) => {
        if (i !== item) {
          i.classList.remove("open");
          const ic = i.querySelector(".icon");
          if (ic) ic.textContent = "＋";
        }
      });

      const isOpen = item.classList.contains("open");
      item.classList.toggle("open");

      icon.textContent = isOpen ? "＋" : "✕";
    });
  });

  // ====== MODAL ======
  const openBtn = document.getElementById("openOrderModal");
  const modal = document.getElementById("orderModal");
  const closeBtn = document.querySelector(".close-modal");

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener("click", () => {
      console.log("Open modal button clicked"); // log
      modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      console.log("Close modal button clicked"); // log
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        console.log("Modal background clicked"); // log
        modal.style.display = "none";
      }
    });
  }

  // ====== WORKFLOW CAROUSEL ======
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  if (track && prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      console.log("Carousel next clicked"); // log
      track.scrollBy({ left: 300, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      console.log("Carousel prev clicked"); // log
      track.scrollBy({ left: -300, behavior: "smooth" });
    });

    // Optional: drag support
    let isDragging = false;
    let startX;
    let scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener("mouseleave", () => (isDragging = false));
    track.addEventListener("mouseup", () => (isDragging = false));

    track.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed
      track.scrollLeft = scrollLeft - walk;
    });
  }
});
