// Header Component Generator
function generateHeader() {
  const headerHTML = `
    <header id="main-header">
      <div class="container nav-container">
        <a href="#" class="logo">
          <img src="/assets/image/logokyra.png" alt="KYRA GROUP" />
        </a>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about/">About</a></li>
          <li><a href="/project/">Projects</a></li>
          <li><a href="/contact/">Contact</a></li>
          <li><a href="/job/">Careers</a></li>
        </ul>
        <button class="btn btn-primary open-callback-modal">
          Get Callback
        </button>
        <button class="mobile-menu-btn">☰</button>
      </div>
      <div class="mobile-menu-overlay"></div>
    </header>
  `;
  return headerHTML;
}

// Insert header dynamically
function insertHeader() {
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = generateHeader();

    // Initialize mobile menu functionality after header insertion
    initializeMobileMenu();
  }
}

// Mobile Menu Functionality
function initializeMobileMenu() {
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const mobileOverlay = document.querySelector(".mobile-menu-overlay");
  let mobileMenuOpen = false;

  console.log("Initializing mobile menu...");
  console.log("Mobile button:", mobileBtn);
  console.log("Nav links:", navLinks);
  console.log("Mobile overlay:", mobileOverlay);

  function toggleMobileMenu() {
    console.log("Toggling mobile menu, current state:", mobileMenuOpen);
    mobileMenuOpen = !mobileMenuOpen;

    if (mobileMenuOpen) {
      console.log("Opening left drawer");

      // Force inline styles to make drawer visible
      navLinks.style.position = "fixed";
      navLinks.style.top = "0";
      navLinks.style.left = "-300px";
      navLinks.style.width = "300px";
      navLinks.style.height = "100vh";
      navLinks.style.background = "white";
      navLinks.style.flexDirection = "column";
      navLinks.style.padding = "70px 16px 20px 16px";
      navLinks.style.boxShadow = "2px 0 15px rgba(0, 0, 0, 0.15)";
      navLinks.style.zIndex = "9999";
      navLinks.style.transition = "left 0.3s ease";
      navLinks.style.overflowY = "auto";
      navLinks.style.margin = "0";
      navLinks.style.listStyle = "none";
      navLinks.style.display = "flex";
      navLinks.style.alignItems = "flex-start";
      navLinks.style.justifyContent = "flex-start";

      console.log("Applied inline styles to drawer");

      // Add classes
      navLinks.classList.add("mobile-active");
      mobileOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      mobileBtn.innerHTML = "✕";
      mobileBtn.style.color = "#2d7a4a";

      // Slide in the drawer
      setTimeout(() => {
        navLinks.style.left = "0";
        navLinks.classList.add("show");
        console.log("Drawer should now be visible at left: 0");
      }, 10);

      // Style the navigation links - compact design
      const links = navLinks.querySelectorAll("li");
      links.forEach((li) => {
        li.style.margin = "0 0 6px 0";
        li.style.width = "100%";
        li.style.listStyle = "none";

        const anchor = li.querySelector("a");
        if (anchor) {
          anchor.style.display = "flex";
          anchor.style.alignItems = "center";
          anchor.style.padding = "12px 16px";
          anchor.style.fontSize = "15px";
          anchor.style.fontWeight = "500";
          anchor.style.color = "#333";
          anchor.style.textDecoration = "none";
          anchor.style.borderRadius = "6px";
          anchor.style.transition = "all 0.3s ease";
          anchor.style.border = "1px solid transparent";
          anchor.style.textAlign = "left";
          anchor.style.minHeight = "44px";
          anchor.style.lineHeight = "1.4";
        }
      });
    } else {
      console.log("Closing left drawer");
      navLinks.style.left = "-300px";
      navLinks.classList.remove("show");
      mobileBtn.innerHTML = "☰";
      mobileBtn.style.color = "";

      // Remove classes and styles after animation completes
      setTimeout(() => {
        navLinks.classList.remove("mobile-active");
        mobileOverlay.classList.remove("active");
        document.body.style.overflow = "";

        // Reset all inline styles
        navLinks.style.cssText = "";
        const links = navLinks.querySelectorAll("li");
        links.forEach((li) => {
          li.style.cssText = "";
          const anchor = li.querySelector("a");
          if (anchor) {
            anchor.style.cssText = "";
          }
        });
      }, 300);
    }
  }

  if (mobileBtn) {
    console.log("Adding click listener to mobile button");
    mobileBtn.addEventListener("click", (e) => {
      console.log("Mobile button clicked");
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });
  } else {
    console.error("Mobile button not found!");
  }

  // Close mobile menu when clicking overlay
  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", (e) => {
      console.log("Overlay clicked");
      if (mobileMenuOpen) {
        e.preventDefault();
        toggleMobileMenu();
      }
    });
  }

  // Close mobile menu when clicking nav links
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        console.log("Nav link clicked");
        if (mobileMenuOpen) {
          toggleMobileMenu();
        }
      });
    });
  }

  // Close mobile menu on window resize if screen becomes larger
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileMenuOpen) {
      console.log("Window resized, closing mobile menu");
      toggleMobileMenu();
    }
  });

  // Close mobile menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenuOpen) {
      console.log("Escape key pressed");
      toggleMobileMenu();
    }
  });
}

// Footer Component Generator
function generateFooter() {
  const footerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <a href="#" class="logo" style="color: white; font-size: 20px"
              >KYRA GROUP</a
            >
            <p style="margin-top: 20px">
              Building legacies since 2010. We specialize in ethically sourced,
              legally strong real estate developments in Tamil Nadu and Kerala.
            </p>
            <div class="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                  />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#portfolio">Our Projects</a></li>
              <li><a href="#offers">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Locations</h4>
            <ul>
              <li><a href="#">Chennai, Tamil Nadu</a></li>
              <li><a href="#">Coimbatore, Tamil Nadu</a></li>
              <li><a href="#">Kochi, Kerala</a></li>
              <li><a href="#">Trivandrum, Kerala</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Disclaimer</a></li>
              <li><a href="#">RERA Numbers</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>
            &copy; 2025 KYRA GROUP. All Rights Reserved. Designed for High
            Performance.
          </p>
        </div>
      </div>
    </footer>
  `;
  return footerHTML;
}

// Insert footer dynamically
function insertFooter() {
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = generateFooter();
  }
}

// Initialize header, footer and modal on DOM load
document.addEventListener("DOMContentLoaded", function () {
  insertHeader();
  insertCallbackModal();
  insertFooter();
});

// Callback Modal Component Generator
function generateCallbackModal() {
  const modalHTML = `
    <div class="callback-modal-overlay" id="callbackModal">
      <div class="callback-modal">
        <button class="callback-modal-close">&times;</button>
        <h3>Request a Callback</h3>
        <p>Fill in your details and our team will get back to you shortly.</p>
        <form class="callback-form" id="contact-form2">
          <div class="form-group">
            <label for="callback-name">Full Name *</label>
            <input
              type="text"
              id="callback-name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="form-group">
            <label for="callback-email">Email Address *</label>
            <input
              type="email"
              id="callback-email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="callback-mobile">Mobile Number *</label>
            <input
              type="tel"
              id="callback-mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div class="form-group">
            <label for="callback-message">Message (Optional)</label>
            <textarea
              id="callback-message"
              name="message"
              placeholder="Tell us about your requirements..."
            ></textarea>
          </div>
          <button
            id="contact_form_btn2"
            type="submit"
            class="btn btn-primary btn-submit"
          >
            Request Callback
          </button>
          <div
            id="success_message_col2"
            class="mt-2"
            style="margin-top: 10px"
          ></div>
          <div id="error_message2" class="error"></div>
        </form>
      </div>
    </div>
  `;
  return modalHTML;
}

// Insert callback modal dynamically
function insertCallbackModal() {
  // Create modal container at end of body
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal-container";
  modalContainer.innerHTML = generateCallbackModal();
  document.body.appendChild(modalContainer);

  // Initialize modal functionality after insertion
  initializeCallbackModal();
}

// Callback Modal Functionality
function initializeCallbackModal() {
  const callbackModal = document.getElementById("callbackModal");
  const openModalBtns = document.querySelectorAll(".open-callback-modal");
  const closeModalBtn = document.querySelector(".callback-modal-close");
  const callbackForm = document.getElementById("contact-form2");

  // Open modal
  if (openModalBtns) {
    openModalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (callbackModal) {
          callbackModal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });
  }

  // Close modal function
  function closeCallbackModal() {
    if (callbackModal) {
      callbackModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Close modal events
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeCallbackModal);
  }

  if (callbackModal) {
    callbackModal.addEventListener("click", (e) => {
      if (e.target === callbackModal) closeCallbackModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      callbackModal &&
      callbackModal.classList.contains("active")
    ) {
      closeCallbackModal();
    }
  });

  // Form submission handling
  if (callbackForm) {
    callbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = callbackForm.querySelector(".btn-submit");
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        callbackForm.innerHTML = `
          <div style="text-align: center; padding: 20px 0;">
            <div style="width: 60px; height: 60px; background: var(--primary-green); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 28px;">✓</div>
            <h3 style="margin-bottom: 8px;">Thank You!</h3>
            <p style="color: var(--text-light);">We'll get back to you within 24 hours.</p>
          </div>
        `;
        setTimeout(closeCallbackModal, 2500);
      }, 1500);
    });
  }
}
