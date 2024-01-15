import * as fs from "fs";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";

import fileService from "../services/fileService";
import openAiService from "../services/openAiService";
import { IAnalysisRequest } from "../models/analysis";
import { ISaveFile } from "../models/file";

const app = express();
app.use(bodyParser.json());

app.post("/", async (req: Request, res: Response) => {
  const body = req.body as IAnalysisRequest;
  const file = await fileService.getFileFromStorage(body.file.path);

  const fieldsSummary = body.dataDescription
    .map((data) => `- ${data.name}: ${data.description}`)
    .join("\n");
  const summary =
    `1. What is the data file? ${body.fileContentDescription}\n` +
    `1.1 File type: ${body.file.type}\n` +
    `2. What the data means:\n ${fieldsSummary}\n`+
    `3. What is the focus of the analysis?: ${body.goal}`;

  await openAiService.postMessage(summary, file.filePath);
  const result = await openAiService.processMessage(
    "asst_OCd57jQGcrbwPgsDnBJqkvHn"
  );

  const messages = result.analysis.data.filter((msg) =>
    msg.role == "assistant"
  );
  messages.sort((a, b) => a.created_at - b.created_at);

  const message = messages.map((ms) => {
    return ms.content.map((ms2) => ms2.text.value);
  }).join("\n");

  const filePath = await fileService.createPDFromMarkdown(
    body.file.name,
    message
  );

  const fileInfo = {
    originalFilename: body.file.name,
    newFilename: body.file.name,
    mimeType: "pdf",
    filePath: filePath,
    cloudPath: `results/${body.file.name}.pdf`,
  } as ISaveFile;

  return fileService.saveFileInStorage(fileInfo)
    .then((data) => {
      fs.unlinkSync(filePath);
      res.status(200).send(data);
    })
    .catch((err: Error) => {
      throw err;
    });
});

export default app;
