import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

import archiver from 'archiver';

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
  };
};

(async () => {
  // 現在のディレクトリを取得
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // 絵文字画像を取得して配列に格納
  const emojis: Emoji[] = [];
  try {
    // ディレクトリ内のファイルを取得
    const files = await fs.readdirSync(path.join(__dirname, 'emojis'));
    for (const fileName of files) {
      // 拡張子がjsonなら処理しない
      if (path.extname(fileName).endsWith('json')) continue;

      // 配列にメタデータを格納
      emojis.push({
        downloaded: true,
        fileName,
        emoji: {
          name: path.basename(fileName),
          category: '',
          aliases: [],
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
      path.join(__dirname, 'emojis', 'meta.json'),
      JSON.stringify(meta, null, 2)
    );
    console.log('メタデータを出力しました');
  } catch (err) {
    console.error(err);
  }

  // ZIPファイルに固める
  const output = fs.createWriteStream(path.join(__dirname, 'emojis.zip'));
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });
  output.on('close', () => {
    console.log('ZIPファイルを出力しました: ' + archive.pointer() + 'bytes');
  });
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      throw err;
    }
  });
  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.glob('*.{jpg,jpeg,png,gif,avif,webp,svg,json}', {
    cwd: path.join(__dirname, 'emojis'),
  });

  archive.finalize();
})();
