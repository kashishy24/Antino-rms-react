import ExcelStrategy from "./ExcelStrategy";
import JSONStrategy from "./JSONStrategy";
import PDFStrategy from "./PDFStrategy";

export default class DataDownloaderFactory {
  static getDataDownloaderStrategy(fileFormat) {
    switch (fileFormat) {
      case "PDF":
        return new PDFStrategy();
      case "EXCEL":
        return new ExcelStrategy();
      case "JSON":
        return new JSONStrategy();
      default:
        return null;
    }
  }
}
