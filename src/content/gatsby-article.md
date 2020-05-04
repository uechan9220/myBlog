---
layout: page
title: 'GatsbyでHighlightの実装方法と注意点'
date: '2020-05-04'
featuredImage: ../images/GatsbyLogo.png
---

# あいさつ

今回は Blog を作成するときに起きた注意点をまとめて行こうかと思います。

## 対象

- markdown で記事を書いている人
- Highlight を実装したい
- Highlight は構築出来たけど FileName をうまく表示出来ない人

## 説明

今回は MarkDown で記事を書いている人が記事の中でソースコードを書きたい人を対象に Hightlight の構築のやり方を記事にしていこうと思います。

現在(2020/05/03)ではこの実装のやり方で導入する事が出来たので、参考になればとは思います。

では、

> Highlight は構築出来たけど FileName をうまく表示出来ない人

とはどうゆうことなのかと言いますと

```js
console.log('Hello')
```

は実装できたけど

```js:title=index.js
console.log('Hello')
```

といったように左上の方に File 名が出ない人の対処法に関しても記事にしていこうと思っています。

(実際に自分がこれが実装がうまくいかなかったので記事にしました)

## Hightlight 実装方法

まず初めに記事に Hightlight の実装方法について紹介をさせて頂きます。

今回は

- prismjs
- gatsby-remark-prismjs

の２つのプラグインを使用していきます。

### install

こちらを yarn(npm)を使ってインストールしてください

```bash:title=terminal
$ yarn add prismjs gatsby-remark-prismjs
$ (npm install prismjs gatsby-remark-prismjs)
```

※ gatsby-starter-blog を使用している方はプラグインがすでに導入されており、設定も済んでいるかと思いますのでインストール作業は大丈夫です。

### gatsby-config.js に設定

```js:title=gatsby-config.js
module.exports = {
  ...
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // ↓ここに追加
          'gatsby-remark-prismjs`,
          ...
        ]
      }
    }
    ...
  ]
}
```

`gatsby-transformer-remark` にある options の Plugins に追加してあげましょう。

### theme の適用方法

`gatsby-browser.js` に適用させたい theme を import してあげましょう。

今回は `prism-tomorrow.css` を適用しています。

(自分の中では一番しっくり来ています)

テーマ一覧はこちらの[公式ページ](https://prismjs.com/)を参考に選びましょう。

右柄の丸いやつをクリックすると Examples がそれに対応した theme に変わるので自分のお気に入りを見つけて import しましょう。

```js:title=gatsby-browser.js
import 'prismjs/themes/prism-tomorrow.css'
```

これで Highlight はうまくいったかと思います。

````
```js
console.log('Hello')
`` `

````

(下の三つに隙間が空いているのは表示がおかしくなるのでわざと開けてます。実際にはちゃんと詰めてかいてください。)

こうすると

```js
console.log('Hello')
```

と表示されるはずです。

Hightlight の実装は以上になります。

## Title の導入

せっかく書いたコードを、どこの file で書いたのかをすぐにわかるようにするためにも導入するのがいいかと思います。

なお実装方法に関しては [キクナントカ様](https://kikunantoka.com/2019/12/15--install-code-title-with-gatsby-remark-prismjs-title/)の記事を大変参考にさせて頂きました。

この場を借りて感謝申し上げます。

自分で実装してみようと調べると `gatsby-remark-code-titles` という Plugin が出てきてそれで実装仕様とすると参考記事にも書いてある通り Title の方が表示されません。

なぜうまく表示されないのかは [キクナントカ様](https://kikunantoka.com/2019/12/15--install-code-title-with-gatsby-remark-prismjs-title/)の記事の方にわかりやすく解説してあるため割愛させて頂きます

今回は

- gatsby-remark-prismjs-title

プラグインを使用していきます。

### install

こちらを yarn(npm)を使ってインストールしてください

```bash:title=terminal
$ yarn add gatsby-remark-prismjs-title
$ (npm install gatsby-remark-prismjs-title)
```

### gatsby-config.js に設定

```js:title=gatsby-config.js
module.exports = {
  ...
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // ↓ここに追加
          `gatsby-remark-prismjs-title`,
          'gatsby-remark-prismjs`,
          ...
        ]
      }
    }
    ...
  ]
}
```

### css の追加

class 名は `gatsby-code-title` で設定してあげましょう。

自分は以下のような css を設定しています

```css:title=css
.gatsby-code-title {
  display: block;
  position: relative;
  background: #272822;
  width: 100%;
  top: 10px;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}

.gatsby-code-title span {
  display: inline;
  position: relative;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  color: #eee;
  background: #777;
  border-top-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
  padding: 3px;
  top: 1px;
}
```

Titleを付ける場合は `:title=` の後に付けたい名前を付けます。

````
```js:title=index.js
console.log('Hello')
`` `

````

(下の三つに隙間が空いているのは表示がおかしくなるのでわざと開けてます。実際にはちゃんと詰めてかいてください。)

こうすると

```js:title=index.js
console.log('Hello')
```

と表示されます。


## まとめ

いかがだったでしょうか？

実際に自分が実装するときに困ったので(主にTitle表示)
自分と同じような境遇の人や、これから実装を考えている人に参考になればと思います。

なにかご意見などがございましたら、[自分のTwitter](https://twitter.com/uechan9220)に連絡くれればと思います。
