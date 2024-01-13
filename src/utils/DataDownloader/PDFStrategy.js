import DataDownloaderStrategy from "./DataDownloaderStrategy";

import jsPDF from "jspdf";

export default class PDFStrategy extends DataDownloaderStrategy {
  download(fileName, data, headers) {
    const unit = "pt";
    const size = "Legal"; //Use A1, A2, A3 or A4;
    const orientation = "landscape"; // portrait or landscape;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(12);

    let content = {
      startY: 50,
      head: headers,
      body: data.map((item) => Object.values(item)),
      bodyStyles: {
        lineWidth: 1,
        lineColor: [0]
      },
      headStyles: {
        lineWidth: 1,
        lineColor: [0]
      }
    };
    doc.autoTable(content);
    doc.save(`${fileName}.pdf`);
  }
}
