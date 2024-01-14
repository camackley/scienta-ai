import * as fs from "fs";

import * as express from "express";
import * as admin from "firebase-admin";
import * as formidable from "formidable";
import { Request, Response } from "express";
import { error } from "firebase-functions/logger";

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
    .then((dataFile: any) => {
      const bucket = admin.storage().bucket();
      const fileExtension = `.${dataFile.originalFilename.split(".").pop()}`;
      const fileName = `data/${dataFile.newFilename}${fileExtension}`;
      const file = bucket.file(fileName);

      const stream = file.createWriteStream({
        metadata: { contentType: dataFile.mimetype },
      });

      stream.on("error", () => {
        throw new Error("Error while uploading the file");
      });

      stream.on("finish", async () => {
        res.status(200).send({
          remoteLocation: file.name,
          fileExtension,
        });
      });

      fs.readFile(dataFile.filepath, (readErr, buffer) => {
        if (readErr) {
          throw new Error("Error reading the file.");
        }
        stream.end(buffer);
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
