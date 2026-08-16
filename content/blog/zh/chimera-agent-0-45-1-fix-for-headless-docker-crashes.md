---
title: "Chimera Agent 0.45.1：修复无头Docker容器崩溃问题"
date: 2026-08-16
category: update
summary: "v0.45.1修复了一个严重的Docker启动问题，该问题导致无头容器因不必要的FastAPI依赖而崩溃。"
version: "0.45.1"
---

## Docker容器启动崩溃的原因

Chimera Agent 0.45.0引入了一个无头Docker部署的静默故障。容器镜像安装了`.[full]`但不包含`desktop`扩展，这有意排除了FastAPI。然而，cron路径开始导入`chimera.api.usage`，触发了API模块的急切初始化。这通过JSONL读取器间接引入了FastAPI作为依赖，导致容器崩溃循环并报错`ModuleNotFoundError`。

该漏洞未被发现的原因是：
1. 开发环境通常已安装FastAPI
2. 现有的2945个测试中没有一个模拟了干净的`.[full]`安装
3. 故障仅在生产部署中显现

## 核心依赖的延迟加载

修复方案针对根本原因而非掩盖症状。将`desktop`添加到镜像中本可解决问题，但这违反了扩展的文档说明（"核心CLI/网关从不需它"）且不必要地增加了镜像大小。

v0.45.1修改了`chimera/api/__init__.py`以：
- 延迟解析重新导出而非急切加载
- 将FastAPI依赖隔离到Web特定组件
- 当确实需要`desktop`时保持清晰的故障模式

五个叶子模块（`usage`、`roles`、`sessions`、`posture`和`config_api`）在被CLI操作导入时不再隐式拉取Web栈。网关在仅安装`.[full]`的情况下仍可正常工作。

## 新的安全网

新增的子进程测试现在验证了在没有FastAPI环境下的导入工作。这通过以下方式本可在发布前发现问题：
1. 在故意使`fastapi`不可导入的环境中运行
2. 在继续其他检查前断言核心功能
3. 镜像实际部署条件

端到端验证确认了修复效果：干净的`.[full]`安装现在可以运行`serve --cron`而不会崩溃。

通过`pip install -U chimera-agent==0.45.1`升级。部署验证时，使用`serve --cron`测试容器并检查网关初始化消息。[Chimera Agent v0.45.1](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.45.1)提供了变更的完整技术细节。
