---
layout: page
title: 'ArchLinuxでLineを使えるように！'
date: '2017-07-09'
featuredImage: ../images/deno.png
---

#### はてなブログの記事を移行しました

はてなブログの方は[こちら](http://moke0922.hatenablog.jp/entry/2017/09/07/163217)

## みなさんこんばんは！！！

今回は Archlinux で Line が使えるようにしようと思います

Archlinux で Line を使うに当たって Wine というのを使ってやります。

※wine とは windows 系のソフトを linux で動くようにする物という解釈大丈夫です。

最初に wine がダウンロードできるように設定します。

```bash:title=terminal
$ vim /etc/pacman.conf
```

vim でなくても構いません。お好きなテキストエディタをお使い下さい。

この中にある。[multilib]を見つけて

```bash:title=pacman.conf
Include = /etc/pacman.d/mirrorlist
```

となるように、修正または追加しましょう。

それでは早速 pacman を使って wine をダウンロードしましょう。

```bash:title=terminal
$ sudo pacman -S wine winetricks
```

これでとりあえず wine が入ります。

文字化け防止のために

```bash:title=terminal
$ sudo cp /usr/share/fonts/TTF/\*.ttf ~/.wine/drive_c/windows/Fonts
```

とコマンドを打ちましょう。

次に以下の URL から windows 版の方をダウンロードしましょう。

http://line.me/ja/download

Line でちゃんと日本語が表示されるようにするために以下のコマンドを打ちましょう

```bash:title=terminal
$ winetricks allfonts
$ winetricks vcrun2008
```

出来ましたか？できたら早速実行してみましょう。

Line.exe が入っているディレクトリに移動して、以下のコマンドを入力して下さい。

```bash:title=terminal
$ wine LineInst.exe
```

入力したら Line のインストール画面に移ります。

進めていくと Line が使えるようになります！！！

また、ぼちぼち更新していこうと思います。
