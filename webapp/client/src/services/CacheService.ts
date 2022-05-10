class ApiService {
    constructor() {}

    async invoke(url: string, fetchOptions: any, key: string, expiresIn: number) {
      //Get data from local storage
      let storedValue: any = localStorage.getItem(key);

      if(storedValue) {
        storedValue = JSON.parse(storedValue);
        const currentTime = new Date().valueOf();
        const storedTime = new Date(storedValue.timestamp).valueOf();
        const difference = currentTime - storedTime;
        if(difference > expiresIn) {
          return await this.makeRequest(url, fetchOptions, key);
        }
        return storedValue.data;
      } else {
        return await this.makeRequest(url, fetchOptions, key);
      }
    }

    private async makeRequest(url, fetchOptions, key) {

      const results = await fetch(url, fetchOptions);

      if(results.ok) {
        const response = await results.json();

        //Set value in local storage
        localStorage.setItem(key, JSON.stringify({
          timestamp: new Date(),
          data: response
        }));

        return response;
      }
      return;
    }
}

const apiServiceInstance = new ApiService();

export default apiServiceInstance;
