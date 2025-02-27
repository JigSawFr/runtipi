import fs from 'node:fs';
import zlib from 'node:zlib';
import { extract, pack } from 'tar-fs';

export class ArchiveManager {
  createTarGz = async (sourceDir: string, destinationFile: string) => {
    return new Promise<void>((resolve, reject) => {
      pack(sourceDir).pipe(zlib.createGzip()).pipe(fs.createWriteStream(destinationFile)).on('finish', resolve).on('error', reject);
    });
  };

  extractTarGz = async (sourceFile: string, destinationDir: string) => {
    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(sourceFile).pipe(zlib.createGunzip()).pipe(extract(destinationDir)).on('finish', resolve).on('error', reject);
    });
  };
}
