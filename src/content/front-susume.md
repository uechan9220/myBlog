---
layout: page
title: "フロントのすゝめ ver1.0"
date: '2019-12-06'
featuredImage: ../images/front.png
---

#### Qiitaの記事を移行しました
Qiitaの方は[こちら](https://qiita.com/MokeeeMokeee/items/ca9912298d227d5c86f0)

[ABEJA Advent Calendar](https://adventar.org/calendars/4759)の6日目です。
5日目は[こちら](https://qiita.com/john_smith628/items/64eab0aa5a52f3ee158c)

# ご挨拶
おはござおはござー！(・ヮ・🌻)
いやーついにこの季節になりましたね。
だんだん寒くなり、風邪を引く季節になってきましたね。
お体には十分気をつけてください。
~~関係ないですが私は今年もクリスマスはぼっちです。~~

私はフロントエンドエンジニアとして活動をしてから早２年ぐらい経ちました。
最近はサークルに後輩も入りさらに活気づいた感じがします。

今回なのですが、
「webページを作ってみたい。」
「どんな風に作ってるの？」
「フロントわからない(にゃ〜ん)」
「美少女になりたい」
といろいろな意見をいただいたので、自分がやっている時にどんな手順でやっているのかを
簡単ではありますが、ご紹介させていただきたいと思います。

※今回は優しさMAXで行きますので、JSはanimationでのみになっています。API等の扱い方も説明だけしていこうと思いますので。気になる人は見ていってくダッシ。


## 環境
macOS Catalina ver 10.15.1
Node v13.0.0

今回作成する物のデザイン
<img  alt="スクリーンショット 2019-12-05 19.32.15.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/261479/e84073e1-8870-41d2-b8b1-6a4f14d99559.png">

今回はNuxt.jsでやっていきます。
インストール方法は[こちら](https://ja.nuxtjs.org/guide/installation/)
私は `yarn create nuxt-app` でやってます。

全てEnterで大丈夫です。

```bash:title=terminal
create-nuxt-app v2.12.0
✨  Generating Nuxt.js project in hogehoge
? Project name hogehoge
? Project description My stellar Nuxt.js project
? Author name MokeeeMokeee
? Choose the package manager Yarn
? Choose UI framework None
? Choose custom server framework None (Recommended)
? Choose Nuxt.js modules (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Choose linting tools (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Choose test framework None
? Choose rendering mode Universal (SSR)
? Choose development tools (Press <space> to select, <a> to toggle all, <i> to invert selection)
```

directory 構造

```bash:title=terminal
.
├── README.md
├── assets
│   └── README.md
├── components
│   ├── Logo.vue
│   └── README.md
├── layouts
│   ├── README.md
│   └── default.vue
├── middleware
│   └── README.md
├── node_modules
├── nuxt.config.js
├── package.json
├── pages
│   ├── README.md
│   └── index.vue
├── plugins
│   └── README.md
├── static
│   ├── README.md
│   └── favicon.ico
├── store
│   └── README.md
└── yarn.lock
```

説明の最後にコードを載せておきます。

## 1. 大枠を決めよう。:pick:
まず、divで囲めそうな所を探していきましょう。
大まかに囲めれば最初は構いません。
今回のデザインで言うと私だとこんな感じになります。
<img  alt="スクリーンショット 2019-12-05 19.43.55.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/261479/bc8dd3cf-acfa-ee4b-4d69-db759b125164.png">

`skill`の所は、同じものが続いているので、v-forなどで回した方がいいと言うことがわかります。
このようにまずどんな感じになるかをイメージをして、やっていきましょう。

コードだとこんな感じ。

```js:title=index.vue
<template>
  <div>
    <profile />
    <skills />
  </div>
</template>

<script>
import profile from "~/components/profile.vue"
import skills from "~/components/skills.vue"

export default {
  components:{
    profile,
    skills
  }
}
</script>



```

```html:title=profile.vue
<template>
  <div >
    <div >
      <!-- タイトル -->
    </div>
    <div>
      <div>
        <!-- 左profile画像 -->
      </div>
      <div>
        <!-- 右の文言らへん -->
      </div>
    </div>
  </div>
</template>
```

```html:title=skills.vue
<template>
  <div>
    <div>
      <!-- skillsタイトル -->
    </div>
    <div>
      <!-- skill一覧がある所。 v-forで回すので今はこのまま -->
    </div>
  </div>
</template>
```

## 2. 内容を書いていく。:coffee:
profileの方から仕上げていこうと思います。
profileのタイトルには、文言の他に画像が左についています。それも頭に入れたまま書きましょう。
profileの右の方には、名前と職業と説明文があります。これも三つに分かれていることをイメージしといてください。
まずはそれを踏まえて、書いていきましょう。
タイトルの部分はh2タグで、名前のところはh3タグでそれ以外はとりあえずpで書いときましょう。

※タイトルの左のiconは `~/assets/images/icons/`に入れてます。profile画像は、`~/assets/images`に入れてます。

```html:title=profile.vue
<template>
  <div>
    <div>
      <!-- 画像は好きなのをお使いください。SVGで予め大きさを合うものを持ってきてます。 -->
      <img src="~/assets/images/icons/perm_identity.svg" />
      <h2>Profile</h2>
    </div>
    <div>
      <div>
        <img
          src="~/assets/images/coffee-4648041__480.jpg"
        />
      </div>
      <div>
        <h3>†moke†</h3>
        <p>FrontEnd Engineer || Pizzzzaエンジニア</p>
        <p>
          私は専門学校に行きながら、FrontEnd Engineerをやらせていただいてます。ですが、自分はただのエンジニアでは無く、pizzaです。むしろ僕がpizzaです（)
          なぜpizzaなのかだって？
          <br />それは将来大切な人たちを助けるためですよ(支離滅裂
          <br />俺が食べ過ぎなんじゃなくて
          <br />ピザが美味しいのが罪なんだ。
          <br />
        </p>
      </div>
    </div>
  </div>
</template>
```

画面ではこんな感じになっているかと思います。
<img alt="スクリーンショット 2019-12-05 20.08.54.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/261479/15e3c69c-4a09-764e-c672-63dd745b3abe.png">

## 3. flexBoxを使って綺麗に並べていきましょう。
ここからはみなさんお待ちかねの、**flexBox**のお時間です。
ここからだいぶ作ってるなぁって感じが出てきます。

flexBoxのチート表は[こちら](https://www.webcreatorbox.com/tech/css-flexbox-cheat-sheet)

まずタイトルの方からやりましょう。
タイトルはiconが左に、タイトル名画右側にあるので囲んでいるdivに`display: flex`を書いてあげれば綺麗に並びます。
profileの画像と文言も左右に並んでるので `display: flex`を書いて並べてあげましょう。

```js:title=profile.vue
<template>
  <div>
    <div class="profileTitleBox">
      <!-- 画像は好きなのをお使いください。SVGで予め大きさを合うものを持ってきてます。 -->
      <img src="~/assets/images/icons/perm_identity.svg" />
      <h2>Profile</h2>
    </div>
    <div class="profileContentBox">
      <div>
        <img
          src="~/assets/images/coffee-4648041__480.jpg"
        />
      </div>
      <div>
        <h3>†moke†</h3>
        <p>FrontEnd Engineer || Pizzzzaエンジニア</p>
        <p>
          私は専門学校に行きながら、FrontEnd Engineerをやらせていただいてます。ですが、自分はただのエンジニアでは無く、pizzaです。むしろ僕がpizzaです（)
          なぜpizzaなのかだって？
          <br />それは将来大切な人たちを助けるためですよ(支離滅裂
          <br />俺が食べ過ぎなんじゃなくて
          <br />ピザが美味しいのが罪なんだ。
          <br />
        </p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile {
  &Title{
    &Box{
      display: flex;
    }
  }
  &Content{
    &Box{
      display: flex;
    }
  }

}
</style>

```

<img width="1434" alt="スクリーンショット 2019-12-06 9.51.53.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/261479/e7686785-e982-38df-4530-e8beb0dfe600.png">

## 4. 内容の細かいCSSを書いていこう。
flexBox以外の文字の大きさや画像の調整とかを行いましょう。
文字の大きさは、あとで使いまわせるといいので、どこでも読み込めるように `~/assets/scss/foundation` に `_main.scss`と名前をつけてよく使うものはの中に入れてあげましょう。

どこでも使えるscssを作成するために、`@nuxtjs/style-resources`を使います。
また、`nuxt.config.js`に設定をしてあげましょう。

```bash:title=terminal
$yarn add @nuxtjs/style-resources
```

```js:title=nuxt.config.js
export default {

  ~~色々書いてある。~~

  modules: [
    "@nuxtjs/style-resources"
  ],
  styleResources: {
    scss: [
      "~/assets/scss/foundation/_main.scss",
    ]
  }

  ~~色々書いてある。~~

}
```


よく使っているscssはこちらになります.

```scss:title=_main.scss
//font style//
$en_font-family: "Roboto";
// $ja_font-family: 'Noto Sans JP';
$ja_font-family: source-han-sans-japanese;
$font-color: #102a3a;

//Color//
$white: #ffffff;
$background: #f3f4f3;
$boundary: rgba(26, 36, 31, 0.1);
$white_boundary: rgba(255, 255, 255, 0.12);
$dark: #1a241f;
$black: #2e3734;
$gray: #a1aaa9;
$white_gray: #f2f3f2;
$dark_green: #0a5845;
$green: #058b63;
$light_green: #049f8d;
$orange: #e95136;
$link_blue: #0a47a3;
$alert_red: #dc0d3f;

//shadow//
$shadow_layer1: 0px 1px 28px rgba(16, 42, 58, 0.1),
  0px 2px 15px rgba(16, 42, 58, 0.15);
$shadow_layer2: 0px 1px 18px rgba(16, 42, 58, 0.17),
  0px 2px 8px rgba(16, 42, 58, 0.14);
$shadow_layer3: 0px 0px 13px rgba(16, 42, 58, 0.13),
  0px 1px 7px rgba(16, 42, 58, 0.17);

//English!!!!//
.en_display_main {
  font-family: $en_font-family;
  font-weight: 900;
  line-height: 56px;
  font-size: 56px;
  letter-spacing: 0.12px;
  color: $font-color;
}

.en_display_secondary {
  font-family: $en_font-family;
  font-style: normal;
  font-weight: 900;
  line-height: 48px;
  font-size: 45px;
  letter-spacing: 0.4px;
  color: $font-color;
}

.en_display_tertiary {
  font-family: $en_font-family;
  font-style: normal;
  font-weight: 900;
  line-height: 40px;
  font-size: 34px;
  letter-spacing: 0.6px;
  color: $font-color;
}

.en_headline {
  font-family: $en_font-family;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  font-size: 24px;
  color: $font-color;
}

.en_title {
  font-family: $en_font-family;
  font-style: normal;
  font-weight: bold;
  line-height: 32px;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: $font-color;
}

.en_button {
  font-family: $en_font-family;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
  font-size: 14px;
  letter-spacing: 0.16px;
  text-transform: uppercase;
  color: $font-color;
}

.en_body_main {
  font-family: $en_font-family;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
  font-size: 14px;
  letter-spacing: 0.16px;
  color: $font-color;
}

.en_body_secondary {
  font-family: $en_font-family;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  font-size: 14px;
  letter-spacing: 0.16px;
  color: $font-color;
}

.en_caption {
  font-family: $en_font-family;
  font-weight: normal;
  line-height: 20px;
  font-size: 12px;
  letter-spacing: 0.32px;
  color: $font-color;
}

.en_subheding {
  font-family: $en_font-family;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  font-size: 15px;
  letter-spacing: 0.16px;
  color: $font-color;
}

//Japan!!!!//
.ja_display_main {
  font-family: $en_font-family, $ja_font-family;
  line-height: 56px;
  font-size: 56px;
  letter-spacing: 0.08px;
  color: $font-color;
}

.ja_display_secondary {
  font-family: $en_font-family, $ja_font-family;
  line-height: 48px;
  font-size: 45px;
  color: $font-color;
}

.ja_display_tertiary {
  font-family: $en_font-family, $ja_font-family;
  line-height: 40px;
  font-size: 34px;
  color: $font-color;
}

.ja_headline {
  font-family: $en_font-family, $ja_font-family;
  line-height: 32px;
  font-size: 24px;
  color: $font-color;
}

.ja_title {
  font-family: $en_font-family, $ja_font-family;
  line-height: 32px;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: $font-color;
}

.ja_subheading {
  font-family: $en_font-family, $ja_font-family;
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.16px;
  color: $font-color;
}

.ja_headline {
  font-family: $en_font-family, $ja_font-family;
  line-height: 32px;
  font-size: 24px;
  color: $font-color;
}

.ja_title {
  font-family: $en_font-family, $ja_font-family;
  line-height: 32px;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: $font-color;
}

.ja_button {
  font-family: $en_font-family, $ja_font-family;
  line-height: 24px;
  font-size: 14px;
  letter-spacing: 0.16px;
  text-transform: uppercase;
  color: $font-color;
}

.ja_body_main {
  font-family: $en_font-family, $ja_font-family;
  line-height: 24px;
  font-size: 14px;
  letter-spacing: 0.16px;
  color: $font-color;
}

.ja_body_secondary {
  font-family: $en_font-family, $ja_font-family;
  line-height: 20px;
  font-size: 14px;
  letter-spacing: 0.16px;
  color: $font-color;
}

.ja_caption {
  font-family: $en_font-family, $ja_font-family;
  line-height: 20px;
  font-size: 12px;
  letter-spacing: 0.32px;
  color: $font-color;
}

.ja_subheading {
  font-family: $en_font-family, $ja_font-family;
  line-height: 24px;
  font-size: 15px;
  letter-spacing: 0.16px;
  color: $font-color;
}

.ja_text {
  font-family: $en_font-family, $ja_font-family;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
}

.main_title {
  font-family: $en_font-family, $ja_font-family;
  font-weight: bold;
  font-size: 52px;
  line-height: 75px;
}

a {
  text-decoration: none !important;
  text-decoration: none !important;
}

* {
  &::-webkit-scrollbar {
    display: none;
  }
}

body {
  font-family: $en_font-family, $ja_font-family;
}

```

profile.vueは最終的にはこんな感じになるかと思います。

```js:title=profile.vue
<template>
  <div>
    <div class="profileTitleBox">
      <!-- 画像は好きなのをお使いください。SVGで予め大きさを合うものを持ってきてます。 -->
      <img src="~/assets/images/icons/perm_identity.svg" />
      <h2 class="main_title" style="margin: 0 0 0 8px;">Profile</h2>
    </div>
    <div class="profileContentBox">
      <div class="profileImageBox">
        <img class="profileImage" src="~/assets/images/coffee-4648041__480.jpg" />
      </div>
      <div class="profileTextBox">
        <h3 class="ja_display_secondary profileTextName">†moke†</h3>
        <p class="profileTextJob ja_headline">FrontEnd Engineer || Pizzzzaエンジニア</p>
        <p class="profileText ja_text">
          私は専門学校に行きながら、FrontEnd Engineerをやらせていただいてます。
          ですが、自分はただのエンジニアでは無く、pizzaです。むしろ僕がpizzaです（)
          なぜpizzaなのかだって？
          <br />それは将来大切な人たちを助けるためですよ(支離滅裂
          <br />俺が食べ過ぎなんじゃなくて
          <br />ピザが美味しいのが罪なんだ。
          <br />
        </p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile {
  &Title {
    &Box {
      display: flex;
      justify-content: center;
    }
  }
  &Content {
    &Box {
      @media screen and (min-width: 767px) {
        display: flex;
        flex-wrap: nowrap;
      }
      margin: 56px 0;
      padding: 0 16px;
    }
  }
  &Image {
    @media screen and (min-width: 767px) {
      min-height: 260px;
      min-width: 260px;
    }
    width: 100%;
    border-radius: 90px;
    &Box {
      min-width: 260px;
    }
  }
  &Text {
    line-height: 26px;
    &Box {
      @media screen and (min-width: 767px) {
        padding: 0 0 0 48px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    &Job {
      margin: 24px 0;
    }
    &Name{
      @media screen and (max-width: 768px) {
        text-align: center;
        margin: 24px;
      }
    }
  }
}
</style>

```

## 5. ごめん...
これめっちゃ長いので、下の部分は別の日のアドベントカレンダーにします。

とりあえず今回でProfile出来ましたね。
(cssクソなのは見逃してくれ...ベストプラクティスわかる方コメントで書いてくれるとありがたいっす)





