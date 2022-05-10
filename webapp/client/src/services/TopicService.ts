import {config} from './ServiceConfig';
import CacheService from './CacheService';

//TODO: Merge topic service and schema services in one class
class TopicService {
  async getTopics() {
    const results = await CacheService.invoke(
      `${config.serverBase}/schema/topics`,
      {
        method: 'GET'
      },
      'topics',
      43200000
    );

    if(!results) {
      return [];
    }

    return results;
  }
}

const topicServiceInstance = new TopicService();

export default topicServiceInstance;
