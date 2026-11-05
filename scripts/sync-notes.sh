#!/usr/bin/env bash
set -euo pipefail

site_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
notes_dir="${1:-$(cd "$site_dir/../../isaac_RL" && pwd)}"

if [[ ! -d "$notes_dir/Isaac学习内容" || ! -d "$notes_dir/笔记" ]]; then
  echo "未找到笔记源目录：$notes_dir" >&2
  exit 1
fi

for notes_folder in Isaac学习内容 笔记 学习日志 学习模板; do
  if [[ -d "$notes_dir/$notes_folder" ]]; then
    rsync -a \
      --include='*/' --include='*.md' --include='*.png' --include='*.jpg' \
      --include='*.jpeg' --include='*.webp' --include='*.svg' --include='.gitkeep' \
      --exclude='*' \
      "$notes_dir/$notes_folder/" "$site_dir/$notes_folder/"
  fi
done

echo "笔记已同步到 $site_dir；检查并提交此目录的改动后，GitHub Pages 会发布。"
