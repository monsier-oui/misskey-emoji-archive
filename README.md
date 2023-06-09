# README
Misskeyへ絵文字を一括登録するためのZIPアーカイブを出力するスクリプトです。

## はじめに

### 必要なもの

- Node.js

### 準備

1. `npm ci`コマンドで依存パッケージをインストールします

### 手順

1. `emojis`ディレクトリへ追加したいカスタム絵文字画像をコピーします。ファイル名が絵文字名になります。
2. `npm run meta`コマンドでmeta.jsonを出力します
3. meta.jsonへ必要な情報を記入します
4. `npm run archive`コマンドでemojis.zipを出力します
5. Misskeyのカスタム絵文字管理画面右上の「…」＞インポート＞emojis.zipをアップロードします。しばらくたってリロードすると絵文字が追加されています

### メタデータについて

meta.jsonは下記のような構造で書かれています。このスクリプトはファイル名と絵文字名を自動で出力するので、カテゴリーとエイリアス（タグ）を手動で記入する必要があります。下記の例のように、赤字から緑字に書き換えます。

```diff
  {
    "emojis": [
      {
        "downloaded": true,
        "fileName": "emoji.png",
        "emoji": {
          "name": "emoji",
-         "category": "",
+         "category": "カテゴリー",
          "aliases": [
-           ""
+           "絵文字"
          ]
        }
      }
    ]
  }
```