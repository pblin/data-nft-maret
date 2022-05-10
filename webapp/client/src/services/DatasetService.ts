import {v1 as uuid} from 'uuid';
import {config} from "./ServiceConfig";

export class DatasetService {
  baseUrl: string;
  constructor() {
    this.baseUrl = location.protocol+'//'+location.hostname + ":9000";
  }

  async postDataset(basicInfo: any, schema: any[], id: any, stage: any, schemaName: string) {
    const uid = uuid();

    let body = {
      id: uid,
      name: basicInfo.name || null,
      description: basicInfo.description || null,
      access_url: basicInfo.endpoint || null,
      api_key: basicInfo.sampleAPIKey || null,
      enc_data_key: basicInfo.sampleDataKey || null,
      search_terms: basicInfo.searchTerms ? `{${basicInfo.searchTerms}}`: null,
      delivery_method: 'API',
      dataset_owner_id: id,
      price_low: basicInfo.askPriceLow || null,
      price_high: basicInfo.askPriceHigh || null,
      num_of_records: basicInfo.records || null,
      country: basicInfo.country || null,
      state_province: basicInfo.state,
      date_created: new Date(),
      date_modified: new Date(),
      parameters: '{}',
      stage: stage,
      json_schema: JSON.stringify(schema),
      table_name: schemaName
    };

    await fetch(`${this.baseUrl}/schema`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    //body['search_terms'] = basicInfo.searchTerms.split(',');
    return body;
  }

  async updateDataset(basicInfo: any, schema: any[], ownerId: string, schemaId: string, stage: number) {
    let body = {
      id: schemaId,
      name: basicInfo.name || null,
      description: basicInfo.description || null,
      access_url: basicInfo['access_url'] || null,
      api_key: basicInfo['api_key'] || null,
      enc_data_key: basicInfo['enc_data_key'] || null,
      search_terms: basicInfo['search_terms'] ? `{${basicInfo['search_terms']}}`: null,
      delivery_method: 'API',
      dataset_owner_id: ownerId,
      price_low: basicInfo['price_low'] || null,
      price_high: basicInfo['price_high'] || null,
      num_of_records: basicInfo['num_of_records'] || null,
      country: basicInfo.country || null,
      state_province: basicInfo['state_province'] || null,
      date_created: basicInfo['date_created'],
      date_modified: new Date(),
      parameters: '{}',
      stage: stage,
      json_schema: JSON.stringify(schema)
    };

    await fetch(`${this.baseUrl}/schema`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return body;
  }

  async getUserDatasets(id: string) {
    const results = await fetch(`${config.serverBase}/schema/user/${id}`);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }

  async getAllDatasets() {
    const results = await fetch(`${config.serverBase}/marketplace`);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }

  async getDataset(datasetId: string, ownderId? : string) {
    let url = `${config.serverBase}/schema/dataset/${datasetId}`;
    if(ownderId) {
      url += `?userid=${ownderId}`;
    }

    const results = await fetch(url);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }

  async deleteDataset(datasetId: string) {
    const results = await fetch(`${config.serverBase}/schema/dataset/${datasetId}`, {
      method: 'DELETE'
    });
    if(results.status !== 200) {
      throw new Error(`Deleting of asset ${datasetId} was not successful`);
    } else {
      return;
    }
  }

  async searchDatasets(terms) {
    let url = `${config.serverBase}/marketplace/search?terms=${terms.join(',')}`;

    const results = await fetch(url);
    if(results.status !== 200) {
      return [];
    } else {
      return results.json();
    }
  }

  async getSampleData(datasetId) {
    const results = await fetch(`${config.serverBase}/schema/dataset/sample/${datasetId}`);
    if(results.status !== 200) {
      throw new Error('Something went wrong while retrieving sample data');
    } else {
      return results.json();
    }
  }

}
