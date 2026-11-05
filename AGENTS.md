# Isaac Lab × Go2 学习站点

这是 GitHub Pages 上的 Jekyll 学习笔记站点。保持页面内容聚焦 Isaac Lab、Go2 强化学习和 Sim-to-Real，不展示个人信息或建站过程。

本地学习笔记源在 `../../isaac_RL`，网页源码与 GitHub Pages 仓库在当前目录。新增笔记先放进笔记源的 `笔记/` 四个分类目录，首行写 `# 标题`；随后运行 `scripts/sync-notes.sh` 同步到网页仓库，再提交推送。分类由 `_config.yml` 的路径默认值决定；`_includes/note-browser.html` 自动生成目录，搜索由 `_layouts/default.html` 自动索引页面。不要手动维护首页笔记卡片。

网页设计任务可参考 `.agents/skills/docs-site-design/SKILL.md`；发布和新笔记流程参考 `.agents/skills/markdown-publishing/SKILL.md`；用户明确要用 Framer 时参考 `.agents/skills/framer-ai-design/SKILL.md`。Framer 是独立平台，不能把它的托管当成当前 GitHub Pages 的更新。
