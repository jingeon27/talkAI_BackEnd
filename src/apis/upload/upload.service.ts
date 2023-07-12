import { Injectable } from '@nestjs/common';
import {
  IFilesServiceUpload,
  IFilesServiceUploadRespose,
} from './interfaces/upload-service.interface';
import { Storage } from '@google-cloud/storage';
import axios from 'axios';

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

    return new Promise<IFilesServiceUploadRespose>((resolve, reject) =>
      axios.get(file).then((res) => {
        const data = Buffer.from(res.data, 'base64');

        return storage
          .file('example.png')
          .createWriteStream()
          .on('finish', () => {
            console.log();
            const profile = `https://storage.googleapis.com/${
              this.bucketname
            }/${'example.png'}`;
            resolve({ profile });
          })
          .on('error', (error) => {
            reject(error);
          })
          .end(data);
      }),
    );
  }
}
