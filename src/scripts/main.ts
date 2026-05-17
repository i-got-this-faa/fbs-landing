// --- Parallax Scroll Animation for highlighted letters ---
const heroAnimA = document.querySelector<HTMLElement>('.anim-a');
const heroAnimG = document.querySelector<HTMLElement>('.anim-g');
const heroAnimE = document.querySelector<HTMLElement>('.anim-e');
const heroImage = document.querySelector<HTMLElement>('.hero-image');
const heroSection = document.querySelector<HTMLElement>('.hero-section');

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

  if (heroAnimA) heroAnimA.style.transform = `translateY(-${scrollY * 0.05}px)`;
  if (heroAnimG) heroAnimG.style.transform = `translateY(-${scrollY * 0.125}px)`;
  if (heroAnimE) heroAnimE.style.transform = `translateY(-${scrollY * 0.225}px)`;

  if (heroImage && heroSection) {
  const heroHeight = heroSection.offsetHeight;
  const progress = clamp(scrollY / heroHeight, 0, 1);
  const scale = 1 + progress * 0.5; // subtle zoom from 1x to 1.06x
  heroImage.style.transform = `scale(${scale})`;
}

  if (footer) {
    const rect = footer.getBoundingClientRect();
    const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);

    if (footerAnimO) footerAnimO.style.transform = `translateY(-${progress * 48}px)`;
    if (footerAnimY) footerAnimY.style.transform = `translateY(-${progress * 96}px)`;
    if (footerAnimBang) footerAnimBang.style.transform = `translateY(-${progress * 144}px)`;
    if (footerPlatter) footerPlatter.setAttribute('transform', `rotate(${12 + progress * 1320} 500 500)`);
    if (footerArm) footerArm.setAttribute('transform', `rotate(${-18 + progress * 48} 1020 500)`);
  }
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();
