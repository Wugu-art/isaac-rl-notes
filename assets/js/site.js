(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-site-header]');
  const progress = document.querySelector('[data-progress]');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  const updateScrollState = () => {
    const top = window.scrollY || root.scrollTop;
    const height = root.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('is-scrolled', top > 18);
    if (progress) progress.style.transform = `scaleX(${height > 0 ? Math.min(top / height, 1) : 0})`;
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  }

  const currentPath = decodeURI(window.location.pathname).replace(/index\.html$/, '');
  document.querySelectorAll('.site-nav a').forEach((link) => {
    const path = decodeURI(new URL(link.href, window.location.href).pathname).replace(/index\.html$/, '');
    if (path === currentPath || (path !== '/' && currentPath.startsWith(path.replace(/\.html$/, '')))) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const article = document.querySelector('.prose');
  const timeTarget = document.querySelector('[data-reading-time]');
  if (article && timeTarget) {
    const text = article.textContent.trim();
    const chinese = (text.match(/[\u3400-\u9fff]/g) || []).length;
    const latin = (text.replace(/[\u3400-\u9fff]/g, ' ').match(/\b\w+\b/g) || []).length;
    const minutes = Math.max(1, Math.ceil(chinese / 400 + latin / 220));
    timeTarget.textContent = `约 ${minutes} 分钟`;
  }

  const toc = document.querySelector('[data-toc]');
  if (article && toc) {
    const headings = [...article.querySelectorAll('h2, h3')];
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `section-${index + 1}`;
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      if (heading.tagName === 'H3') link.className = 'toc-sub';
      toc.appendChild(link);
    });
    if (!headings.length) toc.closest('.page-toc')?.classList.add('is-empty');
  }

  document.querySelectorAll('.prose pre').forEach((pre) => {
    const code = pre.querySelector('code');
    if (!code) return;
    const button = document.createElement('button');
    button.className = 'copy-code';
    button.type = 'button';
    button.textContent = '复制';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = '已复制';
        setTimeout(() => { button.textContent = '复制'; }, 1400);
      } catch (_) {
        button.textContent = '复制失败';
      }
    });
    pre.appendChild(button);
  });

  document.querySelectorAll('.prose img').forEach((image) => {
    image.loading = 'lazy';
    image.decoding = 'async';
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
  }
})();

