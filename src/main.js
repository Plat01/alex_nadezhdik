const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('.hero');
const mascot = document.querySelector('.hero-mascot');
const ribbon = document.querySelector('.word-ribbon div');
const about = document.querySelector('.about');
let entered = false;
const stopEntrance = () => { mascot.classList.remove('taking-step'); entered = true; };
const observer = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) { if (entered) stopEntrance(); return; }
  if (!entered && !reduceMotion.matches) {
    entered = true;
    mascot.querySelector('img').decode().then(() => {
      if (!reduceMotion.matches && hero.getBoundingClientRect().bottom > 0 && !document.hidden) mascot.classList.add('taking-step');
    }).catch(() => {});
  }
}, {threshold: 0.15});
observer.observe(hero);
mascot.addEventListener('animationend', stopEntrance);
document.addEventListener('visibilitychange', () => { if(document.hidden) stopEntrance(); });
let ticking = false;
function renderScroll() {
  ticking = false;
  if (reduceMotion.matches || innerWidth < 760) { ribbon.style.transform = ''; return; }
  const rect = about.getBoundingClientRect();
  if (rect.bottom > 0 && rect.top < innerHeight) {
    const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
    ribbon.style.transform = `translateX(${-progress * 180}px)`;
  }
}
function scheduleScroll() { if (!ticking) { ticking = true; requestAnimationFrame(renderScroll); } }
addEventListener('scroll', scheduleScroll, {passive: true});
addEventListener('resize', scheduleScroll, {passive: true});
reduceMotion.addEventListener('change', () => { stopEntrance(); renderScroll(); });
renderScroll();

const preview = document.querySelector('.activity-preview');
document.querySelectorAll('.activity').forEach((activity, index) => {
  activity.addEventListener('toggle', () => {
    if (!activity.open) return;
    preview.dataset.kind = activity.dataset.kind;
    preview.querySelector('.preview-large').textContent = activity.dataset.word;
    document.querySelector('#preview-caption').textContent = activity.dataset.caption;
    preview.querySelector('.preview-count').textContent = `0${index + 1} / 05`;
  });
});

const direction = document.querySelector('#direction');
const message = document.querySelector('#message-preview');
const copyButton = document.querySelector('#copy-message');
const copyStatus = document.querySelector('#copy-status');
function updateMessage() {
  message.textContent = direction.selectedIndex === 0
    ? 'Здравствуйте! Помогите, пожалуйста, подобрать занятия для ребёнка.'
    : `Здравствуйте! Интересует направление «${direction.value}». Подскажите, пожалуйста, возрастные группы, расписание и стоимость занятий.`;
  copyStatus.textContent = '';
}
direction.addEventListener('change', updateMessage);
document.querySelectorAll('[data-direction]').forEach(link => link.addEventListener('click', () => {
  direction.value = link.dataset.direction;
  updateMessage();
}));
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(message.textContent);
    copyStatus.textContent = 'Текст скопирован. Вставьте его в сообщения ВКонтакте и отправьте администратору.';
  } catch {
    copyStatus.textContent = 'Не удалось скопировать автоматически. Выделите текст выше и скопируйте его вручную.';
  }
});
document.querySelectorAll('.mobile-nav nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.mobile-nav').open = false;
}));
