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

// --- Parallax Scroll Animation for highlighted letters ---
const heroAnimA = document.querySelector<HTMLElement>('.anim-a');
const heroAnimG = document.querySelector<HTMLElement>('.anim-g');
const heroAnimE = document.querySelector<HTMLElement>('.anim-e');

const footer = document.querySelector<HTMLElement>('footer');
const footerAnimO = document.querySelector<HTMLElement>('.footer-anim-o');
const footerAnimY = document.querySelector<HTMLElement>('.footer-anim-y');
const footerAnimBang = document.querySelector<HTMLElement>('.footer-anim-bang');
const footerPlatter = document.querySelector<SVGGraphicsElement>('.footer-platter');
const footerArm = document.querySelector<SVGGraphicsElement>('.footer-arm');

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

function updateParallax() {
  const scrollY = window.scrollY;

  if (heroAnimA) heroAnimA.style.transform = `translateY(-${scrollY * 0.1}px)`;
  if (heroAnimG) heroAnimG.style.transform = `translateY(-${scrollY * 0.25}px)`;
  if (heroAnimE) heroAnimE.style.transform = `translateY(-${scrollY * 0.45}px)`;

  if (footer) {
    const rect = footer.getBoundingClientRect();
    const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);

    if (footerAnimO) footerAnimO.style.transform = `translateY(-${progress * 48}px)`;
    if (footerAnimY) footerAnimY.style.transform = `translateY(-${progress * 96}px)`;
    if (footerAnimBang) footerAnimBang.style.transform = `translateY(-${progress * 144}px)`;
    if (footerPlatter) footerPlatter.style.transform = `rotate(${12 + progress * 1320}deg)`;
    if (footerArm) footerArm.style.transform = `rotate(${-18 + progress * 48}deg)`;
  }
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();
