import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import AnalysisFn from "./functions/analysis";
import FileFn from "./functions/file";

// Init conf
admin.initializeApp();

// Init routes
export const analysis = functions
  .runWith({
    timeoutSeconds: 300,
    memory: "1GB",
  })
  .https.onRequest(AnalysisFn);

export const file = functions.https.onRequest(FileFn);
