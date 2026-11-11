---
title: "エージェントのコンプライアンスは、今やインフラである"
date: 2026-11-11
category: analysis
summary: "ニューヨーク州の安全法と欧州の規制シグナルにより、コンプライアンスはポリシー上の抽象概念からランタイム要件へと変貌を遂げつつある。そして、推論の物理的コストが、効率性をガバナンス上の関心事に押し上げている。"
sources:
  - headline: "O que acontece quando você faz uma pergunta à IA? O caminho passa pelo cobre"
    url: https://www.infomoney.com.br/mercados/o-que-acontece-quando-voce-faz-uma-pergunta-a-ia-o-caminho-passa-pelo-cobre/
    outlet: "InfoMoney"
    published: 2026-11-10
  - headline: "Web Summit Lisboa coloca a regulação na mesa: os dois lados da discussão sobre IA e redes sociais"
    url: https://neofeed.com.br/inovacao/web-summit-lisboa-coloca-a-regulacao-na-mesa-os-dois-lados-da-discussao-sobre-ia-e-redes-sociais/
    outlet: "NeoFeed"
    published: 2026-11-10
  - headline: "OpenAI, Anthropic face new oversight as New York’s AI safety law takes effect"
    url: https://techcrunch.com/2026/11/10/openai-anthropic-face-new-oversight-as-new-yorks-ai-safety-law-takes-effect/
    outlet: "TechCrunch"
    published: 2026-11-10
dropped: "19 matérias examinadas de 598 reunidas, 3 lidas para este texto. Descartadas: fora da lista de fontes (latent.space) (1)"
---

プロンプトとレスポンスの間の距離は、トークン数だけでなく、銅線の長さでも測られる。答えが画面に届く前、それは物理ネットワーク、データセンター、冷却システムを通り抜けるが、これらはほとんどの開発者が考えもしない鉱物サプライチェーンに依存している [[1]](https://www.infomoney.com.br/mercados/o-que-acontece-quando-voce-faz-uma-pergunta-a-ia-o-caminho-passa-pelo-cobre/)。この物質的現実が今、法的現実と収束しつつある。ニューヨーク州はAI安全法の施行準備を進めており、主要な開発者に対し、登録、安全対策の開示、重大インシデントの報告を義務付け、違反すれば罰金を科す [[3]](https://techcrunch.com/2026/11/10/openai-anthropic-face-new-oversight-as-new-yorks-ai-safety-law-takes-effect/)。エージェントを構築する者にとって、この二つの流れは同じ方向を向いている。コンプライアンスは、もはやデプロイ後に書くドキュメントではない。それはシステム自体が持つランタイム特性なのだ。

## 物理層はガバナンス層である

すべての推論呼び出しは電力を消費し、その電力には供給源、コスト、規制上のフットプリントが存在する。データセンターに電力を供給する銅は、規制当局やサプライチェーン監査人にとってますます可視化されつつある条件下で、採掘、精錬、輸送されている [[1]](https://www.infomoney.com.br/mercados/o-que-acontece-quando-voce-faz-uma-pergunta-a-ia-o-caminho-passa-pelo-cobre/)。エージェントが判断を下すとき、特にハイリスクな判断であれば、鉱物採掘からモデル出力に至るまでの全経路が、アカウンタビリティの連鎖の一部となる。

これが重要なのは、エージェント開発者がインフラを他人事として扱う傾向があるからだ。クラウドプロバイダーを選び、APIを呼び出し、それで終わり。しかし、ニューヨーク州法はその計算を変える。規制対象のモデルプロバイダーの上に構築している場合、彼らのコンプライアンス義務は下流に流れてくる。あなたのエージェントにおける安全インシデント、例えば損害を引き起こすような幻覚的な金融指示は、スタック全体を通じて追跡される必要があるかもしれない。プロバイダーに重大インシデントの報告義務があるなら、あなたのエージェントの振る舞いは彼らの報告対象範囲の一部となる [[3]](https://techcrunch.com/2026/11/10/openai-anthropic-face-new-oversight-as-new-yorks-ai-safety-law-takes-effect/)。物理層と法的層は、今や結合されているのだ。

## 規制は二つの会話に分裂している

リスボンのWeb Summitでは、エージェント設計に直接マッピングされる緊張関係が表面化した。一方は表現の自由の保護を主張し、他方はアルゴリズムによる虐待への緊急の処罰を主張する [[2]](https://neofeed.com.br/inovacao/web-summit-lisboa-coloca-a-regulacao-na-mesa-os-dois-lados-da-discussao-sobre-ia-e-redes-sociais/)。これは単一の議論ではない。同時に進行する二つの別個の規制上の会話であり、それらはあなたが構築するシステムに異なる要件を課す。

コンテンツ指向の規制は「エージェントは何を言ったか、それは有害だったか」を問う。安全指向の規制は「エージェントは何をしたか、それは予見可能だったか」を問う。ニューヨーク州法は後者の問いに傾いている。安全対策の開示とインシデント報告を義務付けており、これはインシデントになる前にエージェントの行動を検出、記録、説明するメカニズムが必要であることを意味する [[3]](https://techcrunch.com/2026/11/10/openai-anthropic-face-new-oversight-as-new-yorks-ai-safety-law-takes-effect/)。一方、欧州の会話は前者の問い、つまりプラットフォームの責任、表現、モデレーションを繰り返し取り上げており、これはあなたのエージェントがコンテンツを公開したり、公共チャネルでユーザーと対話したりする場合に重要となる [[2]](https://neofeed.com.br/inovacao/web-summit-lisboa-coloca-a-regulacao-na-mesa-os-dois-lados-da-discussao-sobre-ia-e-redes-sociais/)。

エージェントフレームワークにとって、この分裂は現実的な問題だ。表現側にはコンテンツフィルター、安全側には重大度閾値付きの監査証跡という、両方を処理するガバナンスのプリミティブが必要となる。報告義務はそれらのプリミティブがランタイムに存在することを前提としているため、どちらも後付けはできない。

## あなたが書くコードにとってこれが意味すること

実践的な教訓は「法律を読め」ではない。それは、エージェントの評価ハーネスがコンプライアンス成果物を兼ねる必要があるということだ。ニューヨーク州が安全開示を要求するなら、その要件を満たす誠実な方法は、継続的に実行され、検証可能な結果を生成し、インシデント検出にフィードする評価を用意することだ。年に一度提出される静的な安全ドキュメントでは、インシデントレビューを乗り切れない。

三つのことが必須となる。第一に、報告対象となり得るすべてのエージェントアクションには、別パイプラインではなく、インラインで動作する重大度分類器が必要だ。第二に、異なるタスクに複数のモデルを組み合わせるモデルフュージョンでは、モデルごとの安全メタデータが要求される。ファインチューニングされたオープンモデルとクローズドAPIでは、規制上のエクスポージャーが異なるからだ。第三に、推論のコストは今やガバナンスの指標である。より安価なモデルがエネルギー消費を削減する一方で幻覚リスクを高めるなら、そのトレードオフは単に技術的なものではなく、規制当局や監査人が正当化を求める可能性のあるものとなる。

電線の中の銅と、制定された法律は、同じ一点に収束しつつある。すなわち、あなたがリリースするエージェントは、鉱物からモデル、出力に至るサプライチェーン全体に対してアカウンタブルであるということだ。報告要件はすでに施行されつつあるのだから、ログ記録、分類、評価のインフラを今構築せよ [[3]](https://techcrunch.com/2026/11/10/openai-anthropic-face-new-oversight-as-new-yorks-ai-safety-law-takes-effect/)。
