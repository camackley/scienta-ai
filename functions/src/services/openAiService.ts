import * as fs from "fs";
import * as functions from "firebase-functions";
import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads";
import { log } from "firebase-functions/logger";

class OpenAIService {
  private openai: OpenAI;
  private threadPromise?: Promise<Thread>;
  private fileId?: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: functions.config().openai.api_key,
    });
    this.initThread();
  }

  private initThread(): void {
    if (functions.config().env.is_dev_mode == "true") {
      this.threadPromise = this.openai.beta.threads.retrieve(
        "thread_BTuDO3ZpvmgpvQSViq6Ndgr1"
      );
    } else {
      this.threadPromise = this.openai.beta.threads.create();
    }
  }

  private async getThread(): Promise<Thread> {
    if (!this.threadPromise) {
      this.initThread();
    }
    return this.threadPromise;
  }

  async postMessage(message: string, filePath: string): Promise<void> {
    this.initThread();
    const thread = await this.getThread();

    this.fileId = await this.createFile(filePath);
    await this.openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: message,
        file_ids: [this.fileId],
      }
    );
  }

  private async createFile(filePath: string): Promise<string> {
    const openAiFile = await this.openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });

    return openAiFile.id;
  }

  private async deleteFile(fileId: string): Promise<OpenAI.Files.FileDeleted> {
    return await this.openai.files.del(fileId);
  }

  async processMessage(assistantId: string): Promise<any> {
    let toolOutputs;

    if (functions.config().env.is_dev_mode == "false") {
      const runId = await this.createRun(assistantId);
      toolOutputs = await this.processRun(runId);
    }

    const thread = await this.getThread();
    const messages = await this.openai.beta.threads.messages.list(thread.id);

    if (this.fileId) {
      this.deleteFile(this.fileId);
    }

    return { "analysis": messages, toolOutputs };
  }

  private async createRun(assistantId: string): Promise<string> {
    const thread = await this.getThread();
    const run = await this.openai.beta.threads.runs.create(
      thread.id,
      { assistant_id: assistantId }
    );
    return run.id;
  }

  private async processRun(runId: string): Promise<any[]> {
    let runner: OpenAI.Beta.Threads.Runs.Run;
    let toolOutputs: any[] = [];
    const thread = await this.getThread();

    do {
      runner = await this.openai.beta.threads.runs.retrieve(thread.id, runId);
      const runToolOutputs = await this.handleRunStatus(runner, runId);
      if (runToolOutputs) {
        toolOutputs = runToolOutputs;
      }
    } while (
      !["expired", "completed", "failed", "cancelled"].includes(runner.status)
    );

    return toolOutputs;
  }

  private async handleRunStatus(
    runner: OpenAI.Beta.Threads.Runs.Run,
    runId: string
  ): Promise<any[] | null> {
    log(runner);

    if (
      runner.status === "requires_action" &&
      runner.required_action?.type === "submit_tool_outputs"
    ) {
      const thread = await this.getThread();
      const toolOutputs = runner.required_action.submit_tool_outputs.tool_calls
        .map((toolCall) => ({
          tool_call_id: toolCall.id,
          output: toolCall.function.arguments,
        }));

      await this.openai.beta.threads.runs.submitToolOutputs(
        thread.id, runId, { tool_outputs: toolOutputs }
      );
      await this.sleep(200);

      return toolOutputs;
    } else {
      await this.sleep(100);
      return null;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default new OpenAIService();
