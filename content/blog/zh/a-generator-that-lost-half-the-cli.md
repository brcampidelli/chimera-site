---
title: 一个悄悄丢失了一半 CLI 的生成器
date: 2026-08-09
category: terminal
summary: 本网站的命令参考文档是自动生成的。生成器的第一版生成了一份整洁、排序完好、看起来完全可信的 JSON 文件，却漏掉了 53 个子命令——而且没有报错。
---

Chimera 的命令行界面共有 109 个调用：56 个根命令，外加分布在 11 个分组中的 53 个子命令。文档覆盖了其中约
17 个命令的正常使用路径，由人工撰写——这是编写入门指南的正确方式，却是维护详尽参考文档的错误方式。手工抄
写的参数列表只有一天是正确的：它被敲下来的那一天。

因此，本站的参考文档是直接从 CLI 本身生成的，方式与桌面应用的 TypeScript 类型从 API 模式生成的方式相同，
CI 中也设有同样的“漂移检测门”：重新生成，如果与已提交的副本不一致，就判定失败。

## 这个 bug

第一版是这样遍历命令树的：

```python
root = typer.main.get_command(cli_app)
if not isinstance(root, click.Group):
    raise TypeError("the Chimera CLI is expected to be a command group")
```

失败的是这个检查，不是遍历本身。`typer.main.get_command()` 返回的对象并不是已安装的 `click.Group` 的
实例，因为 Typer 0.27 在 `typer._click` 命名空间下打包了自己的一份 Click 副本。`TyperGroup` 继承自
`typer._click.core.Command`，而你自己代码里导入的 `click`，是一个完全不同的类对象。

抛出异常纯属运气。上一版做的是显而易见的事——把任何不是 `click.Group` 的东西都当作叶子命令处理——而那
一版没有抛出异常。它生成了一份格式良好、排序完好、确定性的 JSON 文件，描述了 56 个命令，每个分组都被压
平成单条记录，53 个子命令则全部消失。

## 为什么这是最糟糕的失败方式

崩溃的生成器会告诉你它失败了。生成看似可信输出的生成器什么都不会告诉你，而下游的一切都会继承这种沉默。
参考页面本可以渲染得漂漂亮亮。`chimera kanban` 本会被列出，带着它的帮助文本，却没有子命令，读起来和“这
个命令本来就没有子命令”一模一样。搜索也会把它收录进索引。看着这个页面的任何人都无法察觉到缺失，因为缺
失看起来和完整的页面一模一样。

这个失败是靠数数发现的，而不是靠看：参考文档本应显示 109 个调用，实际显示的却是 56 个。

## 修复方案，以及比它活得更久的测试

导出器现在采用了鸭子类型——它问的是一个对象是否拥有 `commands` 这个映射，而不是它属于哪个类。这样一
来，无论 Click 被如何打包、Typer 升级、还是 Click 出了新的主版本，它都能扛住，因为“拥有子命令”是这个东
西本身的属性，而“是不是 `click.Group`”只是导入关系图的属性。

比修复本身更有价值的，是这份测试的写法。显而易见的断言是判断导出是否成功：

```python
def test_dump_works():
    assert build()  # passes with 53 subcommands missing
```

能捕捉到这个失败的断言，问的是找到了什么：

```python
def test_finds_the_groups_and_not_just_the_leaves():
    groups = [c for c in build()["commands"] if "commands" in c]
    assert len(groups) >= 10
```

任何只断言“生成器运行过”的测试，都会在生成器出错的情况下照样通过。值得写的测试，断言的是它本应找到的
东西。

## 参考位置

- 导出器及其测试：
  [`chimera/cli/schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/chimera/cli/schema_dump.py)
  和
  [`tests/test_cli_schema_dump.py`](https://github.com/brcampidelli/chimera-agent/blob/main/tests/test_cli_schema_dump.py)
- Typer 打包的 Click，如果你想自己确认这个机制：
  [`typer/_click`](https://github.com/fastapi/typer)
