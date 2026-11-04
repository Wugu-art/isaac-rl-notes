---
title: Isaac Lab｜深入了解仿真启动器
tags: [IsaacLab, IsaacSim, Python, 启动器, Obsidian]
source: https://docs.robotsfan.com/isaaclab/source/how-to/launch_app.html
---

# 03｜深入了解仿真启动器（Launch App）

> [!abstract] 一句话理解
> **先解析启动参数，再根据物理后端启动所需运行时，最后创建场景并推进仿真。**

## 一、为什么需要启动器？

Isaac Lab 的 Python 脚本需要先准备仿真运行环境。新版教程通过 `add_launcher_args()` 统一添加启动参数，使用 `launch_simulation()` 根据配置启动需要的运行时，并在 `with` 结束时清理。

- 使用默认 PhysX + Kit 可视化时，需要启动 Isaac Sim。
- 对于不依赖 Kit 的 Newton 配置，可能不需要启动 Isaac Sim。
- 不是每个仿真都一定会弹出图形窗口。

## 二、读懂核心代码

```python
import argparse
from isaaclab.app import add_launcher_args, launch_simulation

parser = argparse.ArgumentParser(description="Configure simulator")
parser.add_argument("--size", type=float, default=1.0)
parser.add_argument("--width", type=int, default=1280)
parser.add_argument("--height", type=int, default=720)
add_launcher_args(parser)
args_cli = parser.parse_args()
```

| 代码 | 通俗解释 |
|---|---|
| `ArgumentParser()` | 建立命令行参数接收器 |
| `add_argument("--size", ...)` | 自己定义立方体边长参数 |
| `--width / --height` | 设置窗口或输出图像尺寸 |
| `add_launcher_args(parser)` | 补充 Isaac Lab 启动参数 |
| `parse_args()` | 读取命令行输入，生成 `args_cli` |

例如运行 `--size 0.5`，程序里 `args_cli.size` 就是 `0.5`。

### 启动仿真

```python
import isaaclab.sim as sim_utils

sim_cfg = sim_utils.SimulationCfg(device=args_cli.device, dt=0.01)
with launch_simulation(sim_cfg, args_cli):
    sim = sim_utils.SimulationContext(sim_cfg)
    sim.set_camera_view([2.0, 0.0, 2.5], [-0.5, 0.0, 0.5])
    # 在这里创建场景、重置并运行
```

- `SimulationCfg`：仿真参数；`dt=0.01` 即物理频率 100 Hz。
- `launch_simulation`：根据配置启动所需运行时。
- `with`：进入时启动，退出时执行清理。
- `SimulationContext`：管理仿真状态与步进。
- `set_camera_view`：调整观察相机，不改变物理状态。

### 创建场景并运行

原文示例在 `design_scene()` 中创建地面、平行光和立方体，然后：

```python
sim.reset()
while sim.is_running():
    sim.step()
```

`reset()` 初始化仿真；`step()` 推进一步。仅创建场景并不会自动开始连续物理计算。

## 三、常用启动参数速查

| 参数 | 用途 | 示例 |
|---|---|---|
| `--help` | 查看脚本支持的参数 | `--help` |
| `--size` | 教程自定义立方体边长 | `--size 0.5` |
| `--width` | 视口/图像宽度 | `--width 1280` |
| `--height` | 视口/图像高度 | `--height 720` |
| `--device` | 计算设备 | `--device cuda:0` |
| `--livestream` | 实时串流模式 | `--livestream 2` |
| `--visualizer` | 选择可视化后端 | `--visualizer kit` |
| `--verbose` | 输出更详细的日志 | `--verbose` |
| `--experience` | 指定 Isaac Sim Experience 文件 | `--experience ...` |
| `--xr` | XR 模式 | `--xr` |

> [!note] 注意
> `--size` 是示例脚本自己添加的参数，**不是**所有 Isaac Lab 脚本都支持。`--width`、`--height` 在该示例中被转交给 `SimulationApp`。

## 四、常用运行命令（对应新版教程）

在 Isaac Lab 项目根目录执行：

```bash
# 查看全部参数
uv run python scripts/tutorials/00_sim/launch_app.py --help

# 创建边长 0.5 米的立方体
uv run python scripts/tutorials/00_sim/launch_app.py --size 0.5

# 使用指定 GPU
uv run python scripts/tutorials/00_sim/launch_app.py --device cuda:0

# 开启实时串流（需相应环境支持）
LIVESTREAM=2 uv run python scripts/tutorials/00_sim/launch_app.py --size 0.5

# 命令行参数覆盖同名环境变量
LIVESTREAM=0 uv run python scripts/tutorials/00_sim/launch_app.py --livestream 2
```

也可以用文档提供的 `./isaaclab.sh -p` 方式替换 `uv run python`，前提是相应版本和环境已安装正确。

**注意：`--size 0.5` 指的是边长 0.5 米，不是体积 0.5 立方米；体积为 0.125 立方米。**

## 五、环境变量与命令行的区别

```bash
LIVESTREAM=2 uv run python scripts/tutorials/00_sim/launch_app.py
```

`LIVESTREAM=2` 是给这一次命令设置环境变量；`--livestream 2` 是直接向脚本传参。**同一选项冲突时，命令行参数优先。**

## 六、你当前 Isaac Lab 2.3.2 的兼容性提醒

> [!warning] 重要：不要直接复制新版 API
> 这篇文档使用新版 `add_launcher_args` 和 `launch_simulation`。你此前的 Isaac Lab 2.3.2 项目主要使用 `AppLauncher`，并曾遇到 `cannot import name 'launch_simulation'`。因此不要直接在旧环境里运行本篇代码。

旧版常见启动结构（**仅展示启动方式差异**）：

```python
import argparse
from isaaclab.app import AppLauncher

parser = argparse.ArgumentParser()
AppLauncher.add_app_launcher_args(parser)
args_cli = parser.parse_args()

app_launcher = AppLauncher(args_cli)
simulation_app = app_launcher.app

# 这里再导入需要 Isaac Sim 运行时的模块、创建仿真
# ...

simulation_app.close()
```

`AppLauncher` 是旧版常用接口，`launch_simulation()` 是这篇新版教程采用的接口。切换版本前先确认项目 API，避免混装依赖。

## 七、Go2 强化学习中怎么用？

你以后运行 Go2 训练时，启动参数主要用于：

1. **指定 GPU**：例如 `cuda:0`。
2. **选择是否显示界面**：大量并行训练通常使用无界面模式（具体参数以训练脚本支持的选项为准）。
3. **排查启动问题**：先运行 `--help`，确认可用参数，再检查版本和扩展依赖。
4. **远程查看仿真**：有需要时使用 livestream，前提是部署环境支持。

## 八、常见错误

| 问题 | 排查思路 |
|---|---|
| `ImportError: launch_simulation` | 版本 API 不一致，旧版改用对应的 `AppLauncher` |
| `unrecognized arguments` | 先运行 `--help`，检查脚本是否定义该参数 |
| 没有图形窗口 | 检查是否启用了无界面、串流或非 Kit 可视化后端 |
| 程序启动后没动作 | 检查是否调用 `sim.reset()` 和 `sim.step()` |
| 退出后仍有资源占用 | 检查异常退出、清理逻辑和残留进程 |

## 九、记忆卡片

- **argparse**：接收用户命令。
- **add_launcher_args**：补充 Isaac Lab 启动选项。
- **SimulationCfg**：定义仿真配置。
- **launch_simulation**：启动所需运行时。
- **SimulationContext**：操作仿真。
- **sim.step()**：推进仿真一步。

> [!success] 本篇掌握标准
> 能解释为什么要先解析参数再启动仿真；知道 `--size` 是自定义参数；能区分新版 `launch_simulation()` 和旧版 `AppLauncher`。

**原文：** https://docs.robotsfan.com/isaaclab/source/how-to/launch_app.html
