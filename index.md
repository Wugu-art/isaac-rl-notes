---
layout: default
title: Isaac Lab × Go2 学习笔记
description: Isaac Lab、Go2 强化学习与 Sim-to-Real 的长期公开学习档案
home: true
---

<section class="hero">
  <div class="hero-copy" data-reveal>
    <p class="eyebrow">Robotics · Reinforcement Learning · Sim-to-Real</p>
    <h1>从仿真开始，<span>让机器学会行动。</span></h1>
    <p class="hero-lede">一份持续生长的 Isaac Lab × Go2 学习档案。这里不只收集命令，更记录版本、实验、失败和真正可复现的结论。</p>
    <div class="hero-actions">
      <a class="button button-primary" href="Isaac学习内容/00_阅读索引.html">进入学习路线 <span>→</span></a>
      <a class="button" href="Isaac学习内容/00_部署与Go2项目流程.html">查看部署记录</a>
    </div>
    <div class="hero-stats" aria-label="学习库统计">
      <div class="hero-stat"><strong>07</strong><span>核心笔记</span></div>
      <div class="hero-stat"><strong>31</strong><span>实践截图</span></div>
      <div class="hero-stat"><strong>∞</strong><span>持续迭代</span></div>
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
    <h2>一条从零到策略部署的路线</h2>
    <p>按依赖关系学习：先稳定环境和仿真，再定义任务、训练策略，最后进入 Sim-to-Real。每一步都留下能复现的证据。</p>
  </div>
  <div class="learning-path">
    <div class="path-step" data-reveal>
      <span class="path-number">01</span>
      <h3>环境与资产</h3>
      <p>安装版本、项目骨架、USD 资产与执行器配置。</p>
      <small>FOUNDATION</small>
    </div>
    <div class="path-step" data-reveal>
      <span class="path-number">02</span>
      <h3>场景与任务</h3>
      <p>Prim、传感器、观测、动作、奖励与终止条件。</p>
      <small>ENVIRONMENT</small>
    </div>
    <div class="path-step" data-reveal>
      <span class="path-number">03</span>
      <h3>训练与评估</h3>
      <p>RSL-RL、并行采样、日志、检查点和策略回放。</p>
      <small>TRAINING</small>
    </div>
    <div class="path-step" data-reveal>
      <span class="path-number">04</span>
      <h3>Sim-to-Real</h3>
      <p>域随机化、模型导出、硬件约束与真实机器人验证。</p>
      <small>TRANSFER</small>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-heading" data-reveal>
    <h2>知识库入口</h2>
    <p>从主线开始，也可以直接进入当前最需要的专题。每篇笔记都保留版本提醒、最小示例和与 Go2 的联系。</p>
  </div>
  <div class="knowledge-grid">
    <a class="knowledge-card" href="Isaac学习内容/00_部署与Go2项目流程.html" data-reveal>
      <span class="knowledge-index">01 / DEPLOYMENT</span>
      <h3>部署与 Go2 项目流程</h3>
      <p>从 Isaac Lab 安装到 Gym 注册、训练、回放与策略导出。</p>
    </a>
    <a class="knowledge-card" href="Isaac学习内容/01_创建空场景.html" data-reveal>
      <span class="knowledge-index">02 / SIMULATION</span>
      <h3>创建空场景</h3>
      <p>理解启动、初始化和物理步进的最小闭环。</p>
    </a>
    <a class="knowledge-card" href="Isaac学习内容/02_生成基本物体到场景.html" data-reveal>
      <span class="knowledge-index">03 / USD &amp; PRIMS</span>
      <h3>生成 Prim</h3>
      <p>掌握 Spawner、刚体、碰撞与外部 USD 资产。</p>
    </a>
    <a class="knowledge-card" href="Isaac学习内容/IsaacLab_uv_常用命令笔记.html" data-reveal>
      <span class="knowledge-index">04 / TOOLCHAIN</span>
      <h3>uv 与常用命令</h3>
      <p>训练、回放、日志、检查点和新旧版本 CLI 的边界。</p>
    </a>
    <a class="knowledge-card" href="Isaac学习内容/03_深入了解仿真启动器_Launch_App.html" data-reveal>
      <span class="knowledge-index">05 / RUNTIME</span>
      <h3>仿真启动器</h3>
      <p>启动参数、运行时、物理后端与版本兼容性。</p>
    </a>
    <a class="knowledge-card" href="笔记库.html" data-reveal>
      <span class="knowledge-index">ALL / LIBRARY</span>
      <h3>浏览完整笔记库</h3>
      <p>按环境、工具链与仿真主题浏览全部已整理内容。</p>
    </a>
  </div>
</section>

<section class="section">
  <div class="section-heading" data-reveal>
    <h2>最近更新</h2>
    <p>学习档案不仅展示“已经会了什么”，也保留每次整理、修复和下一步。所有变化都能从日志与 Git 历史追溯。</p>
  </div>
  <div class="note-grid">
    <a class="note-tile" href="学习日志/2026-11-04_站点上线与资料整理.html" data-reveal>
      <small>2026-11-04 · LEARNING LOG</small>
      <strong>站点上线与资料整理</strong>
      <span>完成知识库结构、暗色主题、GitHub Pages 发布和首轮链接修复。</span>
    </a>
    <a class="note-tile" href="关于.html" data-reveal>
      <small>METHOD · VERSION POLICY</small>
      <strong>这个学习库如何维护</strong>
      <span>了解记录原则、版本边界、内容结构和持续更新方式。</span>
    </a>
  </div>
</section>

<section class="section">
  <div class="status-panel" data-reveal>
    <div class="status-intro">
      <p class="eyebrow">Current signal</p>
      <h2>现在学到哪里？</h2>
      <p>进度不是“看过多少”，而是“能否解释、运行并验证”。百分比用于标记当前学习重心，不代表课程完成度。</p>
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
  <h2>把每一次实验，变成下一次前进的<span>坐标。</span></h2>
  <div class="hero-actions">
    <a class="button button-primary" href="学习日志/">查看学习日志 →</a>
    <a class="button" href="学习模板/">使用学习模板</a>
  </div>
</section>
