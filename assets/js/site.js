(() => {
  const root = document.documentElement;
  root.classList.add('has-js');
  const header = document.querySelector('[data-site-header]');
  const progress = document.querySelector('[data-progress]');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const learningOutline = document.querySelector('[data-learning-outline]');
  if (learningOutline) {
    const shell = learningOutline.closest('.article-shell');
    const outlineButton = learningOutline.querySelector('[data-outline-toggle]');
    const outlineNav = learningOutline.querySelector('#learning-outline-nav');
    const narrowOutline = window.matchMedia('(max-width: 960px)');
    const setOutline = (open, persist = false) => {
      shell.classList.toggle('is-outline-collapsed', !open);
      outlineButton.setAttribute('aria-expanded', String(open));
      outlineButton.setAttribute('aria-label', open ? '收起学习大纲' : '展开学习大纲');
      outlineNav.inert = !open;
      outlineNav.setAttribute('aria-hidden', String(!open));
      if (persist && !narrowOutline.matches) {
        try { localStorage.setItem('isaac-outline-collapsed', String(!open)); } catch (_) { /* Keep the current state. */ }
      }
    };
    const syncOutline = () => {
      let collapsed = narrowOutline.matches;
      if (!collapsed) {
        try { collapsed = localStorage.getItem('isaac-outline-collapsed') === 'true'; } catch (_) { /* Default to open. */ }
      }
      setOutline(!collapsed);
    };
    syncOutline();
    narrowOutline.addEventListener('change', syncOutline);
    outlineButton.addEventListener('click', () => setOutline(shell.classList.contains('is-outline-collapsed'), true));
  }
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const updateThemeToggle = () => {
    if (!themeToggle) return;
    const light = root.dataset.theme === 'light';
    themeToggle.setAttribute('aria-label', `切换到${light ? '黑夜' : '白天'}主题`);
    themeToggle.querySelector('[data-theme-label]').textContent = light ? '黑夜' : '白天';
    themeToggle.querySelector('span[aria-hidden]').textContent = light ? '☾' : '☼';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f5f7f8' : '#080b12');
  };
  updateThemeToggle();
  themeToggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('isaac-theme', root.dataset.theme); } catch (_) { /* Theme still works for this visit. */ }
    updateThemeToggle();
  });

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

  const currentPath = decodeURI(window.location.pathname).replace(/index\.html$/, '').replace(/\/$/, '') + '/';
  document.querySelectorAll('.site-nav a').forEach((link) => {
    const path = decodeURI(new URL(link.href, window.location.href).pathname).replace(/index\.html$/, '').replace(/\/$/, '') + '/';
    const learningSection = currentPath.includes('/Isaac学习内容/') && path.endsWith('/Isaac学习内容/00_阅读索引/');
    const sectionMatch = path !== '/' && path !== decodeURI(new URL(document.querySelector('.brand').href).pathname) && currentPath.startsWith(path);
    if (path === currentPath || learningSection || sectionMatch) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const guestbookForm = document.querySelector('[data-guestbook-form]');
  if (guestbookForm) {
    const input = guestbookForm.querySelector('[data-guestbook-input]');
    const counter = guestbookForm.querySelector('[data-guestbook-count]');
    const status = guestbookForm.querySelector('[data-guestbook-status]');
    const track = document.querySelector('[data-guestbook-track]');
    const storageKey = 'isaac-learning-signals-v1';
    let messages = [];
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (Array.isArray(saved)) messages = saved.filter((entry) => typeof entry === 'string' && entry.length <= 100).slice(0, 30);
    } catch (_) { /* Keep the local board usable when storage is unavailable. */ }
    const renderMessages = () => {
      track.replaceChildren();
      if (!messages.length) return;
      const addCards = (duplicate) => messages.forEach((message, index) => {
        const card = document.createElement('article');
        card.className = 'guestbook-card';
        card.style.setProperty('--tilt', `${[-2, 1.5, -1, 2][index % 4]}deg`);
        if (duplicate) card.setAttribute('aria-hidden', 'true');
        const body = document.createElement('p');
        body.textContent = message;
        const label = document.createElement('small');
        label.textContent = `LEARNING SIGNAL / ${String(index + 1).padStart(2, '0')}`;
        card.append(body, label);
        track.append(card);
      });
      addCards(false);
      addCards(true);
    };
    const updateCount = () => {
      const characters = Array.from(input.value);
      if (characters.length > 50) input.value = characters.slice(0, 50).join('');
      counter.textContent = `${Array.from(input.value).length} / 50`;
    };
    input.addEventListener('input', updateCount);
    guestbookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = input.value.trim();
      if (!message || Array.from(message).length > 50) return;
      messages.unshift(message);
      messages = messages.slice(0, 30);
      try { localStorage.setItem(storageKey, JSON.stringify(messages)); status.textContent = '已保存到此浏览器'; }
      catch (_) { status.textContent = '已显示；当前浏览器无法持久保存'; }
      input.value = '';
      updateCount();
      renderMessages();
    });
    updateCount();
    renderMessages();
  }

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

  const story = document.querySelector('[data-story]');
  if (story) {
    const scene = story.querySelector('[data-story-scene]');
    const steps = [...story.querySelectorAll('[data-story-step]')];
    const counter = story.querySelector('[data-story-counter]');
    let active = 0;
    let frame = 0;
    const setStage = (stage) => {
      if (stage === active) return;
      active = stage;
      scene.dataset.stage = String(stage);
      counter.textContent = `0${stage} / 04`;
      steps.forEach((step) => step.classList.toggle('is-active', Number(step.dataset.storyStep) === stage));
    };
    const updateStage = () => {
      frame = 0;
      const marker = window.innerHeight * 0.51;
      let nearest = steps[0];
      let distance = Infinity;
      steps.forEach((step) => {
        const rect = step.getBoundingClientRect();
        const current = Math.abs((rect.top + rect.bottom) / 2 - marker);
        if (current < distance) { distance = current; nearest = step; }
      });
      setStage(Number(nearest.dataset.storyStep));
    };
    const scheduleStage = () => { if (!frame) frame = requestAnimationFrame(updateStage); };
    window.addEventListener('scroll', scheduleStage, { passive: true });
    window.addEventListener('resize', scheduleStage);
    steps.forEach((step) => step.addEventListener('focusin', () => setStage(Number(step.dataset.storyStep))));
    updateStage();
  }

  document.querySelectorAll('[data-learning-map]').forEach((map) => {
    const buttons = [...map.querySelectorAll('[data-map-category]')];
    const panels = [...map.querySelectorAll('[data-map-panel]')];
    const selectCategory = (category) => {
      buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.mapCategory === category)));
      panels.forEach((panel) => { panel.hidden = panel.dataset.mapPanel !== category; });
    };
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => selectCategory(button.dataset.mapCategory));
      button.addEventListener('keydown', (event) => {
        const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : -1;
        if (next < 0 && event.key !== 'ArrowLeft') return;
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const target = buttons[(next + buttons.length) % buttons.length];
        target.focus();
        selectCategory(target.dataset.mapCategory);
      });
    });
    if (buttons.length) selectCategory(buttons[0].dataset.mapCategory);
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
