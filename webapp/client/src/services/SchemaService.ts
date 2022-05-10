import {config} from "./ServiceConfig";

class SchemaService {
  async searchSchemaFields(terms) {
    let url = `${config.serverBase}/schema/object/search`;

    if(terms) {
      url += `?fields=${terms.join(',')}`
    }

    const results = await fetch(url);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }
}

const schemaServiceInstance = new SchemaService();

export default schemaServiceInstance;
