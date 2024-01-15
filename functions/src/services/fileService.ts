import * as fs from "fs";
import * as admin from "firebase-admin";
import * as markdownpdf from "markdown-pdf";

import { IResultFile, ISaveFile } from "../models/file";

class FileService {
  async createPDFromMarkdown(
    fileName: string,
    content: string
  ): Promise<string> {
    const mdFilePath = `temp/${fileName}.md`;
    const pdfFilePath = `temp/${fileName}.pdf`;

    fs.writeFileSync(mdFilePath, content);

    return new Promise((resolve, reject) => {
      fs.createReadStream(mdFilePath)
        .pipe(markdownpdf())
        .pipe(fs.createWriteStream(pdfFilePath))
        .on("finish", () => {
          fs.unlinkSync(mdFilePath);

          resolve(pdfFilePath);
        })
        .on("error", reject);
    });
  }

  saveFileInStorage(
    dataFile: ISaveFile
  ): Promise<IResultFile> {
    return new Promise((resolve, reject) => {
      const bucket = admin.storage().bucket();
      const fileExtension = `.${dataFile.originalFilename.split(".").pop()}`;
      const fileName = dataFile.cloudPath;
      const file = bucket.file(fileName);

      const stream = file.createWriteStream({
        metadata: { contentType: dataFile.mimeType },
      });

      stream.on("error", () => {
        reject(new Error("Error while uploading the file"));
      });

      stream.on("finish", () => {
        resolve({
          remoteLocation: file.name,
          fileExtension,
        });
      });

      fs.readFile(dataFile.filePath, (readErr, buffer) => {
        if (readErr) {
          reject(new Error("Error reading the file."));
        }
        stream.end(buffer);
      });
    });
  }

  async getFileFromStorage(filePath: string): Promise<any> {
    const tempFilePath = `/tmp/${filePath.split("/").pop()}`;
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);
    await file.download({ destination: tempFilePath });

    return {
      ...file,
      filePath: tempFilePath,
    };
  }
}

export default new FileService();
