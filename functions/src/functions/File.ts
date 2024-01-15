import * as express from "express";
import * as formidable from "formidable";
import { Request, Response } from "express";
import { error } from "firebase-functions/logger";

import fileService from "../services/fileService";
import { ISaveFile } from "../models/file";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", (req: Request, res: Response) => {
  const form = new formidable.IncomingForm();

  new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ message: "Error processing the form." });
      } else if (!files.file) {
        reject({ status: 400, message: "No file was sent." });
      } else {
        resolve(files.file[0]);
      }
    });
  })
    .then((dataFile: formidable.File) => {
      const fileExtension = `.${dataFile.originalFilename.split(".").pop()}`;
      const fileInfo = {
        originalFilename: dataFile.originalFilename,
        newFilename: dataFile.newFilename,
        mimeType: dataFile.mimetype,
        filePath: dataFile.filepath,
        cloudPath: `data/${dataFile.newFilename}${fileExtension}`,
      } as ISaveFile;

      fileService.saveFileInStorage(fileInfo)
        .then((data) => res.status(200).send(data))
        .catch((err: Error) => {
          throw err;
        });
    })
    .catch((err) => {
      error(error);
      res.status(
        err.status || 500
      ).send({ error: err.error || err.message });
    });
});

export default app;
