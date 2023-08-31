import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

import archiver from 'archiver';
(async () => {
  // 現在のディレクトリを取得
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // ZIPファイルに固める
  const output = fs.createWriteStream(path.join(__dirname, '/../emojis.zip'));
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
    cwd: path.join(__dirname, '/../emojis'),
  });
  archive.finalize();
})();
