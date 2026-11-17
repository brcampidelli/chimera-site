---
title: "証明と警告は同じアーキテクチャである"
date: 2026-11-17
category: analysis
summary: "モデルが25年来の物理学の予想を証明するのと、同じインフラがポリシー違反に対して24時間のBANを課すとき、あなたは単一の制御面を見ている。そしてそれは、エージェントガバナンスの設計方法を変える。"
sources:
  - headline: "OpenAI's GPT-6 Astra tackles the Standard Model's toughest math problem on a lattice"
    url: https://the-decoder.com/openais-gpt-6-astra-tackles-the-standard-models-toughest-math-problem-on-a-lattice/
    outlet: "The Decoder"
    published: 2026-11-16
  - headline: "OpenAI releases a new image classifier and ChatGPT warnings to combat CSAM"
    url: https://techcrunch.com/2026/11/16/openai-releases-a-new-image-classifier-and-chatgpt-warnings-to-combat-csam/
    outlet: "TechCrunch"
    published: 2026-11-16
  - headline: "Release: datasette-llm 0.1a11"
    url: https://simonwillison.net/2026/Nov/14/datasette-llm/
    outlet: "Simon Willison"
    published: 2026-11-14
dropped: "342 matérias examinadas de 540 reunidas, 3 lidas para este texto. Descartadas: HTTP 429 (21), publicado há 18944h (4), publicado há 4140h (3), publicado há 9528h (2), publicado há 11256h (2), publicado há 13404h (2)"
---

数学的証明を生み出すメカニズムと、コンテンツ警告を生み出すメカニズムは同一である。これは哲学的な見解ではない。今まさにエージェントを構築している者なら誰でも、設計上考慮しなければならないアーキテクチャ上の制約だ。

同じ日に出た二つのシグナルが、この点を明確に示している。一方では、OpenAIの物理学者がGPT-6 Astraを使い、標準模型全体の格子定式化（25年以上未解決だった問題）を解明した。Nathaniel Craigが戦略を提供し、モデルがそれを動作する証明へと変換したのだ [[1]](https://the-decoder.com/openais-gpt-6-astra-tackles-the-standard-models-toughest-math-problem-on-a-lattice/)。もう一方では、ChatGPTが新たな画像分類器を背景に、CSAMにアクセスしようとするアカウントに対して24時間のBANを発行し始めた [[2]](https://techcrunch.com/2026/11/16/openai-releases-a-new-image-classifier-and-chatgpt-warnings-to-combat-csam/)。

これらを別世界の話として読むのは簡単だ。一方は科学的ブレークスルー、もう一方は安全インフラの話だと。しかし、そうではない。これは、モデルの出力面が創造と執行の両方にとって主要なインターフェースとなる時に何が起こるか、という同一の話なのだ。

## 単一の制御プレーン

構築者にとって、この意味するところは実践的だ。モデルをエージェントループでラップし、ツール、メモリ、動作能力を与えるとき、あなたは単に機能を追加しているだけではない。モデルプロバイダーが出力パイプラインに組み込んだガバナンス層を、そのまま継承しているのだ。その層は今や、数学的推論からコンテンツ分類まですべてに及ぶ。

Craigの証明は、特別な物理学モードから生まれたわけではない。他の文脈では画像を分類しアカウントBANをトリガーするのと、全く同じモデルから生まれたのだ。格子証明とCSAM分類器は、単一のシステムの出力である。あなたが科学文献を推論するエージェントを構築しているなら、それはトークンレベルで利用規約ポリシーを執行するインフラ上で動作しているのだ。

これは不満ではない。設計パラメータだ。ガバナンスは交換可能な別個のモジュールではなく、推論パスの一部なのである。あなたのエージェントが特定の推論チェーンを探求する能力は、全く別の目的のために構築された分類器によって形成される可能性がある。あなたはそれを知っておく必要がある。

## 評価にとってこれが意味すること

モデルの振る舞いが見えない分類器によって調整されている場合、正直な評価はより困難になる。あなたのエージェントが特定の出力を生成できなかった場合、それは推論が不十分だったからか、それとも安全分類器が介入したからか？ 外部からは判別できない。モデルはその区別を表面化しない。

ここに、クローズドAPIにはない、オープンソースのエージェントスタックが持つ利点がある。Simon Willisonが最新リリースしたdatasette-llmは、他のプラグインが共有LLM統合レイヤーに依存できるプラグインアーキテクチャを導入している [[3]](https://simonwillison.net/2026/Nov/14/datasette-llm/)。この種のコンポーザビリティは、ここで重要になる。統合ポイントを制御できれば、それを計測できるのだ。拒否が発生したときにログを記録し、それがモデル、分類器、あるいは自身のガードロジックのどこから来たのかをトレースできる。

法的案件、医療データ、セキュリティ研究など、機密性の高いトピックを推論する必要があるエージェントを構築しているなら、そのトレーサビリティが必要だ。それがなければ、あなたはブラックボックスの中のブラックボックスをデバッグしていることになる。

## 実際に持っている制御面に合わせて構築せよ

実践的な教訓は、OpenAIや特定のプロバイダーについてではない。あなた自身のエージェントのために選ぶアーキテクチャについてだ。ガバナンスと能力が同じ出力面を共有する場合、選択肢は二つある。プロバイダーの分類器をエージェントの振る舞いの一部として受け入れ、それを前提に設計するか。あるいは、推論スタックを自分で制御できるモデルを実行し、完全な可観測性を備えた独自のガバナンスを実装するかだ。

モデルが単にあなたの要求通りに動く、という第三の選択肢は存在しない。格子証明と24時間BANは同じシグナルなのだ。制御面は統一されている。それに応じて構築せよ。
