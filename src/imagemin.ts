import path from 'node:path';
import { fileURLToPath } from 'node:url';

import imagemin from 'imagemin';
import optipng from 'imagemin-optipng';
import gifsicle from 'imagemin-gifsicle';

// 現在のディレクトリを取得
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const emojisDir = path.join(__dirname, '/../emojis');

await imagemin([`${emojisDir}/*.{png,gif}`], {
  destination: `${emojisDir}`,
  plugins: [
    optipng({
      optimizationLevel: 3,
    }),
    gifsicle({
      optimizationLevel: 2,
    }),
  ],
});
