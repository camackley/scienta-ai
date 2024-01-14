import * as functions from "firebase-functions";

import analysisFn from "./functions/analysis";

export const analysis = functions.https.onRequest(analysisFn);
