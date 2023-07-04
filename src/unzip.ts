import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

import unzipper from 'unzipper';

(async () => {
  // 現在のディレクトリを取得
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // 解凍する
  fs.createReadStream(`${__dirname}/../emojis.zip`).pipe(
    unzipper.Extract({ path: 'output' })
  );
})();
