---
title: Isaac Lab 中的 uv 用法与常用命令
tags:
  - IsaacLab
  - uv
  - 强化学习
  - Newton
  - MJWarp
source: https://docs.robotsfan.com/isaaclab/source/isaaclab/quickstart.html
source_updated: 2026-10-20
description: Isaac Lab 新版 uv 工作流、训练回放、物理后端、日志与检查点命令速查
section: 学习路线
category: 环境与资产
updated: 2026-11-04
prev_url: /Isaac学习内容/00_部署与Go2项目流程/
prev_label: 部署与 Go2 项目流程
next_url: /Isaac学习内容/IsaacLab_HowTo_操作指南学习笔记/
next_label: How-to 操作指南总览
---

# Isaac Lab 中的 uv 用法与常用命令

> [!important] 版本提醒
> 本笔记基于所给**新版 Isaac Lab 快速入门**页面。其 `uv run isaaclab ...` CLI 与旧版 **Isaac Sim 5.1 + Isaac Lab 2.3.2** 中常见的 `./isaaclab.sh -p scripts/...` 工作流不同。**不要在已有 Go2 项目中直接替换命令或执行依赖同步**；先核对当前仓库版本及 CLI 是否存在。

## 1. uv 是什么？

- **uv**：Python 环境与依赖管理工具，负责创建/同步项目环境并运行命令。
- **`uv run`**：在项目管理的环境中运行命令；必要时按项目配置同步依赖。
- **`isaaclab`**：新版 Isaac Lab 提供的命令行入口，**不是 uv 自带的命令**。
- **`--extra`**：安装/启用项目定义的可选依赖组。

基本结构：

```bash
uv run [--extra 依赖组] isaaclab <子命令> [选项] [配置覆盖]
```

> [!tip] 核心区别
> `uv run` 管运行环境；`isaaclab train/play/...` 管训练任务；`physics=...` 管物理后端。

## 2. 首次安装与启动（新仓库）

```bash
# 安装 uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# 克隆新版 Isaac Lab
git clone https://github.com/isaac-sim/IsaacLab.git
cd IsaacLab

# 查看训练帮助
uv run isaaclab train --help

# 查看已注册任务及预设
uv run isaaclab list_envs --show_presets
```

首次 `uv run` 可能安装核心依赖。**以下所有新版命令均在对应 Isaac Lab 仓库根目录运行。**

## 3. 五个最常用任务命令

| 命令 | 用途 |
| --- | --- |
| `train` | 训练策略 |
| `play` | 加载检查点，运行策略 |
| `zero_agent` | 用全零动作测试环境能否启动 |
| `random_agent` | 用随机动作检查交互 |
| `benchmark` | 测试仿真、训练或启动性能 |

```bash
# 训练 Cartpole
uv run isaaclab train --task Isaac-Cartpole

# 播放训练结果
uv run isaaclab play --task Isaac-Cartpole --checkpoint latest

# 零动作测试
uv run isaaclab zero_agent --task Isaac-Cartpole --viz newton_gl

# 随机动作测试
uv run isaaclab random_agent --task Isaac-Cartpole --viz newton_gl

# 测试环境步进吞吐量
uv run isaaclab benchmark runtime --task Isaac-Cartpole
```

## 4. Newton MJWarp 物理后端

```bash
# 指定 Newton MJWarp，并显示 Newton 可视化窗口
uv run isaaclab train \
  --task Isaac-Cartpole \
  --num_envs 16 \
  --viz newton_gl \
  physics=newton_mjwarp
```

参数含义：

| 参数 | 含义 |
| --- | --- |
| `--task Isaac-Cartpole` | 选择任务 |
| `--num_envs 16` | 并行 16 个环境 |
| `--viz newton_gl` | 打开 Newton 可视化器 |
| `physics=newton_mjwarp` | 选择 Newton 的 MJWarp 物理后端 |
| `renderer=newton_renderer` | 指定渲染后端（适用任务） |
| `presets=rgb` | 使用任务的 RGB 配置预设 |

**注意**：可选物理后端、渲染器和预设取决于具体任务；不能保证所有任务均支持。

```bash
# 查看某个任务可用的配置
uv run isaaclab train --task Isaac-Cartpole --help

# 摄像头任务示例
uv run isaaclab train --task Isaac-Cartpole-Camera \
  physics=newton_mjwarp renderer=newton_renderer presets=rgb
```

## 5. 选择强化学习库

默认库取决于任务注册配置；多数核心任务默认使用 RSL-RL。

```bash
# RSL-RL
uv run isaaclab train --rl_library rsl_rl --task Isaac-Cartpole

# RL-Games：需额外依赖
uv run --extra rl-games isaaclab train \
  --rl_library rl_games --task Isaac-Cartpole

# Stable-Baselines3：需额外依赖
uv run --extra sb3 isaaclab train \
  --rl_library sb3 --task Isaac-Cartpole
```

常见可选依赖组：`rl-games`、`skrl`、`skrl-jax`、`sb3`、`rlinf`、`torchrl`、`rerun`、`viser`、`ovphysx`。`--extra all` **并非**安装所有可能依赖，也**不包含 Isaac Sim**。

## 6. 物理后端与可视化器

```bash
# 安装 OV PhysX 集成，并选择该物理后端
uv run --extra ovphysx isaaclab train \
  --task Isaac-Cartpole physics=ovphysx

# Newton + Rerun 双可视化
uv run --extra rerun isaaclab random_agent \
  --task Isaac-Cartpole \
  physics=newton_mjwarp --viz newton_gl,rerun
```

| 可视化参数 | 作用 | 依赖 |
| --- | --- | --- |
| `--viz newton_gl` | Newton 窗口 | 无额外依赖组 |
| `--viz rerun` | Rerun 可视化 | `--extra rerun` |
| `--viz viser` | 网页可视化 | `--extra viser` |
| `--viz kit` | Kit 可视化 | `isaacsim` 集成 |
| 不指定 `--viz` | 不启用可视化器 | 无 |

`--extra` **负责依赖**；`physics=...` **选择求解后端**；`--viz ...` **选择可视化器**，三者不能混为一谈。

## 7. 训练日志与 TensorBoard

训练产物存于 `logs/`；RSL-RL 的 TensorBoard 日志通常在 `logs/rsl_rl/`。

```bash
# 在另一个终端运行
uv run python -m tensorboard.main --logdir logs/rsl_rl
```

浏览器打开：<http://localhost:6006>，观察奖励、回合长度、损失等曲线。

可选 W&B：

```bash
uv run --extra wandb wandb login
uv run --extra wandb isaaclab train \
  --rl_library rsl_rl --task Isaac-Cartpole \
  --logger wandb --log_project_name isaaclab
```

## 8. 加载检查点

```bash
# 训练
uv run isaaclab train --task Isaac-Cartpole

# 播放最新检查点
uv run isaaclab play --task Isaac-Cartpole \
  --checkpoint latest --viz newton_gl
```

| 选项 | 作用 |
| --- | --- |
| `--checkpoint latest` | 最近兼容运行中训练步数最多的检查点 |
| `--checkpoint best` | 最佳/最终检查点；必要时回退到 latest |
| `--checkpoint pretrained` | 官方托管预训练策略，仅部分任务可用 |
| `--checkpoint 路径` | 指定本地检查点 |

## 9. 性能测试

```bash
# 仿真环境步进吞吐量，不包含策略推理
uv run isaaclab benchmark runtime --task Isaac-Cartpole
```

常见测试工作流：`runtime`（环境步进）、`startup`（启动耗时）、`training`（训练吞吐量）、`play`（策略运行吞吐量）。多 GPU 版本可带 `_multigpu` 后缀。**训练吞吐量与纯仿真吞吐量不是同一个指标。**

## 10. 编辑器配置

```bash
# 生成 VS Code / Cursor 编辑器配置
uv run isaaclab --editor

# 需要 Isaac Sim 集成时
uv run --extra isaacsim isaaclab --editor
```

## 11. 你的 Isaac Lab 2.3.2：不要直接照搬新版 CLI

当前旧版项目常见命令（示意，需在你的具体仓库核对脚本与任务名）：

```bash
# 旧版 Isaac Lab 常见入口
./isaaclab.sh -p scripts/reinforcement_learning/rsl_rl/train.py \
  --task <已注册任务名> --num_envs 256 --headless

# 你的 Go2 定制仓库此前使用的训练入口
python scripts/rsl_rl/train_sim51.py \
  --task go2-mixed-moe-cts \
  --headless --num_envs 256 --max_iterations 100
```

> [!warning] 重要
> 这些旧版脚本入口、参数和任务名依赖仓库实现。**不能简单把 `./isaaclab.sh -p ...` 换成 `uv run isaaclab train ...`**。同样，新版文档的 `physics=newton_mjwarp` 不代表旧版 2.3.2 已经具备此后端。

## 12. 一页速查

```bash
uv run isaaclab list_envs --show_presets       # 列出任务
uv run isaaclab train --help                 # 训练帮助
uv run isaaclab train --task Isaac-Cartpole  # 开始训练
uv run isaaclab play --task Isaac-Cartpole --checkpoint latest  # 回放
uv run isaaclab zero_agent --task Isaac-Cartpole               # 零动作测试
uv run isaaclab random_agent --task Isaac-Cartpole             # 随机动作测试
uv run isaaclab benchmark runtime --task Isaac-Cartpole        # 性能测试
uv run python -m tensorboard.main --logdir logs/rsl_rl         # 训练曲线
uv run isaaclab --editor                    # 编辑器配置
```

## 参考

- [Isaac Lab 中文快速入门](https://docs.robotsfan.com/isaaclab/source/isaaclab/quickstart.html)
- [uv 官方文档](https://docs.astral.sh/uv/)
- [Isaac Lab GitHub](https://github.com/isaac-sim/IsaacLab)

> [!summary] 记住这四个关键点
> 1. `uv run`：管理环境并运行命令。
> 2. `isaaclab train/play`：训练与回放。
> 3. `--extra` 安装集成；`physics=` 选择物理后端；`--viz` 选择可视化。
> 4. 新版 CLI 与你的 Isaac Lab 2.3.2 **不是直接兼容的命令替换关系**。
