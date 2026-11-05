---
name: markdown-publishing
description: 在本项目添加、整理或发布 Isaac Lab Markdown 学习笔记时使用。
---

# Markdown 笔记发布

本地笔记源在网页仓库的 `../../isaac_RL`。新笔记先放到其中的 `笔记/环境与资产/`、`笔记/仿真基础/`、`笔记/强化学习/` 或 `笔记/Sim-to-Real/`。第一行使用 `# 标题`；可选 YAML 页头加入 `description`。在网页仓库运行 `scripts/sync-notes.sh`，检查同步结果后提交推送。GitHub Pages 用可选页头插件渲染普通 `.md`，用目录默认值确定分类，目录和搜索自动收录。

上传前检查版本信息、命令可复现性、内部链接与截图中的个人路径或密钥。不要把原始模型、检查点或大型日志放进网站。发布步骤见项目根目录 `如何添加笔记.md`。
