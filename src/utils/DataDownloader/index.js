export default class DataDownloader {
  data = null;
  downloadStrategy = null;
  constructor(fileName, data, headers) {
    this.data = data;
    this.fileName = fileName;
    this.headers = headers;
  }
  download() {
    if (this.downloadStrategy) {
      this.downloadStrategy.download(this.fileName, this.data, this.headers);
    } else {
      throw new Error("Please provide a valid download strategy");
    }
  }
  setStrategy(downloadStrategy) {
    this.downloadStrategy = downloadStrategy;
  }
}
