---
title: "Chimera Agent 0.65.0：配对、截止时间与沙箱保障"
date: 2026-10-12
category: update
summary: "机器人现在首次启动时安全配对，沙箱回退已移除，回合有了截止时间，Ollama 模型能读取完整提示词。"
version: "0.65.0"
---

## 首次启动配对的是机器人，而不是房间

在此版本之前，当数据文件夹已有内容时，桌面应用会在消息卡片上问“这是新安装吗？”。这意味着应用启动的每个机器人都以开放状态运行——任何能连到它的人都能使用所有者的工具和额度。即使生成了配对码，也只会出现在没人看的控制台里。

应用现在会记录启动时已经配置好的机器人。这些机器人继续像以前一样应答。在那之后配置的机器人则从配对开始，配对码会显示在消息卡片上——一个真正有人看的地方。API 也反映了这一点：`GET /api/messaging` 会报告 `pairing_code`、`pairing` 和 `open` 三种状态。桌面桥接层能看到 `pairing` 状态，但永远看不到配对码本身，因此自动化无法绕过人工这一步。

## 无法运行的沙箱拒绝运行

在没有 Docker 守护进程的情况下设置 `CHIMERA_SANDBOX=docker`，以前只会打一行日志就回退到宿主机。本该隔离的命令直接在机器上执行了。这个回退已经移除。现在 `run_shell`、`execute_code` 和工作流步骤在询问宿主机执行之前就会直接拒绝。拒绝消息会说明发生了什么、什么都没运行，以及两条出路：启动 Docker，或者设置 `CHIMERA_SANDBOX=local`。验证器会选择弃权，而不是因为守护进程挂了就回退执行。

显式传入 `fallback=` 的调用方保留旧行为。其他所有人都会硬性停止。同样的边界也适用于入站媒体：当大小已声明时，Telegram 和 WhatsApp 的下载现在会在第一个字节之前就停在 20 MB 限制上，而不是把整个文件读进内存之后再测量。

## 截止时间进入治理频段

决策现在可以携带截止时间，错过截止时间会把 REVIEW 频段推向更严格的审查。`DecisionSpec.deadline_s` 为每个决策声明截止时间；`Decider.decide(..., deadline_s=)` 则在每次调用时覆盖它。未按时返回的答案会在回执和决策日志中以 `deadline_missed` 停止，这样错过次数就变得可统计。

设置 `CHIMERA_GOVERNANCE_BAND_DEADLINE_S` 后，错过截止时间会产生一张 `band: deadline` 的 REVIEW 卡片——绝不会是 ALLOW。迟到的答案永远不会被缓存或在事后应用。此功能默认关闭，新的设置 › 通用 › 治理与审计面板将其与另外五个此前只能通过 `.env` 访问、或者能保存但读不回来的可选控制项一起暴露出来。`GET /api/config` 会在 `governance_audit` 块中报告它们。清除截止时间不再导致应用无法启动：空值现在会被解读为没有截止时间。

## Ollama 模型读取完整提示词

对 `ollama_chat/` 或 `ollama/` 模型的调用从未指定上下文窗口，所以 Ollama 使用它的机器默认值——在暴露这个问题的案例中是 4,096 个 token。所有更长的提示词都被静默截断到大约一半大小。一次 `chimera solve` 运行的第一个请求大约有 20,500 个字符，却被读成 2,050 个 token，模型根本没看到任务。

现在每条网关路径都会向 Ollama 路由发送 `num_ctx`，取值来自 `CHIMERA_OLLAMA_NUM_CTX`（默认 32,768；设为 `0` 则保留服务器默认值）。Ollama 模型的压缩预算根据该窗口计算，而不是 128,000 token 的回退值。如果响应的提示词计数显示被截断，会记录一条 `PROMPT TRUNCATED` 警告，而不是静默通过。托管服务商不受影响。

## 现在该做什么

用 `pip install chimera-agent==0.65.0` 升级。如果你运行桌面应用，重启它并检查消息卡片上是否有需要配对的机器人。如果你使用 `CHIMERA_SANDBOX=docker`，确认守护进程在运行，或者切换到 `local`。如果你调用 Ollama 模型，设置 `CHIMERA_OLLAMA_NUM_CTX` 以匹配你模型的窗口。完整发布说明见 [Chimera Agent v0.65.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.65.0)。
