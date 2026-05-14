/* DuneTales JS
   - Header scroll effect (landing page only)
   - Mobile nav toggle
*/

'use strict';

/**
 * Header active on scroll (only on landing page)
 */
const header = document.querySelector("[data-header]");
const isLandingPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

const scrollTopBtn = document.querySelector("[data-scroll-top]");

if (isLandingPage && header) {
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 100) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });
}

/**
 * Scroll-to-top button: show after scrolling down 300px
 */
if (scrollTopBtn) {
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Mobile navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

if (navOpenBtn) {
  navOpenBtn.addEventListener("click", function () {
    navbar.classList.add("active");
  });
}

if (navCloseBtn) {
  navCloseBtn.addEventListener("click", function () {
    navbar.classList.remove("active");
  });
}

/**
 * Tab switching for About section
 */
function showTab(index) {
  // Hide all tab contents
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');
  
  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab
  const selectedTab = document.getElementById('tab-' + index);
  if (selectedTab) {
    selectedTab.style.display = 'block';
  }
  
  // Add active class to clicked button
  buttons[index].classList.add('active');
}