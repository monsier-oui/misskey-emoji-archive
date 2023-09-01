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
4. 必要に応じて`npm run imagemin`コマンドで画像を最適化します
5. `npm run archive`コマンドでemojis.zipを出力します
6. Misskeyのカスタム絵文字管理画面右上の「…」＞インポート＞emojis.zipをアップロードします。しばらくたってリロードすると絵文字が追加されています

### メタデータについて

meta.jsonは下記のような構造で書かれています。このスクリプトはファイル名と絵文字名を自動で出力するので、他の項目は手動で入力する必要があります。出力は変更日(mdate)順です。

```json
{
  "emojis": [
    {
      "downloaded": true,
      "fileName": "emoji.png",
      "emoji": {
        "name": "emoji",
        "category": "",
        "aliases": [""],
        "license": "",
        "isSensitive": false,
        "localOnly": true
      }
    },
  ]
}
```