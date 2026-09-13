/* =========================================================
   PiptraderAI — Landing Page Scripts
   Vanilla JS • No dependencies
   ========================================================= */

(function () {
  "use strict";

  /* -------------------------------------------------------
     1. MOBILE MENU TOGGLE
     ------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks  = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a link inside is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("is-open") &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Close menu if window is resized to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* -------------------------------------------------------
     2. NAV BACKGROUND ON SCROLL
     ------------------------------------------------------- */
  const nav = document.getElementById("nav");

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    onScroll(); // run once on load
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS
     ------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything if IntersectionObserver isn't supported
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* -------------------------------------------------------
     4. AUTO-UPDATE FOOTER YEAR
     ------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------------
     5. SMOOTH SCROLL FOR ANCHOR LINKS (with sticky nav offset)
     ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#" || targetId === "#top") {
        if (targetId === "#top") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = nav ? nav.offsetHeight : 0;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight - 12;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* -------------------------------------------------------
     6. (OPTIONAL) TRACK AFFILIATE LINK CLICKS
     ------------------------------------------------------- */
  // Logs clicks on outbound affiliate links to the console.
  // Replace with your analytics (Google Analytics, Plausible, etc.)
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.addEventListener("click", () => {
      const url = link.href;
      // Example: window.gtag && gtag('event', 'outbound_click', { link_url: url });
      console.log("[PiptraderAI] Outbound click:", url);
    });
  });
})();
