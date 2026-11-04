---
layout: default
title: Isaac Lab × Go2 学习笔记
description: Isaac Lab、Go2 强化学习与 Sim-to-Real 学习笔记
home: true
---

<section class="hero" id="top">
  <div class="hero-copy" data-reveal>
    <p class="eyebrow">Robotics · Reinforcement Learning · Sim-to-Real</p>
    <h1>从仿真开始，<span>让机器学会行动。</span></h1>
    <p class="hero-lede">Isaac Lab × Go2 · 仿真与强化学习记录</p>
    <div class="hero-actions">
      <a class="button button-primary" href="#films">观看实验 <span>↘</span></a>
      <a class="button" href="笔记库/">浏览笔记</a>
    </div>
    <span class="hero-scroll" aria-hidden="true"><i></i>SCROLL TO EXPLORE</span>
  </div>

  <div class="hero-media-wrap" data-reveal>
    <span class="hero-float-card hero-float-card-one" aria-hidden="true">SIM / 01 <b>构建世界</b></span>
    <span class="hero-float-card hero-float-card-two" aria-hidden="true">RL / 02 <b>训练策略</b></span>
    <div class="hero-orbit hero-orbit-one" aria-hidden="true"></div>
    <div class="hero-orbit hero-orbit-two" aria-hidden="true"></div>
    <div class="film-frame hero-film">
      <video data-ambient-video muted autoplay loop playsinline preload="metadata" poster="{{ '/assets/images/go2-motion.webp' | relative_url }}" aria-label="Go2 在仿真场景中行走的六秒录屏">
        <source src="{{ '/assets/media/go2-motion.webm' | relative_url }}" type="video/webm">
      </video>
      <div class="film-shade" aria-hidden="true"></div>
      <span class="film-index">01 / GO2 IN MOTION</span>
      <span class="film-corner film-corner-tl" aria-hidden="true"></span>
      <span class="film-corner film-corner-br" aria-hidden="true"></span>
      <button class="film-toggle" type="button" data-video-toggle aria-label="暂停 Go2 视频" aria-pressed="false"><span aria-hidden="true">Ⅱ</span></button>
    </div>
    <span class="hero-media-caption">SIMULATION / FIELD CAPTURE</span>
  </div>
</section>

<section class="film-section" id="films" aria-labelledby="films-title">
  <div class="film-section-heading" data-reveal>
    <p class="eyebrow">Field notes / 001</p>
    <h2 id="films-title">看见仿真<span>发生。</span></h2>
    <span>06 SEC · LOOP</span>
  </div>
  <div class="film-frame scene-film" data-reveal>
    <video data-ambient-video muted autoplay loop playsinline preload="metadata" poster="{{ '/assets/images/simulation-field-20-26.jpg' | relative_url }}" aria-label="Isaac 仿真录屏中第 20 至 26 秒的机器人运动片段">
      <source src="{{ '/assets/media/simulation-field.webm' | relative_url }}" type="video/webm">
    </video>
    <div class="film-shade" aria-hidden="true"></div>
    <span class="film-index">02 / SIMULATION FIELD</span>
    <span class="scene-film-title">让场景<br>动起来<span>↗</span></span>
    <button class="film-toggle" type="button" data-video-toggle aria-label="暂停仿真视频" aria-pressed="false"><span aria-hidden="true">Ⅱ</span></button>
  </div>
</section>

<section class="chapter-section" id="path" aria-labelledby="path-title">
  <div class="chapter-head" data-reveal>
    <p class="eyebrow">The learning path</p>
    <h2 id="path-title"><a href="{{ '/Isaac学习内容/00_阅读索引/' | relative_url }}">四个阶段，<br><span>持续向前。</span></a></h2>
    <a class="text-link" href="Isaac学习内容/00_阅读索引/">进入学习路线 <span aria-hidden="true">↗</span></a>
  </div>
  <div class="chapter-list" data-reveal>
    <div class="chapter-item"><span>01</span><strong>环境与资产</strong><i aria-hidden="true"></i></div>
    <div class="chapter-item"><span>02</span><strong>仿真基础</strong><i aria-hidden="true"></i></div>
    <div class="chapter-item"><span>03</span><strong>强化学习</strong><i aria-hidden="true"></i></div>
    <div class="chapter-item"><span>04</span><strong>Sim-to-Real</strong><i aria-hidden="true"></i></div>
  </div>
</section>

<section class="section directory-section" id="notes">
  <div class="section-heading" data-reveal>
    <h2>继续探索。</h2>
    <p>按主题阅读学习笔记。</p>
  </div>
  {% include note-browser.html %}
</section>

<section class="guestbook-section" id="guestbook" aria-labelledby="guestbook-title">
  <div class="guestbook-intro" data-reveal>
    <p class="eyebrow">Learning signals</p>
    <h2 id="guestbook-title">留下一个<span>想法。</span></h2>
    <p>50 字以内 · 留言仅保存在当前浏览器</p>
  </div>
  <form class="guestbook-form" data-guestbook-form>
    <label for="guestbook-message">学习片段或想法</label>
    <div class="guestbook-input-row">
      <textarea id="guestbook-message" data-guestbook-input rows="2" maxlength="50" placeholder="记录一个关于仿真或训练的想法…" required></textarea>
      <button class="button button-primary" type="submit">留下想法 ↗</button>
    </div>
    <div class="guestbook-meta"><span data-guestbook-count>0 / 50</span><span data-guestbook-status role="status" aria-live="polite"></span></div>
  </form>
  <div class="guestbook-window" data-guestbook-window aria-label="本机留言轮播">
    <div class="guestbook-track" data-guestbook-track></div>
    <p class="guestbook-empty" data-guestbook-empty>还没有留言，第一条从这里开始。</p>
  </div>
</section>

<section class="section closing" data-reveal>
  <h2>下一次实验，<span>从这里开始。</span></h2>
  <div class="hero-actions">
    <a class="button button-primary" href="学习日志/">学习日志 →</a>
  </div>
</section>
