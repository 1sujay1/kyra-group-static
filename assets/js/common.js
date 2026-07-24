// Asset Path Helper for Subdirectory Pages (Robust Multi-Level Path Resolution)
function getAssetPath(relativePath) {
  if (relativePath === undefined || relativePath === null) return '/';
  if (relativePath === '') return '/';
  
  const cleanRel = relativePath.replace(/^\/+/, '');
  const p = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '');
  const segments = p.split('/').filter(Boolean);
  
  let depth = 0;
  if (segments.length > 0) {
    const topFolder = segments[0].toLowerCase();
    if (['about', 'project', 'gallery', 'contact', 'job', 'news'].includes(topFolder)) {
      depth = segments.length;
    }
  }
  
  const prefix = depth === 0 ? '/' : '../'.repeat(depth);
  return prefix + cleanRel;
}

// Header Component Generator
function generateHeader() {
  const logoPath = getAssetPath('assets/portalImages/logo.png');
  const logoFallback = getAssetPath('assets/image/logo.png');
  const homePath = getAssetPath('');
  const headerHTML = `
    <header id="main-header">
      <div class="container nav-container">
        <a href="${homePath}" class="logo">
          <img src="${logoPath}" alt="KYRA GROUP" onerror="this.onerror=null;this.src='${logoFallback}';" />
        </a>
        <ul class="nav-links">
          <li><a href="${getAssetPath('')}">Home</a></li>
          <li><a href="${getAssetPath('project/')}">Project</a></li>
          <li><a href="${getAssetPath('gallery/')}">Gallery</a></li>
          <li><a href="${getAssetPath('about/')}">About Us</a></li>
          <li><a href="${getAssetPath('contact/')}">Contact Us</a></li>
        </ul>
        <div class="header-actions">
          <button class="btn btn-primary open-callback-modal">
            Get Callback
          </button>
          <button class="btn btn-secondary open-brochure-modal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            Download Brochure
          </button>
        </div>
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

    // Highlight active link based on current URL path
    const currentPath = window.location.pathname;
    const navAnchors = headerContainer.querySelectorAll(".nav-links a");
    navAnchors.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      
      const cleanPath = currentPath.replace(/\/index\.html$/, "/").replace(/\/$/, "");
      const cleanHref = href.replace(/\/index\.html$/, "/").replace(/\/$/, "");

      if (cleanHref === "" && (cleanPath === "" || cleanPath === "/")) {
        a.classList.add("active");
      } else if (cleanHref !== "" && (cleanPath === cleanHref || cleanPath.startsWith(cleanHref + "/"))) {
        a.classList.add("active");
      }
    });

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
  const currentYear = new Date().getFullYear();
  const logoPath = getAssetPath('assets/portalImages/logo.png');
  const logoFallback = getAssetPath('assets/image/logo.png');
  const homePath = getAssetPath('');
  const footerHTML = `
    <footer class="site-footer">
      <div class="container">
        <!-- Footer Main Grid -->
        <div class="footer-grid">
          <!-- Col 1: Brand & Slogan -->
          <div class="footer-brand-col">
            <a href="${homePath || '/'}" class="footer-logo" style="display: inline-flex; align-items: center; background: #ffffff; padding: 10px 20px; border-radius: 14px; margin-bottom: 16px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">
              <img src="${logoPath}" alt="KYRA GROUP" style="height: 44px; width: auto; object-fit: contain;" onerror="this.onerror=null;this.src='${logoFallback}';" />
            </a>
            <p class="footer-desc">
              Transforming carefully selected land into well-planned developments. Building ethically sourced, legally verified farm land communities & residential plot layouts across South India since 2016.
            </p>
            <div class="footer-contact-info">
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+91 98765 43210</span>
              </div>
              <div class="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>contact@kyragroup.in</span>
              </div>
            </div>
          </div>

          <!-- Col 2: Navigation Links -->
          <div class="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="${getAssetPath('')}">Home</a></li>
              <li><a href="${getAssetPath('about/')}">About Us</a></li>
              <li><a href="${getAssetPath('project/')}">Our Projects</a></li>
              <li><a href="${getAssetPath('gallery/')}">Project Gallery</a></li>
              <li><a href="${getAssetPath('job/')}">Careers</a></li>
              <li><a href="${getAssetPath('news/')}">News & Media</a></li>
              <li><a href="${getAssetPath('contact/')}">Contact Us</a></li>
            </ul>
          </div>

          <!-- Col 3: Key Locations -->
          <div class="footer-links-col">
            <h4>Development Hubs</h4>
            <ul>
              <li><a href="${getAssetPath('project/')}">Erode, Tamil Nadu</a></li>
              <li><a href="${getAssetPath('project/')}">Coimbatore, Tamil Nadu</a></li>
              <li><a href="${getAssetPath('project/')}">Pollachi, Tamil Nadu</a></li>
              <li><a href="${getAssetPath('project/')}">Kochi, Kerala</a></li>
              <li><a href="${getAssetPath('project/')}">Wayanad, Kerala</a></li>
              <li><a href="${getAssetPath('project/')}">Trivandrum, Kerala</a></li>
            </ul>
          </div>

          <!-- Col 4: Trust & Socials -->
          <div class="footer-links-col">
            <h4>Legal & Compliance</h4>
            <ul>
              <li><a href="${getAssetPath('about/')}">100% Legal Clearances</a></li>
              <li><a href="${getAssetPath('project/')}">DTCP Approved Layouts</a></li>
              <li><a href="${getAssetPath('contact/')}">RERA Registration</a></li>
              <li><a href="${getAssetPath('contact/')}">Title Verification</a></li>
            </ul>
            
            <h4 style="margin-top: 24px; margin-bottom: 12px;">Connect With Us</h4>
            <div class="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="site-footer-bottom">
          <p>&copy; ${currentYear} KYRA GROUP. All Rights Reserved. Designed for Long-Term Value.</p>
          <div class="footer-legal-links">
            <a href="${getAssetPath('contact/')}">Privacy Policy</a>
            <span>•</span>
            <a href="${getAssetPath('contact/')}">Terms of Service</a>
            <span>•</span>
            <a href="${getAssetPath('contact/')}">Disclaimer</a>
          </div>
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

// Hero Banner Component Generator
function generateHeroBanner() {
  const bannerImages = [
    {
      src: "assets/portalImages/DJI_0012.webp",
      title: "Premium Farm Landss",
      subtitle:
        "Invest in fertile agricultural lands with guaranteed returns and legal clarity",
    },
    {
      src: "assets/portalImages/DJI_0024.webp",
      title: "Scenic Plot Developments",
      subtitle:
        "Beautiful residential plots surrounded by nature and modern amenities",
    },
    {
      src: "assets/portalImages/DJI_0036.webp",
      title: "Agricultural Excellence",
      subtitle: "High-yield farm lands with water source and road connectivity",
    },
    {
      src: "assets/portalImages/DJI_0039.webp",
      title: "Investment Opportunities",
      subtitle: "Secure your future with our legally verified land investments",
    },
    {
      src: "assets/portalImages/DJI_0040.webp",
      title: "Developed Infrastructure",
      subtitle:
        "Ready-to-build plots with all essential amenities and clear titles",
    },
  ];

  const bannerHTML = `
    <section class="hero-banner" id="heroBanner">
      <div class="banner-slider" id="bannerSlider">
        ${bannerImages
          .map(
            (image, index) => `
          <div class="banner-slide ${index === 0 ? "active" : ""}">
            <img src="${image.src}" alt="${image.title}" loading="${index === 0 ? "eager" : "lazy"}">
            <div class="banner-content">
              <h1>${image.title}</h1>
              <p>${image.subtitle}</p>
              <div class="banner-cta">
                <a href="/project/" class="cta-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  View Projects
                </a>
                <a href="/contact/" class="cta-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Contact Us
                </a>
           
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
      
      <!-- Navigation Controls -->
      <button class="banner-control prev" id="bannerPrev">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button class="banner-control next" id="bannerNext">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
      
      <!-- Dot Navigation -->
      <div class="banner-nav" id="bannerNav">
        ${bannerImages
          .map(
            (_, index) => `
          <div class="nav-dot ${index === 0 ? "active" : ""}" data-slide="${index}"></div>
        `,
          )
          .join("")}
      </div>
      
      <!-- Info Cards -->
      <div class="banner-info">
        <div class="info-card">
          <div class="number">500+</div>
          <div class="label">Happy Customers</div>
        </div>
        <div class="info-card">
          <div class="number">15+</div>
          <div class="label">Years Experience</div>
        </div>
        <div class="info-card">
          <div class="number">1000+</div>
          <div class="label">Acres Developed</div>
        </div>
      </div>
    </section>
  `;

  return bannerHTML;
}

// Insert hero banner dynamically
function insertHeroBanner() {
  const bannerContainer = document.getElementById("banner-container");
  if (bannerContainer) {
    bannerContainer.innerHTML = generateHeroBanner();
    initializeHeroBanner();
  }
}

// Hero Banner Functionality with Touch Support
function initializeHeroBanner() {
  const banner = document.getElementById("heroBanner");
  const slider = document.getElementById("bannerSlider");
  const slides = slider.querySelectorAll(".banner-slide");
  const prevBtn = document.getElementById("bannerPrev");
  const nextBtn = document.getElementById("bannerNext");
  const navDots = document.querySelectorAll(".nav-dot");

  let currentSlide = 0;
  let isAnimating = false;
  let autoSlideInterval;

  // Touch/Swipe variables
  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let deltaY = 0;
  let isSwiping = false;

  // Auto-slide functionality
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Slide navigation
  function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;

    isAnimating = true;

    // Remove active classes
    slides[currentSlide].classList.remove("active");
    navDots[currentSlide].classList.remove("active");

    // Update current slide
    currentSlide = index;

    // Add active classes
    slides[currentSlide].classList.add("active");
    navDots[currentSlide].classList.add("active");

    // Apply transform
    const translateX = -currentSlide * 100;
    slider.style.transform = `translateX(${translateX}%)`;

    setTimeout(() => {
      isAnimating = false;
    }, 600);
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }

  // Touch event handlers
  function handleTouchStart(e) {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    isSwiping = true;
    stopAutoSlide();
  }

  function handleTouchMove(e) {
    if (!isSwiping) return;

    const touch = e.touches[0];
    deltaX = touch.clientX - startX;
    deltaY = touch.clientY - startY;

    // Only block native scrolling when the user is swiping horizontally.
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();

      const currentTranslateX = -currentSlide * 100;
      const swipeOffset = (deltaX / slider.offsetWidth) * 100;
      slider.style.transform = `translateX(${currentTranslateX + swipeOffset}%)`;
    }
  }

  function handleTouchEnd() {
    if (!isSwiping) return;

    isSwiping = false;

    // Determine swipe direction and threshold
    const swipeThreshold = 50;
    const abseDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Reset transform
    const currentTranslateX = -currentSlide * 100;
    slider.style.transform = `translateX(${currentTranslateX}%)`;

    // Check if it's a horizontal swipe
    if (abseDeltaX > absDeltaY && abseDeltaX > swipeThreshold) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    // Reset values
    deltaX = 0;
    deltaY = 0;
    startAutoSlide();
  }

  // Mouse event handlers for desktop
  function handleMouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;
    isSwiping = true;
    stopAutoSlide();
    slider.style.cursor = "grabbing";
  }

  function handleMouseMove(e) {
    if (!isSwiping) return;

    e.preventDefault();
    deltaX = e.clientX - startX;
    deltaY = e.clientY - startY;

    const currentTranslateX = -currentSlide * 100;
    const swipeOffset = (deltaX / slider.offsetWidth) * 100;
    slider.style.transform = `translateX(${currentTranslateX + swipeOffset}%)`;
  }

  function handleMouseUp() {
    if (!isSwiping) return;

    isSwiping = false;
    slider.style.cursor = "grab";

    const swipeThreshold = 50;
    const abseDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    const currentTranslateX = -currentSlide * 100;
    slider.style.transform = `translateX(${currentTranslateX}%)`;

    if (abseDeltaX > absDeltaY && abseDeltaX > swipeThreshold) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    deltaX = 0;
    deltaY = 0;
    startAutoSlide();
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
  }

  // Dot navigation
  navDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(index);
      startAutoSlide();
    });
  });

  // Touch events
  slider.addEventListener("touchstart", handleTouchStart, { passive: false });
  slider.addEventListener("touchmove", handleTouchMove, { passive: false });
  slider.addEventListener("touchend", handleTouchEnd);

  // Mouse events for desktop
  slider.addEventListener("mousedown", handleMouseDown);
  slider.addEventListener("mousemove", handleMouseMove);
  slider.addEventListener("mouseup", handleMouseUp);
  slider.addEventListener("mouseleave", handleMouseUp);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    } else if (e.key === "ArrowRight") {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    }
  });

  // Pause on hover
  banner.addEventListener("mouseenter", stopAutoSlide);
  banner.addEventListener("mouseleave", startAutoSlide);

  // Initialize auto-slide
  startAutoSlide();

  // Preload next images
  const imageLoader = new Image();
  slides.forEach((slide, index) => {
    if (index > 0) {
      const img = slide.querySelector("img");
      imageLoader.src = img.src;
    }
  });
}

// Initialize banner on DOM load
document.addEventListener("DOMContentLoaded", function () {
  insertHeader();
  insertHeroBanner();
  insertCallbackModal();
  insertBrochureModal();
  initializeVideoModal();
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

// Brochure Modal Component Generator
function generateBrochureModal() {
  const modalHTML = `
    <div class="brochure-modal-overlay" id="brochureModal">
      <div class="brochure-modal">
        <button class="brochure-modal-close">&times;</button>
        <h3>Download Our Brochure</h3>
        <p>Get detailed information about our premium land developments and investment opportunities. Fill in your details to download our comprehensive brochure.</p>
        <form class="brochure-form" id="brochure-form">
          <div class="form-group">
            <label for="brochure-name">Full Name *</label>
            <input
              type="text"
              id="brochure-name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="form-group">
            <label for="brochure-email">Email Address *</label>
            <input
              type="email"
              id="brochure-email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="brochure-mobile">Mobile Number *</label>
            <input
              type="tel"
              id="brochure-mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <button
            id="brochure_form_btn"
            type="submit"
            class="btn btn-primary btn-submit"
          >
            Download Brochure
          </button>
          <div
            id="brochure_success_message"
            class="mt-2"
            style="margin-top: 10px"
          ></div>
          <div id="brochure_error_message" class="error"></div>
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

// Insert brochure modal dynamically
function insertBrochureModal() {
  // Create modal container at end of body
  const brochureModalContainer = document.createElement("div");
  brochureModalContainer.id = "brochure-modal-container";
  brochureModalContainer.innerHTML = generateBrochureModal();
  document.body.appendChild(brochureModalContainer);

  // Initialize modal functionality after insertion
  initializeBrochureModal();
}

// Callback Modal Functionality
function initializeCallbackModal() {
  const callbackModal = document.getElementById("callbackModal");
  const openModalBtns = document.querySelectorAll(".open-callback-modal");
  const closeModalBtn = document.querySelector(".callback-modal-close");
  //   const callbackForm = document.getElementById("contact-form2");

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
  //   if (callbackForm) {
  //     callbackForm.addEventListener("submit", (e) => {
  //       e.preventDefault();
  //       const submitBtn = callbackForm.querySelector(".btn-submit");
  //       const originalText = submitBtn.innerText;
  //       submitBtn.innerText = "Sending...";
  //       submitBtn.disabled = true;

  //       // Simulate API call
  //       setTimeout(() => {
  //         callbackForm.innerHTML = `
  //           <div style="text-align: center; padding: 20px 0;">
  //             <div style="width: 60px; height: 60px; background: var(--primary-green); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 28px;">✓</div>
  //             <h3 style="margin-bottom: 8px;">Thank You!</h3>
  //             <p style="color: var(--text-light);">We'll get back to you within 24 hours.</p>
  //           </div>
  //         `;
  //         setTimeout(closeCallbackModal, 2500);
  //       }, 1500);
  //     });
  //   }
}

// Brochure Modal Functionality
function initializeBrochureModal() {
  const brochureModal = document.getElementById("brochureModal");
  const openModalBtns = document.querySelectorAll(".open-brochure-modal");
  const closeModalBtn = document.querySelector(".brochure-modal-close");

  // Open modal
  if (openModalBtns) {
    openModalBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (brochureModal) {
          brochureModal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });
  }

  // Close modal function
  function closeBrochureModal() {
    if (brochureModal) {
      brochureModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Close modal events
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeBrochureModal);
  }

  if (brochureModal) {
    brochureModal.addEventListener("click", (e) => {
      if (e.target === brochureModal) closeBrochureModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      brochureModal &&
      brochureModal.classList.contains("active")
    ) {
      closeBrochureModal();
    }
  });
}

// Video Modal Functionality
function initializeVideoModal() {
  const videoModal = document.getElementById("videoModal");
  const openVideoModalBtns = document.querySelectorAll(".video-play-btn");
  const closeVideoModalBtn = document.querySelector(".video-modal-close");
  const iframe = document.getElementById("youtube-player");
  const youtubeUrl = "https://www.youtube.com/embed/v8BsVr_vejM";

  function openVideoModal() {
    if (!videoModal || !iframe) return;
    iframe.src = `${youtubeUrl}?autoplay=1&mute=1&rel=0&playsinline=1&loop=1&playlist=v8BsVr_vejM`;
    videoModal.classList.add("active");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeVideoModal() {
    if (!videoModal || !iframe) return;
    videoModal.classList.remove("active");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    iframe.src = "";
  }

  openVideoModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openVideoModal();
    });
  });

  if (closeVideoModalBtn) {
    closeVideoModalBtn.addEventListener("click", closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (
        e.target === videoModal ||
        e.target.classList.contains("video-modal-overlay")
      ) {
        closeVideoModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      videoModal &&
      videoModal.classList.contains("active")
    ) {
      closeVideoModal();
    }
  });
}

// Initialize banner on DOM load
document.addEventListener("DOMContentLoaded", function () {
  insertHeader();
  insertHeroBanner();
  insertCallbackModal();
  insertBrochureModal();
  initializeVideoModal();
  insertFooter();
});

document.addEventListener("DOMContentLoaded", function () {
  var bookingForm = document.getElementById("contact-form2");
  if (!bookingForm) return;
  var successMsg = document.getElementById("success_message_col2");
  var errorMsg = document.getElementById("error_message2");
  var submitBtn = document.getElementById("contact_form_btn2");
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (successMsg) {
      successMsg.textContent = "";
      successMsg.style.display = "none";
    }
    if (errorMsg) {
      errorMsg.textContent = "";
      errorMsg.style.display = "none";
    }
    console.log("Form data:", bookingForm);
    var name = bookingForm.name.value.trim();
    var email = bookingForm.email.value.trim();
    var mobile = bookingForm.querySelector("[name=mobile]")?.value.trim() || "";
    console.log("Mobile:", mobile);
    var message = bookingForm.message?.value?.trim() || "";
    console.log({ name, email, mobile, message });
    console.log("Submitting form...");
    console.log("Using BaseURL:", BaseURL);
    console.log(submitBtn);
    if (!name || !email || !mobile) {
      if (errorMsg) {
        errorMsg.style.display = "block";
        errorMsg.style.color = "#d32f2f";
        errorMsg.textContent = "Please fill all required fields.";
      }
      return;
    }
    submitBtn.disabled = true;
    var originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Submitting...";
    fetch(`${BaseURL}/api/v1/kyra/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: "KYRA_GROUP_INDIA",
        name,
        email,
        phone: mobile,
        message,
      }),
    })
      .then(function (res) {
        if (res.status !== 200) {
          throw new Error("Failed to submit. Please try again.");
        }
        return res.json();
      })
      .then(function (data) {
        if (successMsg) {
          successMsg.style.display = "block";
          successMsg.style.color = "#388e3c";
          successMsg.textContent = "Thank you! Your request has been sent.";
        }
        bookingForm.reset();
      })
      .catch(function (err) {
        if (errorMsg) {
          errorMsg.style.display = "block";
          errorMsg.style.color = "#d32f2f";
          errorMsg.textContent =
            err.message || "Submission failed. Please try again.";
        }
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
});

// Brochure Form Handling
document.addEventListener("DOMContentLoaded", function () {
  var brochureForm = document.getElementById("brochure-form");
  if (!brochureForm) return;
  var brochureSuccessMsg = document.getElementById("brochure_success_message");
  var brochureErrorMsg = document.getElementById("brochure_error_message");
  var brochureSubmitBtn = document.getElementById("brochure_form_btn");
  brochureForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (brochureSuccessMsg) {
      brochureSuccessMsg.textContent = "";
      brochureSuccessMsg.style.display = "none";
    }
    if (brochureErrorMsg) {
      brochureErrorMsg.textContent = "";
      brochureErrorMsg.style.display = "none";
    }
    console.log("Brochure Form data:", brochureForm);
    var name = brochureForm.name.value.trim();
    var email = brochureForm.email.value.trim();
    var mobile =
      brochureForm.querySelector("[name=mobile]")?.value.trim() || "";
    console.log({ name, email, mobile });
    console.log("Submitting brochure form...");
    console.log("Using BaseURL:", BaseURL);
    if (!name || !email || !mobile) {
      if (brochureErrorMsg) {
        brochureErrorMsg.style.display = "block";
        brochureErrorMsg.style.color = "#d32f2f";
        brochureErrorMsg.textContent = "Please fill all required fields.";
      }
      return;
    }
    brochureSubmitBtn.disabled = true;
    var originalText = brochureSubmitBtn.innerHTML;
    brochureSubmitBtn.innerHTML = "Downloading...";
    fetch(`${BaseURL}/api/v1/kyra/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: "KYRA_GROUP_INDIA",
        name,
        email,
        phone: mobile,
        message: "Brochure Download Request",
      }),
    })
      .then(function (res) {
        if (res.status !== 200) {
          throw new Error("Failed to submit. Please try again.");
        }
        return res.json();
      })
      .then(function (data) {
        if (brochureSuccessMsg) {
          brochureSuccessMsg.style.display = "block";
          brochureSuccessMsg.style.color = "#388e3c";
          brochureSuccessMsg.textContent =
            "Thank you! Your brochure download will start shortly.";
        }
        brochureForm.reset();

        // Trigger brochure download
        const link = document.createElement("a");
        link.href = "/assets/docs/pdf/brochure.pdf";
        link.download = "KYRA_Group_Brochure.pdf";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .finally(function () {
        if (brochureSubmitBtn) {
          brochureSubmitBtn.disabled = false;
          brochureSubmitBtn.innerHTML = originalText;
        }
      });
  });
});

// --- Right-Side Sticky Social Bar & Scroll-To-Top Button Generator ---
function initStickyWidgets() {
  if (document.getElementById("stickySocialBar")) return;

  // 1. Right Side Sticky Social Bar
  const socialBarHTML = `
    <div class="sticky-social-bar" id="stickySocialBar">
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" class="social-sticky-btn whatsapp" aria-label="Chat on WhatsApp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        <span class="social-tooltip">WhatsApp</span>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-sticky-btn instagram" aria-label="Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        <span class="social-tooltip">Instagram</span>
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-sticky-btn facebook" aria-label="Facebook">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        <span class="social-tooltip">Facebook</span>
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-sticky-btn youtube" aria-label="YouTube">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        <span class="social-tooltip">YouTube</span>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-sticky-btn linkedin" aria-label="LinkedIn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        <span class="social-tooltip">LinkedIn</span>
      </a>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", socialBarHTML);

  // 2. Scroll-To-Top Button
  const scrollToTopHTML = `
    <button class="scroll-to-top-btn" id="scrollToTopBtn" aria-label="Scroll to top">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  `;
  document.body.insertAdjacentHTML("beforeend", scrollToTopHTML);

  const scrollBtn = document.getElementById("scrollToTopBtn");

  // Show/Hide scroll button on window scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  // Smooth scroll to top on click
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Auto-initialize sticky widgets on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStickyWidgets);
} else {
  initStickyWidgets();
}
