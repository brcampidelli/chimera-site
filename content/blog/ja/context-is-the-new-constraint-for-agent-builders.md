---
title: "コンテキストこそが、エージェント開発者にとっての新たな制約である"
date: 2026-10-13
category: analysis
summary: "エージェントのパフォーマンスは、モデルの性能よりも、コンテキストをいかに管理し、リセットし、外界から隔離するかによって左右される。"
sources:
  - headline: "How Anthropic’s Dynamic Workflows Coordinate Claude Agents"
    url: https://www.latent.space/p/claude-dynamic-workflows
    outlet: "Latent Space"
    published: 2026-10-12
  - headline: "Clearing chat history helps AI agents find better solutions"
    url: https://the-decoder.com/clearing-chat-history-helps-ai-agents-find-better-solutions/
    outlet: "The Decoder"
    published: 2026-10-12
  - headline: "Anthropic is cutting off its internal evaluations from the internet"
    url: https://www.theverge.com/ai-artificial-intelligence/1009286/anthropic-is-cutting-off-its-internal-evaluations-from-the-internet
    outlet: "The Verge"
    published: 2026-10-10
dropped: "84 matérias examinadas de 510 reunidas, 3 lidas para este texto. Descartadas: publicado há 74h (1), publicado há 76h (1), publicado há 79h (1), publicado há 104h (1), publicado há 107h (1), publicado há 143h (1)"
---

今週のエージェント研究から得られた最も有益なシグナルは、より大規模なモデルやより長いコンテキストウィンドウに関するものではない。それは、能動的に管理可能な制約としてのコンテキストだ。三つの異なる動向が、同じ方向を指し示している。エージェントは、ワーキングメモリが単に拡張されるのではなく、意図的に形成されたときに、より優れたパフォーマンスを発揮するのだ。

AI Engineer New York での Anthropic のプレゼンテーションは、エージェントの協調を Unix や Linux から借用した用語で捉え直した [[1]](https://www.latent.space/p/claude-dynamic-workflows)。その教訓は、エージェントが文字通りオペレーティングシステムを模倣すべきだということではない。開発者には、エージェントが何を見るか、いつそれを見るか、何を先に進めるかを制御するためのプリミティブが必要だということだ。プロセスは、その実行履歴全体をメモリに保持したりはしない。必要なものを読み取り、重要なものを書き込み、残りは手放す。エージェント開発者たちは、これと同じ規律を適用し始めている。

Microsoft の研究者たちは、この規律が対処する具体的な失敗モードを発見した。自律エージェントは「アイデア盆地」、つまり局所的な解決領域に閉じ込められる。これは、増大するチャット履歴がエージェントを以前の推論に固定してしまうために、そこから脱出できなくなる現象だ [[2]](https://the-decoder.com/clearing-chat-history-helps-ai-agents-find-better-solutions/)。彼らがテストした修正手法は Fork-and-Flush と呼ばれ、ワークスペースを保持したままチャット履歴をクリアする。その結果、同じ計算リソースで最大66% の成果向上が見られた。この数字が重要なのは、コンテキスト管理を変数として分離しているからだ。モデルは変わっていない。タスクも変わっていない。変わったのは、エージェント自身の履歴との関係性だけだ。

## コンテキストは設計対象である

開発者にとって、これは一般的な前提を捉え直すものだ。多くのチームはコンテキストをストレージの問題として扱う。どれだけ詰め込めるか、どう圧縮するか、どうやって適切なチャンクを取得するか。それらは現実的な問いだが、より根本的な問いを見落としている。エージェントはそもそも、何を記憶することを許されるべきなのか？

Fork-and-Flush が機能するのは、忘却を機能として扱っているからだ。エージェントはその成果物（ワークスペース、コード、部分的な解決策）を保持するが、そこに至った推論の痕跡は破棄する。その推論の痕跡は中立的なものではない。それは仮定、行き止まり、そして後の探索を制約する初期のフレーミングを内包している。それをクリアすることは記憶喪失ではない。それは既知の状態からの、制御された再スタートなのだ。

Anthropic の Unix に着想を得たワークフローは、より高いレベルでの同じ原則を示唆している。Unix では、小さなプログラムが明示的なインターフェースを通じて通信する。それらはメモリを共有しない。それぞれが自身の入力で新たに開始し、出力を生成する。Anthropic がこれをエージェントの協調に適用するとき、その含意は、長時間実行されるエージェントタスクは、一つの連続した会話として実行されるのではなく、明確な境界を持つ小さな単位に分解されるべきだということだ [[1]](https://www.latent.space/p/claude-dynamic-workflows)。

## 隔離が評価を変える

三つ目の動向は、エージェントと外界との境界に関するものだ。Anthropic は、「意図しないモデルのアクション」を防げるようになるまで、内部評価をオフラインに保っている [[3]](https://www.theverge.com/ai-artificial-intelligence/1009286/anthropic-is-cutting-off-its-internal-evaluations-from-the-internet)。これは抽象的な安全宣言ではない。テスト中にインターネットに接続されたエージェントが、予測、追跡、または元に戻すことが困難な方法で動作しうるという認識である。

開発者にとって、これは直接的な実用上の結果をもたらす。もしエージェントを外部システムに到達できる環境で評価するなら、あなたはエージェントを測定しているのではない。エージェントに加えて、それがたまたま見つけ、トリガーし、または変更したもの全てを測定しているのだ。オフライン評価はコンテキスト制御の一形態である。それは、完全には観測できない変数を取り除く。同じロジックが本番環境にも当てはまる。世界に対してアクションを起こせるエージェントには、単に振る舞いを求めるプロンプトではなく、あなたが制御する境界が必要だ。

これら三つのストーリーを結びつけるのは、エージェントの品質がどこから来るのかという点における変化だ。それはモデルの生の能力からではなく、その周囲の構造、つまりエージェントが何を記憶し、何を忘却し、何に触れることができ、何に触れることができないのか、という点からより多く生じるようになっている。コンテキストを設計対象、つまり形成し、リセットし、隔離すべきものとして扱う開発者は、同じモデルからより信頼性の高い結果を得るだろう。それを受動的なログとして扱う開発者は、同じ失敗と戦い続けるだろう。
