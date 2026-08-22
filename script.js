const preloader = document.getElementById('preloader');
window.addEventListener('load', () => setTimeout(() => preloader.classList.add('hide'), 500));

document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-pill');
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav-pill a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  cards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.style.display = show ? '' : 'none';
  });
}));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-pill a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, {rootMargin:'-45% 0px -45% 0px', threshold:0});
sections.forEach(s => sectionObserver.observe(s));

const modal = document.getElementById('certModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
function openModal(card){
  modalImg.src = card.dataset.image;
  modalTitle.textContent = card.dataset.title;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
document.querySelectorAll('.certificate-card').forEach(card => card.addEventListener('click', () => openModal(card)));
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
window.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
  ring.animate({left:e.clientX+'px', top:e.clientY+'px'}, {duration:180,fill:'forwards'});
});
document.querySelectorAll('a,button,.project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width='42px'; ring.style.height='42px'; ring.style.borderColor='rgba(255,255,255,.5)'; });
  el.addEventListener('mouseleave', () => { ring.style.width='28px'; ring.style.height='28px'; ring.style.borderColor='rgba(255,255,255,.25)'; });
});
