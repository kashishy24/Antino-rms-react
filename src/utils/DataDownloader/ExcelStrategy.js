
import * as XLSX from "xlsx";
import DataDownloaderStrategy from "./DataDownloaderStrategy";


export default class ExcelStrategy extends DataDownloaderStrategy {
  download(fileName, data, headers) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
}
