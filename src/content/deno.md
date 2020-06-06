---
layout: page
title: "Node.jsの上位互換のDenoビルドするまで(TypeScript+V8処理)"
date: '2018-09-28'
featuredImage: ../images/deno.png
---

#### Qiitaの記事を移行しました
Qiitaの方は[こちら](https://qiita.com/MokeeeMokeee/items/f3d56d6f188145d53984)

## denoとは
node.jsの生みの親であるRyan Dahl氏にがNode.js開発においては複数の「ミス」を考慮して開発したTypeScript処理系です。

[Node.js における設計ミス By Ryan Dahl - from scratch](https://yosuke-furukawa.hatenablog.com/entry/2018/06/07/080335)こちらのブログにどのような「ミス」がありきになる方はこちらの方を参照してみてください。

今回のこの記事は[ry/denoをビルドする (Node.jsの産みの親が作ったTypeScript+V8処理系)](https://qiita.com/erukiti/items/b3039a94efacd1fb51a6)を参考に書かせていただきました。

## 環境
- macOS: Mojave version 10.14

※ 今回の説明はmacOSでの説明になります。他のOSでの環境構築に関しては[githubのリポジトリ](https://github.com/denoland/deno)などを確認しながら行ってください。

## Golangの構築
demoはGolangで書かれているので、Golangの環境構築が必要となります。

```bash:title=terminal
$ brew install go
$ go version
  go version go1.11 darwin/amd64
```
これでinstall自体は完了です。

Goは作業場所として、 `$GOPATH` を設定する必要があります。
今回は公式の方に従い `$HOME/go` で作りたいと思います。

```bash:title=terminal
$ export GOPATH=${HOME}/go
$ export PATH=$GOPATH/bin:$PATH
```

## v8worker2をビルドしてみる
基本的には、[github](https://github.com/ry/deno/blob/master/README.md)を参照しながら作業の方を進めました。

```bash:title=terminal
# Fetch deps.
$ git clone --recurse-submodules https://github.com/denoland/deno.git
$ cd deno
$ ./tools/setup.py

# Build.
$ ./tools/build.py
```

ここのどこかでErrorを吐かれた場合は適宜調べながら作業を進めてください。自分の場合rust installしていなくて`./tools/setip.py`がつまづきました。

## 実際に走らせてみる。
```bash:title=terminal
$ ./out/debug/deno tests/002_hello.ts
  Hello World
```
成功です！

## 感想
実はtwitterで少し前に自分のTLに回ってきて少し興味があったのですが、リアルが忙しく、今は落ち着いてきたのでぇということでやってみました。

deno自体がかなりプロトタイプレベルなので、これからどんな感じになっていくのかすごい楽しみです。

皆さんもぜひ触ってみてください。
