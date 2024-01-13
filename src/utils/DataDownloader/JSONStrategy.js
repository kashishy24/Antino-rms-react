import DataDownloaderStrategy from "./DataDownloaderStrategy";

export default class JSONStrategy extends DataDownloaderStrategy {
  download(fileName, data, headers) {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${fileName}.json`;
    link.click();
  }
}
