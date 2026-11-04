(() => {
  const root = document.documentElement;
  root.classList.add('has-js');
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

  const searchDialog = document.querySelector('[data-search-dialog]');
  const searchInput = document.querySelector('[data-search-input]');
  const searchItems = [...document.querySelectorAll('[data-search-item]')];
  const searchEmpty = document.querySelector('[data-search-empty]');
  let searchReturnFocus = null;

  const filterSearch = () => {
    const query = (searchInput?.value || '').trim().toLocaleLowerCase('zh-CN');
    let visible = 0;
    searchItems.forEach((item) => {
      const match = !query || (item.dataset.searchText || '').includes(query);
      item.hidden = !match;
      if (match) visible += 1;
    });
    if (searchEmpty) searchEmpty.hidden = visible > 0;
  };

  const openSearch = (trigger) => {
    if (!searchDialog) return;
    searchReturnFocus = trigger || document.activeElement;
    searchDialog.hidden = false;
    document.body.classList.add('search-open');
    filterSearch();
    requestAnimationFrame(() => searchInput?.focus());
  };

  const closeSearch = () => {
    if (!searchDialog || searchDialog.hidden) return;
    searchDialog.hidden = true;
    document.body.classList.remove('search-open');
    if (searchInput) searchInput.value = '';
    filterSearch();
    searchReturnFocus?.focus?.();
  };

  document.querySelectorAll('[data-search-open]').forEach((button) => {
    button.addEventListener('click', () => openSearch(button));
  });
  document.querySelectorAll('[data-search-close]').forEach((button) => {
    button.addEventListener('click', closeSearch);
  });
  searchInput?.addEventListener('input', filterSearch);
  document.addEventListener('keydown', (event) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch(document.activeElement);
    } else if (event.key === '/' && !typing && searchDialog?.hidden) {
      event.preventDefault();
      openSearch(document.activeElement);
    } else if (event.key === 'Escape') {
      closeSearch();
    }
  });

  const currentPath = decodeURI(window.location.pathname).replace(/index\.html$/, '');
  document.querySelectorAll('.site-nav a').forEach((link) => {
    const path = decodeURI(new URL(link.href, window.location.href).pathname).replace(/index\.html$/, '');
    const learningSection = currentPath.includes('/Isaac学习内容/') && path.endsWith('/Isaac学习内容/00_阅读索引/');
    if (path === currentPath || learningSection || (path !== '/' && currentPath.startsWith(path.replace(/\.html$/, '')))) {
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('[data-note-browser]').forEach((browser) => {
    const buttons = [...browser.querySelectorAll('[data-note-category]')];
    const panels = [...browser.querySelectorAll('[data-note-panel]')];
    const selectCategory = (category) => {
      buttons.forEach((button) => button.setAttribute('aria-current', String(button.dataset.noteCategory === category)));
      panels.forEach((panel) => { panel.hidden = panel.dataset.notePanel !== category; });
    };
    buttons.forEach((button) => button.addEventListener('click', () => selectCategory(button.dataset.noteCategory)));
    if (buttons.length) selectCategory(buttons[0].dataset.noteCategory);
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ambientVideos = [...document.querySelectorAll('[data-ambient-video]')];
  const videoObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach(({ target: video, isIntersecting }) => {
      video.dataset.inView = String(isIntersecting);
      if (!isIntersecting || document.hidden) video.pause();
      else if (!reducedMotion && video.dataset.userPaused !== 'true') video.play().catch(() => {});
    });
  }, { threshold: 0.2 }) : null;

  ambientVideos.forEach((video) => {
    const button = video.closest('.film-frame')?.querySelector('[data-video-toggle]');
    const updateButton = () => {
      if (!button) return;
      const playing = !video.paused;
      button.setAttribute('aria-label', `${playing ? '暂停' : '播放'}${video.closest('.hero-film') ? ' Go2' : '仿真'}视频`);
      button.setAttribute('aria-pressed', String(playing));
      button.querySelector('span').textContent = playing ? 'Ⅱ' : '▶';
    };
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('error', () => { if (button) button.hidden = true; });
    button?.addEventListener('click', () => {
      if (video.paused) {
        video.dataset.userPaused = 'false';
        video.play().catch(() => {});
      } else {
        video.dataset.userPaused = 'true';
        video.pause();
      }
    });
    if (reducedMotion) { video.autoplay = false; video.pause(); }
    videoObserver?.observe(video);
    updateButton();
  });
  document.addEventListener('visibilitychange', () => {
    ambientVideos.forEach((video) => {
      if (document.hidden) video.pause();
      else if (!reducedMotion && video.dataset.inView === 'true' && video.dataset.userPaused !== 'true') video.play().catch(() => {});
    });
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

  const calloutNames = {
    note: '说明',
    info: '信息',
    summary: '本页目标',
    abstract: '摘要',
    tip: '提示',
    warning: '注意',
    important: '重点'
  };
  document.querySelectorAll('.prose blockquote').forEach((quote) => {
    const first = quote.querySelector('p:first-child');
    if (!first) return;
    const marker = first.textContent.match(/^\[!(note|info|summary|abstract|tip|warning|important)\]\s*/i);
    if (!marker) return;
    quote.classList.add('callout');
    quote.dataset.callout = calloutNames[marker[1].toLowerCase()] || marker[1];
    first.innerHTML = first.innerHTML.replace(/^\[!(note|info|summary|abstract|tip|warning|important)\]\s*/i, '');
    if (!first.textContent.trim()) first.remove();
  });

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
