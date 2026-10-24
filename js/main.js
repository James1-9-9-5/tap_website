const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Team photo: show images/team.jpeg when it exists, otherwise keep the placeholder
const teamImg = document.querySelector('.team-photo img');
if (teamImg) {
  const box = teamImg.closest('.team-photo');
  const show = () => box.classList.add('has-photo');
  const hide = () => teamImg.remove();
  if (teamImg.complete) { teamImg.naturalWidth ? show() : hide(); }
  else { teamImg.addEventListener('load', show); teamImg.addEventListener('error', hide); }
}

// Footage: stay still if the visitor prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.hero-media video').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });
}
