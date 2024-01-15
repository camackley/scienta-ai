import * as bodyParser from "body-parser";
import express, { Request, Response } from "express";

import fileService from "../services/fileService";
import openAiService from "../services/openAiService";
import { IAnalysisRequest } from "../models/analysis";

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

  const content = messages.map((ms) => {
    return ms.content.map((ms2) => ms2.text?.value);
  }).join("\n");

  res.status(200).send({
    content,
  });
});

export default app;
