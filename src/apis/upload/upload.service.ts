import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/upload-service.interface';
import { Storage } from '@google-cloud/storage';
@Injectable()
export class UploadService {
  private readonly bucketname: string;

  constructor() {
    this.bucketname = process.env.BUCKET_NAME;
  }

  async upload({ file }: IFilesServiceUpload) {
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEY_FILE_NAME,
    }).bucket(this.bucketname);

    return new Promise((resolve, reject) =>
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${this.bucketname}/${file.filename}`;
          resolve({ publicUrl });
        })
        .on('error', (error) => {
          reject(error);
        }),
    );
  }
}
