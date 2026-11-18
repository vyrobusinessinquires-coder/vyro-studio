(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('.site-header nav');
  const toggle = document.querySelector('.menu-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Add reveal behavior to meaningful content, not just the project cards.
  const revealTargets = document.querySelectorAll(
    '.hero-meta, .hero-copy, .hero-art, .hero-foot, .section-heading, .project, ' +
    '.work-end, .archive-title, .archive-content, .contact-main, .contact-side, ' +
    '.og-meta, .og-title, .og-bottom, .og-intro, .og-system, .og-products, .og-close'
  );
  revealTargets.forEach((el, index) => {
    el.classList.add('motion-reveal');
    el.style.setProperty('--reveal-order', index);
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('motion-visible'));
  }

  // Scroll progress line.
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);
  let ticking = false;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? window.scrollY / max : 0;
    progress.style.transform = `scaleX(${value})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();

  // Small pointer-responsive depth on the hero composition only.
  const art = document.querySelector('.hero-art');
  if (art && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    art.addEventListener('pointermove', event => {
      const rect = art.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      art.style.setProperty('--pointer-x', `${x * 12}px`);
      art.style.setProperty('--pointer-y', `${y * 12}px`);
    });
    art.addEventListener('pointerleave', () => {
      art.style.setProperty('--pointer-x', '0px');
      art.style.setProperty('--pointer-y', '0px');
    });
  }

  // Project artwork reacts with restrained movement rather than card zoom.
  if (!reduceMotion) {
    document.querySelectorAll('.project-visual').forEach(visual => {
      visual.addEventListener('pointermove', event => {
        if (!window.matchMedia('(pointer:fine)').matches) return;
        const r = visual.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width - 0.5;
        const y = (event.clientY - r.top) / r.height - 0.5;
        visual.style.setProperty('--px', `${x * 9}px`);
        visual.style.setProperty('--py', `${y * 9}px`);
      });
      visual.addEventListener('pointerleave', () => {
        visual.style.setProperty('--px', '0px');
        visual.style.setProperty('--py', '0px');
      });
    });
  }
})();
