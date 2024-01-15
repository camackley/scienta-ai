import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import * as admin from "firebase-admin";

import openAiService from "../services/OpenAiService";
import { IAnalysisRequest } from "../models/analysis";

import * as fs from "fs";
import * as markdownpdf from "markdown-pdf";

const app = express();
app.use(bodyParser.json());

app.post("/", async (req: Request, res: Response) => {
  const body = req.body as IAnalysisRequest;

  const tempFilePath = `/tmp/${body.file.path.split("/").pop()}`;
  const bucket = admin.storage().bucket();
  const file = bucket.file(body.file.path);
  await file.download({ destination: tempFilePath });

  const fieldsSummary = body.dataDescription
    .map((data) => `- ${data.name}: ${data.description}`)
    .join("\n");

  const summary =
    `1. What is the data file? ${body.fileContentDescription}\n` +
    `1.1 File type: ${body.file.type}\n` +
    `2. What the data means:\n ${fieldsSummary}\n`+
    `3. What is the focus of the analysis?: ${body.goal}`;

  console.log(summary);

  // await openAiService.postMessage(summary, tempFilePath);
  const result = await openAiService.processMessage(
    "asst_OCd57jQGcrbwPgsDnBJqkvHn"
  );

  const message = result.map((rs) => {
    console.log(rs.content);
    return rs.content.map((rs2) => {
      console.log(rs2.text);
      console.log(rs2.text.value);
      return rs2.text.value;
    });
  }).join("\n");

  const mdFilePath = `temp/${body.file.name}.md`;
  fs.writeFileSync(mdFilePath, message);

  const pdfFilePath = `temp/${body.file.name}.pdf`;
  fs.createReadStream(mdFilePath)
    .pipe(markdownpdf())
    .pipe(fs.createWriteStream(pdfFilePath))
    .on("finish", () => {
      console.log(`El archivo PDF ha sido creado en: ${pdfFilePath}`);
      const bucket = admin.storage().bucket();
      const fileExtension = ".pdf";
      const fileName = `results/${body.file.name}.pdf`;
      const file = bucket.file(fileName);

      const stream = file.createWriteStream({
        metadata: { contentType: "pdf" },
      });

      stream.on("error", () => {
        throw new Error("Error while uploading the file");
      });

      stream.on("finish", async () => {
        fs.unlinkSync(mdFilePath);
        fs.unlinkSync(pdfFilePath);

        return res.status(200).send({
          remoteLocation: file.name,
          fileExtension,
        });
      });

      fs.readFile(pdfFilePath, (readErr, buffer) => {
        if (readErr) {
          throw new Error("Error reading the file.");
        }
        stream.end(buffer);
      });
    });
});

export default app;
