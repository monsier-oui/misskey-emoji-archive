import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

type Meta = {
  metaVersion?: number;
  host?: string;
  exportedAt?: string;
  emojis: Emoji[];
};

type Emoji = {
  downloaded: boolean;
  fileName: string;
  emoji: {
    id?: string;
    updatedAt?: string;
    name: string;
    host?: null;
    category: string;
    originalUrl?: string;
    publicUrl?: string;
    uri?: null;
    type?: string;
    aliases: string[];
    license: string;
    isSensitive: boolean;
    localOnly: boolean;
  };
};
(async () => {
  // 現在のディレクトリを取得
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // 絵文字画像を取得して配列に格納
  const emojis: Emoji[] = [];
  try {
    // ディレクトリ内のファイルを取得
    const files = await fs.readdirSync(path.join(__dirname, '/../emojis'));
    for (const fileName of files) {
      // 拡張子が画像以外なら処理しない
      if (!path.extname(fileName).match(/((jpe?g)|png|gif|avif|webp|svg)$/)) {
        continue;
      }

      // 配列にメタデータを格納
      emojis.push({
        downloaded: true,
        fileName,
        emoji: {
          name: path.basename(fileName, path.extname(fileName)),
          category: '',
          aliases: [''],
          license: '',
          isSensitive: false,
          localOnly: true,
        },
      });
    }
  } catch (err) {
    console.error(err);
  }

  // JSONファイルを出力
  const meta: Meta = {
    emojis,
  };
  try {
    fs.writeFileSync(
      path.join(__dirname, '/../emojis', 'meta.json'),
      JSON.stringify(meta, null, 2)
    );
    console.log('メタデータを出力しました');
  } catch (err) {
    console.error(err);
  }
})();
