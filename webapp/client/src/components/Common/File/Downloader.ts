import * as json2csv  from 'json2csv';

class Downloader {
    downloadFile(fileName: string, content: any, isCSV: boolean = false) {
        //Creates a temp link for purpose of download
        var element = document.createElement('a');

        if(!isCSV) {
          element.setAttribute('href', 'data:text/plain;charset=utf-8,'
            + encodeURIComponent(JSON.stringify(content,null, 2)));
        } else {
          element.setAttribute('href', 'data:text/plain;charset=utf-8,'
            + content);
        }
        element.setAttribute('download', fileName);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    downloadFileAsCSV(fileName: string, data: any) {
      //Extract the fields for the parser
      const fields = this.extractFieldsFromData(data);
      const csv = json2csv.parse(data, {fields});
      this.downloadFile(fileName, csv, true);
    }

    extractFieldsFromData(data) {
      const dataProps = [];

      if(data.length) {
        for(const k in data[0]) {
          dataProps.push(k);
        }
      }

      return dataProps;
    }
}

const downloaderInstance = new Downloader();

export default downloaderInstance;
