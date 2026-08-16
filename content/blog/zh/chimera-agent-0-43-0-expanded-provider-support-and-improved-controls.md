---
title: "Chimera Agent 0.43.0：扩展的提供商支持与改进的控制功能"
date: 2026-08-16
category: update
summary: "Chimera Agent 0.43.0 通过 LiteLLM 引入了更广泛的提供商支持，新增了 UI 控制项以管理之前隐藏的设置，并修复了文档附件和主题持久化的问题。"
version: "0.43.0"
---

## 通过 LiteLLM 扩展提供商支持

Chimera Agent 现已完全集成 LiteLLM，允许用户连接任何 LiteLLM 支持的提供商。此前，仅支持五个提供商，导致用户无法使用 Groq 或 Mistral 等供应商的密钥。此次更新确保任何 `<PROVIDER>_API_KEY` 都会被接受，同时通过黑名单排除 ElevenLabs 和 Stability 等非模型提供商。此外，`doctor` 现在会标记未识别的提供商名称，帮助用户避免因拼写错误而误认为是有效提供商。

## 改进的 UI 控制项

之前仅能通过 `.env` 文件访问的三个设置现已可在 UI 中配置：嵌入模型、Ollama 基础 URL 和密钥池。嵌入模型设置现在直接与语义记忆开关关联，确保用户能够配置它而不会出现静默失败。密钥池通过操作（添加/删除）管理，而非直接编辑，避免显示敏感信息以维护安全性。

## 修复与增强

文档附件和语音输入功能现已正常工作，修复了因错误的 Content-Type 标头导致的 422 错误。应用还保留了主题、工作区、项目列表和语言设置，解决了因端口更改导致这些设置丢失的问题。

要了解这些更新的更多信息，请查看 [发布说明][Chimera Agent v0.43.0](https://github.com/brcampidelli/chimera-agent/releases/tag/v0.43.0)。
