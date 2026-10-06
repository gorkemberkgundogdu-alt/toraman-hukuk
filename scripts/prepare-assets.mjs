import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const destination = resolve('public/images');
await mkdir(destination, { recursive: true });
const portraits = [
  ['tugrul', 'C:/Users/HP/Downloads/IMG_8306.PNG'],
  ['efe', 'C:/Users/HP/Downloads/WhatsApp Image 2026-10-05 at 16.12.32.jpeg'],
  ['dogukan', 'C:/Users/HP/Downloads/IMG_8307.PNG'],
  ['senay', 'C:/Users/HP/Downloads/IMG_8308.PNG'],
  ['sevilay', 'C:/Users/HP/Downloads/IMG_8310.PNG'],
];
for (const [name, source] of portraits) {
  await sharp(source).rotate().resize(700, 900, { fit: 'cover', position: 'attention' }).webp({ quality: 84 }).toFile(resolve(destination, `${name}.webp`));
}
await copyFile('C:/Users/HP/Downloads/WhatsApp Image 2026-10-05 at 16.20.17.jpeg', resolve(destination, 'logo.jpeg'));
// Preserve the supplied monochrome mark while making its white paper transparent.
const { data, info } = await sharp(resolve(destination, 'logo.jpeg')).greyscale().raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
for (let index = 0; index < data.length; index++) rgba[index * 4 + 3] = 255 - data[index];
await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(resolve(destination, 'logo.png'));
console.log('Prepared five optimized portraits and the original logo.');
