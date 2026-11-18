(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('#primary-nav');
  const toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const reveal = [...document.querySelectorAll('[data-reveal]')];
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    }), { threshold: .16, rootMargin: '0px 0px -35px 0px' });
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('visible'));

  const bar = document.querySelector('.top-progress');
  let busy = false;
  const progress = () => {
    if (!bar) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    busy = false;
  };
  addEventListener('scroll', () => {
    if (!busy) { requestAnimationFrame(progress); busy = true; }
  }, { passive: true });
  progress();

  // This site does not load analytics or advertising scripts. Storage only
  // remembers whether the visitor dismissed this notice.
  const notice = document.querySelector('#cookie-notice');
  const accept = document.querySelector('#cookie-accept');
  const dismiss = document.querySelector('#cookie-dismiss');
  const KEY = 'vyro-privacy-notice-dismissed';
  const closeNotice = () => {
    try { localStorage.setItem(KEY, 'yes'); notice.hidden = true; }
    catch (_) { notice.hidden = true; }
  };
  if (notice) {
    try { notice.hidden = localStorage.getItem(KEY) === 'yes'; }
    catch (_) { notice.hidden = false; }
    accept?.addEventListener('click', closeNotice);
    dismiss?.addEventListener('click', closeNotice);
  }
})();