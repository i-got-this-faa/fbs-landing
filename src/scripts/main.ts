// --- Blob Cursor Effect ---
const blob = document.getElementById('cursor-blob');
let mouseX = 0;
let mouseY = 0;
let blobX = 0;
let blobY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateBlob() {
  blobX += (mouseX - blobX) * 0.1;
  blobY += (mouseY - blobY) * 0.1;
  
  if (blob) {
    blob.style.transform = `translate(calc(${blobX}px - 50%), calc(${blobY}px - 50%))`;
  }
  requestAnimationFrame(animateBlob);
}
animateBlob();

// --- Dark Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

if (themeToggle) {
  const themeIcon = themeToggle.querySelector('i');

  // Check local storage for theme preference
  if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
    if (themeIcon) themeIcon.classList.replace('ph-moon', 'ph-sun');
  }

  themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');
    
    if (themeIcon) {
      if (isDark) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('ph-moon', 'ph-sun');
      } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('ph-sun', 'ph-moon');
      }
    }
  });
}

// --- Parallax Scroll Animation for "AGE" ---
const animA = document.querySelector('.anim-a') as HTMLElement;
const animG = document.querySelector('.anim-g') as HTMLElement;
const animE = document.querySelector('.anim-e') as HTMLElement;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  if (animA) animA.style.transform = `translateY(-${scrollY * 0.1}px)`;
  if (animG) animG.style.transform = `translateY(-${scrollY * 0.25}px)`;
  if (animE) animE.style.transform = `translateY(-${scrollY * 0.45}px)`;
});
