(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      const label = toggle.querySelector('span');
      if (label) label.textContent = open ? '−' : '＋';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      const label = toggle.querySelector('span');
      if (label) label.textContent = '＋';
    }));
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
