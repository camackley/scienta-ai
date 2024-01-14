import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import AnalysisFn from "./functions/Analysis";
import FileFn from "./functions/File";

// Init conf
admin.initializeApp();

// Init routes
export const analysis = functions.https.onRequest(AnalysisFn);
export const file = functions.https.onRequest(FileFn);
