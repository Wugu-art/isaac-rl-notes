---
layout: default
title: Isaac Lab × Go2 学习笔记
description: Isaac Lab、Go2 强化学习与 Sim-to-Real 学习笔记
home: true
---

<section class="hero">
  <div class="hero-copy" data-reveal>
    <p class="eyebrow">Robotics · Reinforcement Learning · Sim-to-Real</p>
    <h1>从仿真开始，<span>让机器学会行动。</span></h1>
    <p class="hero-lede">Isaac Lab、Go2 强化学习与 Sim-to-Real 学习笔记。</p>
    <div class="hero-actions">
      <a class="button button-primary" href="Isaac学习内容/00_阅读索引/">进入学习路线 <span>→</span></a>
      <a class="button" href="笔记库/">浏览笔记</a>
    </div>
  </div>

  <div class="hero-visual" aria-label="Go2 强化学习系统示意" data-reveal>
    <div class="orbit"></div>
    <div class="orbit orbit-two"></div>
    <div class="core-panel">
      <div class="core-label"><strong>GO2</strong><span>POLICY / ACTIVE</span></div>
    </div>
    <div class="signal signal-one"><i></i>SIMULATION 100 HZ</div>
    <div class="signal signal-two"><i></i>REWARD +0.842</div>
  </div>
</section>

<section class="section" id="path">
  <div class="section-heading" data-reveal>
    <h2>学习主线</h2>
    <p>环境 → 仿真 → 训练 → 迁移</p>
  </div>
  <div class="learning-path">
    <div class="path-step" data-reveal>
      <span class="path-number">01</span>
      <h3>环境与资产</h3>
      <p>版本、项目与机器人资产。</p>
      <small>FOUNDATION</small>
    </div>
    <div class="path-step" data-reveal>
      <span class="path-number">02</span>
      <h3>场景与任务</h3>
      <p>场景、传感器与任务定义。</p>
      <small>ENVIRONMENT</small>
    </div>
    <div class="path-step" data-reveal>
      <span class="path-number">03</span>
      <h3>训练与评估</h3>
      <p>策略训练、评估与回放。</p>
      <small>TRAINING</small>
    </div>
    <div class="path-step" data-reveal>
      <span class="path-number">04</span>
      <h3>Sim-to-Real</h3>
      <p>域随机化与真实机器人验证。</p>
      <small>TRANSFER</small>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-heading" data-reveal>
    <h2>笔记目录</h2>
  </div>
  {% include note-browser.html %}
</section>

<section class="section">
  <div class="status-panel" data-reveal>
    <div class="status-intro">
      <p class="eyebrow">Current focus</p>
      <h2>当前进度</h2>
    </div>
    <div class="status-list">
      <div class="status-row"><strong>环境部署</strong><div class="status-track"><span style="--value: 86%"></span></div><small>整理完成</small></div>
      <div class="status-row"><strong>仿真基础</strong><div class="status-track"><span style="--value: 58%"></span></div><small>学习中</small></div>
      <div class="status-row"><strong>强化学习</strong><div class="status-track"><span style="--value: 34%"></span></div><small>学习中</small></div>
      <div class="status-row"><strong>Sim-to-Real</strong><div class="status-track"><span style="--value: 12%"></span></div><small>待深入</small></div>
    </div>
  </div>
</section>

<section class="section closing" data-reveal>
  <h2>记录实验，验证结论，继续<span>前进。</span></h2>
  <div class="hero-actions">
    <a class="button button-primary" href="学习日志/">查看学习日志 →</a>
    <a class="button" href="学习模板/">使用学习模板</a>
  </div>
</section>
