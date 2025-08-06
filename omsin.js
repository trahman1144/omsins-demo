// Mobile Overlay Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
const overlayClose = document.getElementById('overlay-close');

mobileMenuBtn.addEventListener('click', () => {
  mobileOverlay.classList.add('open');
});
overlayClose.addEventListener('click', () => {
  mobileOverlay.classList.remove('open');
});
document.querySelectorAll('.overlay-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileOverlay.classList.remove('open');
  });
});

// Smooth Scroll for nav and overlay links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = (i === index) ? '1' : '0';
  });
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
showSlide(currentSlide);
setInterval(nextSlide, 5000);

// Active Menu Highlight on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Scroll-triggered animations
const animatedElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
animatedElements.forEach(el => observer.observe(el));

// Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);
lightbox.style.position = 'fixed';
lightbox.style.top = '0';
lightbox.style.left = '0';
lightbox.style.width = '100%';
lightbox.style.height = '100%';
lightbox.style.background = 'rgba(0,0,0,0.9)';
lightbox.style.display = 'none';
lightbox.style.alignItems = 'center';
lightbox.style.justifyContent = 'center';
lightbox.style.zIndex = '9999';
lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightbox.innerHTML = '';
});
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    const imgClone = document.createElement('img');
    imgClone.src = img.src;
    imgClone.style.maxWidth = '90%';
    imgClone.style.maxHeight = '90%';
    imgClone.style.boxShadow = '0 0 20px rgba(255,255,255,0.8)';
    lightbox.innerHTML = '';
    lightbox.appendChild(imgClone);
    lightbox.style.display = 'flex';
  });
});
