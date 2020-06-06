---
layout: page
title: 'github.ioを使ってMySiteを作ろう'
date: '2018-06-28'
featuredImage: ../images/github.png
---

#### Qiitaの記事を移行しました
Qiitaの方は[こちら](https://qiita.com/MokeeeMokeee/items/4b33691b829aaf119bbf)

## 初めまして。

最近Qiita始めて、自己紹介でも投稿しようと思いました。

ですが、ここは**Qiita**。

どうせなら技術系な事でも書きながら自己紹介でもしようという事で今回の記事に至ります。

※注意事項
`GitHubのアカウントを持っている。
　html,css,JSの知識がある。
`
以上の２点はすでに用意してあるという事で話を進めさせていただきます。

では、さっそく本題に入っていきましょう。

# github.ioとは？？
githubにindex.htmlを送る事で簡単に自分のサイトを作る事ができるといった感じです。

今回自分が作った奴のリンクを貼っときますので、もしよかったら見てください
~~twitterフォローして下さい。なんでもしますから。~~

[MokeeeMokeee.github.io](https://mokeeemokeee.github.io)

# 作り方
まずNewRepositoryを作成しましょう

`[username].github.io`という名前で作りましょう。

[username]の所は自分のGitHubの名前にしましょう。

自分の場合は`MokeeeMokeee.github.io`になります。

![gtihub.io.image.png](https://qiita-image-store.s3.amazonaws.com/0/261479/2f41156f-ffb4-bdb5-5a5b-96f290897ea7.png)


そしたら次はindex.htmlを作りましょう。
terminalでのやり方を載せときます。

```bash:title=terminal
$ cd
$ mkdir github.io
$ cd github.io
$ vim index.html
```
今回はホームディレクトリにgithub.ioというディレクトリを作成し、その中にindex.htmlという名前でvimで作成しました。

やり方はなんでもいいのですが、あとで`add`と`commit`したり`css`を使う人はわかりやすいところにディレクトリを作り、その中で作業するとわかりやすいと思います。

```html:title=index.html
<html>
  <head>
    <meta charset='utf-8'>
    <title>タイトル</title>
  </head>
  <body>
    <!-- ここに書きたい内容を書く -->
  </body>
</html>
```

あとはhtmlの書き方をすれば大丈夫です。

cssを使用する場合も`link`を使って参照すればcssを読み込ませることもできます。

また、動的なWebページを作りたい場合はJSも参照させたりすれば使えます。
※JSに関してはServerに依存する処理を行うものはできない場合があります

```bash:title=terminal
$ git add index.html
$ git commit -m "commit Messege"
$ git remote add origin https://github.com/[UserName]/[UserName].github.io.git
$ git push origin master
```

terminalの方で作成した`index.html`をadd,commitを行いました。

詳しいやり方はNewRepositoryを作成した時にコマンドが書いてあるので、それを参照して下さい。

![github.io.image.2.png](https://qiita-image-store.s3.amazonaws.com/0/261479/b4733a58-4fb8-51ee-0150-cf04923b5746.png)

pushできているかを確認しましょう。
※　自分は画像とCSSを使用しているので画像のようになっています。`index.html`のみをadd,commit,pushした場合はindex.htmlが表示されているはずです。

それでは、最後にChrome,firefoxなどを開いてURLを打ってみましょう

URL = **UserName.github.io** と入力
※ 自分の場合は`MokeeeMokeee.github.io`

そしたら表示されましたか？

これで完成です！！

あとは自分のお好みでカスタムなどを行なって自分だけのサイトを作って見て下さい！！！！

# おわりに
いかがだったでしょうか？
自分はgithub.ioを知るまでクラウドでサーバを借りてやってたり...
本当に楽です！！

Qiitaを書くのは初めてでどうすれば見やすいか？
わかりやすい書き方はどんな感じか？
など、まだまだ課題はいっぱいありますが温かく見守ってくれればと思います。

よろしくお願いします:innocent:
