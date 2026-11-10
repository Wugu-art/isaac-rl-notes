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
    <p class="eyebrow">Simulation / Go2</p>
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

<section class="story-section" id="experiment" aria-labelledby="story-title" data-story>
  <div class="story-heading" data-reveal>
    <p class="eyebrow">From scene to policy</p>
    <h2 id="story-title">一次实验，<span>四次推进。</span></h2>
  </div>
  <div class="story-layout">
    <div class="story-scene" data-story-scene data-stage="1" aria-hidden="true">
      <div class="story-scene-top"><span>ISAAC / EXPERIMENT 01</span><span>SCHEMATIC MOTION</span></div>
      <div class="story-viewport">
        <div class="story-grid"></div>
        <div class="story-horizon"></div>
        <div class="story-obstacle story-obstacle-one"></div>
        <div class="story-obstacle story-obstacle-two"></div>
        <div class="story-robot"><i></i><i></i><i></i><i></i><span>GO2</span></div>
        <svg class="story-route" viewBox="0 0 600 390" preserveAspectRatio="none"><path d="M48 282 C130 315 190 225 278 256 S418 190 552 142"></path></svg>
        <div class="story-target"></div>
        <div class="story-signal story-signal-a"></div>
        <div class="story-signal story-signal-b"></div>
      </div>
      <div class="story-scene-bottom"><span data-story-counter>01 / 04</span><span>流程示意 · 非训练数据</span></div>
    </div>
    <div class="story-steps">
      <article class="story-step" data-story-step="1">
        <span class="story-step-index">01 / WORLD</span>
        <h3>搭建世界。</h3>
        <p>环境、资产与地形。</p>
        <a href="{{ '/Isaac学习内容/00_部署与Go2项目流程/' | relative_url }}">从部署开始 ↗</a>
      </article>
      <article class="story-step" data-story-step="2">
        <span class="story-step-index">02 / SIMULATION</span>
        <h3>启动仿真。</h3>
        <p>让机器人与场景开始交互。</p>
        <a href="{{ '/Isaac学习内容/01_创建空场景/' | relative_url }}">查看仿真基础 ↗</a>
      </article>
      <article class="story-step" data-story-step="3">
        <span class="story-step-index">03 / LEARNING</span>
        <h3>训练策略。</h3>
        <p>从观测、动作到奖励。</p>
        <a href="{{ '/笔记/强化学习/Go2训练实验记录清单/' | relative_url }}">查看训练记录 ↗</a>
      </article>
      <article class="story-step" data-story-step="4">
        <span class="story-step-index">04 / TRANSFER</span>
        <h3>走向现实。</h3>
        <p>验证泛化与 Sim-to-Real。</p>
        <a href="#path">探索学习地图 ↗</a>
      </article>
    </div>
  </div>
</section>

<section class="learning-map-section" id="path" aria-labelledby="path-title">
  <div class="learning-map-heading" data-reveal>
    <p class="eyebrow">The learning map</p>
    <h2 id="path-title">沿着轨迹，<span>继续深入。</span></h2>
    <a class="text-link" href="{{ '/Isaac学习内容/00_阅读索引/' | relative_url }}">完整学习路线 <span aria-hidden="true">↗</span></a>
  </div>
  {% include learning-map.html %}
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
