export interface IFile {
  path: string;
  type: string;
  name: string;
}

export interface IResultFile {
  remoteLocation: string;
  fileExtension: string;
}

export interface ISaveFile {
  originalFilename: string;
  newFilename: string;
  mimeType: string;
  filePath: string;
  cloudPath: string;
}
