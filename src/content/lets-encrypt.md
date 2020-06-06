---
layout: page
title: "Let's Encryptをcrontabで自動化した時に実行されない時の対処法"
date: '2018-08-18'
featuredImage: ../images/le-logo-standard.png
---

#### Qiita の記事を移行しました

Qiita の方は[こちら](https://qiita.com/MokeeeMokeee/items/3c8662b04695c8233673)

# Let's Encrypt とは

日本語ではレッツ・エンクリプトと読みます。無料ですぐに利用可能な SSL サーバー証明書で、アメリカの非営利団体 ISRG (Internet Security Research Group) が、2016 年から提供しているサービスです。
それまで SSL といえば個人情報を入力するフォームなどには必要な手段にもかかわらず、高く(数万円～数十万円)、手続きが面倒でした。ところが Let’s Encrypt 誕生のおかげで誰でも、いつでも、かなり簡単に SSL が利用できるようになります。画期的なサービスの登場です。
この記事ではわかりやすくするために、単に「SSL」と表記していますが、実際は少し複雑です。より詳しくお知りになりたい方は、下記の記事をご覧ください。

## 環境

Apache/2.4.33
aws-cli/1.14.8 Python/2.7.14 Linux/4.14.42-61.37.amzn2.x86_64 botocore/1.8.12

## crontab を使用した自動化

```bash:title=terminal
# vim /etc/cron.d/letsencrypt
```

```bash:title=/etc/cron.d/letsencrypt
00 16 * * 2 root /usr/bin/certbot-auto renew --post-hook "service httpd restart"
```

※この書き方だと毎週火曜日の 16:00 に実行されるようになっています。
詳しいことは[Let's Encrypt](https://letsencrypt.jp/)の方を参照してください。

これで上手くいけばなんも心配はないのですが。
ここからは Let's Encrypt を自動化しようとした時に見るべき項目を書いていこうと思います

## トラブルシューティング

### (1)cron がそもそも動いているのか

```bash:title=terminal
# /etc/rc.d/init.d/crond status
crond (pid  xxxx) を実行中...
```

### (2)runlevel に合わせて on になっているか

(2~5 が on になっていれば ok)

```bash:title=terminal
# chkconfig --list crond
crond           0:off   1:off   2:on    3:on    4:on    5:on    6:off
```

### (3)Path がしっかりしているか。（自分はこれが原因でした。）

```bash:title=terminal
# echo $PATH
/opt/rh/python27/root/usr/bin:/usr/local/rbenv/shims:/usr/local/rbenv/bin:/usr/local/sbin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```

```bash:title=/etc/cron.d/letsencrypt
PATH=/opt/rh/python27/root/usr/bin:/usr/local/rbenv/shims:/usr/local/rbenv/bin:/usr/local/sbin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
00 16 * * 2 root /usr/bin/certbot-auto renew --post-hook "service httpd restart"
```

※Path は自分の環境に合わせて変更の方してください。

### (4)それでもダメなら log で確認してみてください。

```bash:title=terminal
# touch /tmp/analog.log && touch /tmp/analog-err.log
```

```bash:title=/etc/cron.d/letsencrypt
00 16 * * 2 root /usr/bin/certbot-auto renew --post-hook "service httpd restart" >>/tmp/analog.log 2>>/tmp/analog-err.log
```

これで作成した。analog.log と analog-err.log を確認してみましょう。

##　まとめ
いかがだったでしょうか？
自分が主に思いつく解決方法や起こりうるトラブルを書きました。
何か質問や気になる事があれば Twitter などでも良いので声をかけてくれれば、出来る範囲で対応します。

```js:title=TwitterID
@uechan9220
```
