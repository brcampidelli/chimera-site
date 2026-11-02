---
title: "実世界のエージェントには、汎用モデルより特化型ツールが効く"
date: 2026-11-02
category: analysis
summary: "タスクごとに適切なツールを選ぶエージェントは汎用モデルを凌駕するが、コストと信頼の問題で実用化はまだ進んでいない。"
sources:
  - headline: "Adobe is testing how well AI agents can use editing tools like a Photoshop professional would"
    url: https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/
    outlet: "The Decoder"
    published: 2026-11-01
  - headline: "Basically no one is using AI agents for their DoorDash orders"
    url: https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/
    outlet: "Ars Technica"
    published: 2026-10-30
  - headline: "Zest's new AI agent finds restaurants and books reservations over text"
    url: https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/
    outlet: "TechCrunch"
    published: 2026-10-30
dropped: "80 matérias examinadas de 530 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (2), publicado há 122h (1), publicado há 245h (1), publicado há 294h (1), publicado há 296h (1), publicado há 480h (1)"
---

ラボでAIエージェントができることと、人々が実際に使っていることのギャップは広がっている。AdobeのEditAgentが示したのは、より大きな汎用モデルではなく、特化型ツールこそが高い性能の鍵だということだ。ただし、必要な計算リソースは約10倍になる。一方で、DoorDashの注文やZestのレストランコンシェルジュといった消費者向けエージェントは、ユーザー獲得に苦戦している。開発者が学ぶべき教訓は明白だ。モデルの規模だけでなく、ツールの選択と効率性に注力せよ。

## 適材適所のツール選択

Adobe ResearchとUC San Diegoが開発したEditAgentは、よりPhotoshopのプロフェッショナルのように画像を編集するAIシステムだ。同じ汎用エディタで何度もリトライする代わりに、このエージェントはタスクごとに適切な特化型ツールを選択し、標準的な言語モデルに計測された画像データに基づいて最良の結果を選ばせる [[1]](https://the-decoder.com/adobe-is-testing-how-well-ai-agents-can-use-editing-tools-like-a-photoshop-professional-would/)。このアプローチは有効だが、必要な計算リソースは約10倍だ。トレードオフは明確である。高い能力は生のモデルパワーではなく、オーケストレーションから生まれる。

エージェント開発者にとって、これは重要な洞察だ。汎用モデルは多用途だが非効率である。エージェントに特化機能のツールボックスと結果を評価する手段を与えれば、より良い結果を達成できる。ただし、そのオーバーヘッドを許容できるならば、の話だ。課題は、そのオーケストレーションを本番環境で使えるほど安価にすることにある。

## 普及のギャップ

技術の進歩にもかかわらず、実世界での利用は依然として低調だ。Ars Technicaの報道によれば、DoorDashの注文にAIエージェントを使っている人はほぼ皆無だが、これは比較的新しいEコマースのユースケースとしてはまだ初期段階にある [[2]](https://arstechnica.com/ai/2026/10/doordash-says-outside-ai-agents-have-only-led-to-hundreds-of-orders-so-far/)。同様に、Zestの新しいAIエージェントはテキストでレストランを探して予約するが、ローンチしたばかりで、ユーザーの信頼獲得という同じ困難な課題に直面している [[3]](https://techcrunch.com/2026/10/30/zests-new-ai-agent-finds-restaurants-and-books-reservations-over-text/)。

なぜ躊躇するのか。消費者にとって、エージェントは依然として信頼性に欠け、不透明だ。DoorDashの注文を間違えたり、予約が失敗したりすれば、現実的な不便につながる。企業にとっては、EditAgentのようなエージェントの実行コストが法外だ。エージェントが信頼でき、かつ手頃な価格になるまで、普及は機能に追いつかないだろう。

## 開発者が取るべき道

第一に、ツール選択に投資せよ。単一のモデルにすべてを任せるのではなく、特化型ツール群から選択し、結果を客観的に評価できるエージェントを設計する。第二に、効率性を最適化せよ。EditAgentの10倍の計算コストは警告だ。エージェントが軽量でなければ、スケールしない。最後に、信頼を段階的に構築せよ。エラーが許容されるリスクの低いタスクから始め、ユーザーがエージェントの推論プロセスを確認できるようにする。普及への道は、派手なデモではなく、小さく確実な成功によって舗装されるのだ。
