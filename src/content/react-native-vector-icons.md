---
layout: page
title: 'react-native-vector-icons実装方法'
date: '2020-05-22'
featuredImage: ../images/react-navigation.png
---

# あいさつ

今回はReactNativeで `react-navigation/bottom-tabs` を使ってアプリを作っている時にアイコンの実装で `react-native-vector-icons` を使用しているのですが公式Documentのやり方をそのままやると出来なかったので(もしかしたら見落としてるかも。。。)その際の対策等を伝えればと思います。

## 環境

- ReactNative: 0.62.2
- TypeScript: ^3.8.3
- react-navigation: ^4.3.9
- react-navigation/bottom-tabs": ^5.4.7
- react-navigation/native": ^5.4.2
- react-navigation/stack": ^5.3.9
- react-native-vector-icons: ^6.6.0
- @types/react-native-vector-icons: ^6.4.5


## 説明

ではまずは `react-native-vector-icons` を入れる前の状態を出します。

```js:title=App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import HomeStackScreen from './screens/HomeStackScreen';
import SettingStackScreen from './screens/SettingStackScreen';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

これが `react-native-vector-icons` を実装する前のApp.tsxになります。

実装は公式Document通りに進みますので、[React Navigation公式Document](https://reactnavigation.org/docs/tab-based-navigation/)の方を参照してください。

この段階で出たError等は自分の環境に合わせて順次書き直して行ってください。


## react-native-vector-iconsの実装

次に本命の `react-native-vector-icons`  を入れます。

```bash:title=terminal
$ npm install react-native-vector-icons @types/react-native-vector-icons
or
$ yarn add react-native-vector-icons @types/react-native-vector-icons
```

今回はTypeScriptを使っているので `@types/react-native-vector-icons` も入れています。

今回は `MaterialCommunityIcons` を使っていきます。

今回は普通に入れただけでは使えませんので自分で　fontの設定をしていきます。

自分で設定するか否かは `react-native-vector-icons` のバージョンによって変わります。

### 0.59以下の場合

以下のコマンドを打てばライブラリをリンクする為これで使えるかと思います。

```bash:title=terminal
$ react-native link react-native-vector-icons
```

### 0.6以上の場合

今回は自分はこのやり方をやりました。

まずXcodeで今回のプロジェクトの `ios/[project名].xcworkspace` 開いてください。

以下の手順で作業を行ってください。

1. Project名の直下に `Fonts` という名前でディレクトリを作成してください。

![](https://i.imgur.com/Wr4S1ZM.png)


2. `[project]/node_modules/react-native-vector-icons/Fonts/` にある `.ttf` 拡張子の物を全て先ほど作った `Fonts` にコピーしてください。（特に問題なければ `react-native-vector-icons/Fonts/` にある全てをコピーすればいいです。

![](https://i.imgur.com/AKgvN7V.png)


3. `ios/[project名]/info.plist` に `UIAppFonts`  というKeyで追加してあげた物を書いてあげましょう

```xml:title=info.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>

	...

	  <key>UIAppFonts</key>
  <array>
    <string>AntDesign.ttf</string>
    <string>Entypo.ttf</string>
    <string>EvilIcons.ttf</string>
    <string>Feather.ttf</string>
    <string>FontAwesome.ttf</string>
    <string>FontAwesome5_Brands.ttf</string>
    <string>FontAwesome5_Regular.ttf</string>
    <string>FontAwesome5_Solid.ttf</string>
    <string>Foundation.ttf</string>
    <string>Ionicons.ttf</string>
    <string>MaterialCommunityIcons.ttf</string>
    <string>MaterialIcons.ttf</string>
    <string>Octicons.ttf</string>
    <string>SimpleLineIcons.ttf</string>
    <string>Zocial.ttf</string>
    <string>Fontisto.ttf</string>
  </array>

</dict>
</plist>
```

4. 最後に `cmd + shift + k` で `Clean Build Folder` してください。

#### 参考サイト
ここら辺の実装は、ヤクザ様の[react-native-vector-iconsライブラリを使ってアイコンを表示して見ましょう。](https://dev-yakuza.github.io/react-native/react-native-vector-icons/)を大変参考にさせていただきました。

この場を借りて感謝申し上げます。

### 最終仕上げ

入れた終わった後のコードが以下の様になります。

```js:title=App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import HomeStackScreen from './screens/HomeStackScreen';
import SettingStackScreen from './screens/SettingStackScreen';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

追加したのは `import Icon from 'react-native-vector-icons/MaterialCommunityIcons';` と `Tab.Navigator` の所になります。

実装自体はこれで出来ているかと思います。

この後は自分の実装とDocumentの差異について説明していきます。

Documentの方では `Ionicons` を使用しているかと思いますが、なぜそちらを使用しないのかをアイコンの探し方と混ぜて説明します。


## 使いたいIconの探し方

基本的には公式の方で用意している物を見ながら探していきます。

- サイトのURL: [react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/)

検索のところに自分使いたいIconの名前を入れると出てきます。

今回は `home` と入力してみます。

そうすると、homeと名前のつくものが幾つが出てくるかと思います。

![](https://i.imgur.com/vO2uqWz.png)

写真の物だと `Feather` では１つだが、 `FontAwesome` では２つと言った様に使うFontによって使える物のデザインや数が違ったりします。

では `MaterialCommunityIcons` はどうなのかといいますと

![](https://i.imgur.com/fsCT6yV.png)

これだけの数を扱うことができるので、今回は `MaterialCommunityIcons` をしようしました。

他のものを使いたい時には　`import Icon from 'react-native-vector-icons/xxxxxxx';`

xxxxxxxのところに自分の使いたいFont名を入れるといいです。

### まとめ

いかがだったでしょうか？

自分は `Ionicons` がうまく実装できず、調べていてもいまいちピンとくる記事がなかったので今回描いてみました。

自分と同じような境遇の人や、これから実装を考えている人に参考になればと思います。

なにかご意見などがございましたら、[自分のTwitter](https://twitter.com/uechan9220)に連絡くれればと思います。
