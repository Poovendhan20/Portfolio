const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const videos = document.querySelectorAll('video');
videos.forEach(video => {
  const item = video.closest('.motion-item');
  item?.addEventListener('mouseenter', () => video.play().catch(() => {}));
  item?.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
});

const cursor = document.querySelector('.cursor-dot');
if (cursor && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  document.querySelectorAll('a, button, .certificate-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '30px'; cursor.style.height = '30px'; cursor.style.background = 'rgba(231,121,92,.12)'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; cursor.style.background = 'transparent'; });
  });
}

document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.12;
    const y = (e.clientY - r.top - r.height / 2) * 0.12;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (header) header.style.borderBottomColor = window.scrollY > 10 ? 'rgba(18,60,58,.10)' : 'transparent';
}, { passive: true });
