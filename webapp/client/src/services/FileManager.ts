export class FileManager {
  fileReader: FileReader;

  constructor() {
    this.fileReader = new FileReader();
  }

  async readFile(file: File) {
    return new Promise((resolve, reject) => {
      try {
        this.fileReader.onload = () => {
          let result = this.fileReader.result;
          //TODO: Only supports JSON at the moment
          resolve(JSON.parse(result as string));
        };

        this.fileReader.onprogress = (progress) => {
          //TODO: Add and dispatch Progress here
          console.log(progress);
        };

        this.fileReader.onerror = (error) => {
          throw error;
        };

        this.fileReader.readAsText(file);
      } catch (e) {
        console.info(e); //TODO: write logger for project
        reject(e);
      }
    });
  }
}
