// --- Parallax Scroll Animation for highlighted letters ---
const heroAnimA = document.querySelector<HTMLElement>('.anim-a');
const heroAnimG = document.querySelector<HTMLElement>('.anim-g');
const heroAnimE = document.querySelector<HTMLElement>('.anim-e');
const heroMediaPanel = document.querySelector<HTMLElement>('.hero-media-panel');
const heroSection = document.querySelector<HTMLElement>('.hero-section');
const heroVideo = document.querySelector<HTMLVideoElement>('.hero-scroll-video');

const footer = document.querySelector<HTMLElement>('footer');
const footerAnimO = document.querySelector<HTMLElement>('.footer-anim-o');
const footerAnimY = document.querySelector<HTMLElement>('.footer-anim-y');
const footerAnimBang = document.querySelector<HTMLElement>('.footer-anim-bang');
const footerPlatter = document.querySelector<SVGGraphicsElement>('.footer-platter');
const footerArm = document.querySelector<SVGGraphicsElement>('.footer-arm');

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

const heroVideoScrollFactor = 0.75; // Adjust this value to control how fast the video scrubs in relation to scroll
let targetHeroVideoTime = 0;
let currentHeroVideoTime = 0;

const getHeroProgress = () => {
  if (!heroSection) return 0;

  const heroTop = heroSection.offsetTop;
  const heroScrollDistance = Math.max(heroSection.offsetHeight * heroVideoScrollFactor, 1);

  return clamp((window.scrollY - heroTop) / heroScrollDistance, 0, 1);
};

const updateHeroMediaPanel = () => {
  if (!heroMediaPanel || !heroSection) return;

  const rect = heroSection.getBoundingClientRect();
  const topClip = clamp(rect.top, 0, window.innerHeight);
  const bottomClip = clamp(window.innerHeight - rect.bottom, 0, window.innerHeight);
  const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

  heroMediaPanel.style.clipPath = `inset(${topClip}px 0 ${bottomClip}px 0)`;
  heroMediaPanel.style.visibility = isVisible ? 'visible' : 'hidden';
};

const setHeroVideoTarget = (progress: number) => {
  if (!heroVideo || !Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0) return;

  targetHeroVideoTime = heroVideo.duration * progress;
};

const updateHeroVideo = () => {
  if (!heroVideo || !Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0) return;

  currentHeroVideoTime += (targetHeroVideoTime - currentHeroVideoTime) * 0.34;

  if (Math.abs(heroVideo.currentTime - currentHeroVideoTime) > 0.025) {
    heroVideo.currentTime = currentHeroVideoTime;
  }
};

function updateParallax() {
  const scrollY = window.scrollY;
  const heroProgress = getHeroProgress();

  if (heroAnimA) heroAnimA.style.transform = `translateY(-${scrollY * 0.05}px)`;
  if (heroAnimG) heroAnimG.style.transform = `translateY(-${scrollY * 0.125}px)`;
  if (heroAnimE) heroAnimE.style.transform = `translateY(-${scrollY * 0.225}px)`;

  updateHeroMediaPanel();
  setHeroVideoTarget(heroProgress);
  updateHeroVideo();

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

let animationFrame = 0;
let smoothingFrame = 0;

const requestParallaxUpdate = () => {
  if (animationFrame) return;

  animationFrame = window.requestAnimationFrame(() => {
    animationFrame = 0;
    updateParallax();
  });
};

const smoothHeroVideo = () => {
  updateHeroVideo();
  smoothingFrame = window.requestAnimationFrame(smoothHeroVideo);
};

window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
window.addEventListener('resize', requestParallaxUpdate);
heroVideo?.addEventListener('loadedmetadata', () => {
  currentHeroVideoTime = heroVideo.currentTime;
  updateParallax();
  if (!smoothingFrame) smoothHeroVideo();
}, { once: true });
updateParallax();
