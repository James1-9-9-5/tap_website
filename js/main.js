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

// Footage: play each clip once from its start, crossfading into the next
(function () {
  const stage = document.querySelector('.hero-media');
  if (!stage) return;
  const clips = Array.from(stage.querySelectorAll('.clip'));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FADE = 2000;   // crossfade length in ms
  const DRIFT = 7;     // how far each clip slides, in % of the panel width
  const SPEED = 1;     // playback speed: 1 = normal, 0.75 = slower, 0.5 = half speed

  function whenReady(v) {
    return new Promise(function (resolve) {
      if (v.readyState >= 1) return resolve(true);
      const t = setTimeout(function () { resolve(false); }, 8000);
      v.addEventListener('loadedmetadata', function () { clearTimeout(t); resolve(true); }, { once: true });
      const src = v.querySelector('source');
      if (src) src.addEventListener('error', function () { clearTimeout(t); resolve(false); }, { once: true });
    });
  }

  Promise.all(clips.map(function (c) { return whenReady(c.querySelector('video')); })).then(function (ok) {
    const list = clips.filter(function (c, i) { return ok[i]; });
    if (!list.length) return;
    if (reduce) { list[0].classList.add('active'); return; }
    if (list.length === 1) {
      const only = list[0].querySelector('video');
      only.loop = true; only.play().catch(function () {}); list[0].classList.add('active');
      return;
    }
    let i = 0;
    function show() {
      const clip = list[i];
      const v = clip.querySelector('video');
      const dur = v.duration * 1000 / SPEED;   // real time on screen, in ms
      v.currentTime = 0;
      v.playbackRate = SPEED;
      const started = v.play();
      (started && started.catch ? started.catch(function () {}) : Promise.resolve()).then(function () {
        if (clip._drift) clip._drift.cancel();
        clip._drift = clip.animate(
          [{ transform: 'translateX(' + DRIFT + '%)' }, { transform: 'translateX(-' + DRIFT + '%)' }],
          { duration: dur + FADE, easing: 'linear', fill: 'both' }
        );
        clip.classList.add('active');
      });
      let advanced = false;
      function next() {
        if (advanced) return;
        advanced = true;
        v.removeEventListener('timeupdate', check);
        v.removeEventListener('ended', next);
        clip.classList.remove('active');
        setTimeout(function () { v.pause(); }, FADE + 150);
        i = (i + 1) % list.length;
        show();
      }
      function check() { if ((v.duration - v.currentTime) * 1000 / SPEED <= FADE) next(); }
      v.addEventListener('timeupdate', check);
      v.addEventListener('ended', next);
    }
    show();
  });
})();
