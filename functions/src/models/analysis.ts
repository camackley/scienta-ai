import { IFile } from "./file";

export interface IAnalysisRequest {
  file: IFile;
  dataDescription: IDataDescription[];
  fileContentDescription: string;
  goal: string;
}

export interface IDataDescription {
  name: string;
  description: string;
}
