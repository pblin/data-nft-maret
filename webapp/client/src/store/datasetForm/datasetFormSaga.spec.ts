import {DatasetFormSaved, watchPublish, datasetFormSagas} from "./datasetFormSaga";

jest.mock('../../services/DatasetService', () => {
  return {
    DatasetService: jest.fn().mockImplementation(() => {
      return {
        postDataset: async(basicInfo, schema, id) => {
          expect(basicInfo).toEqual({});
          expect(schema).toEqual([]);
          expect(id).toBe('1234');
          return 1234;
        },
        updateDataset: async(basicInfo, schema, ownerId, datasetId) => {
          expect(basicInfo).toEqual({});
          expect(schema).toEqual([]);
          expect(ownerId).toBe('1234');
          expect(datasetId).toBe('123');
          return 123;
        }
      }
    })
  }

});

import {runSaga} from "@redux-saga/core";


describe('Dataset Saga', () => {

  it("should post a new dataset", async () => {
    const dispatched = [];
    await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    }, DatasetFormSaved, {basicInfo: {}, schema: [], id: '1234'});

    expect(dispatched[0].type).toBe('DATASET_SAVED');
  });

  it('should watch publish', async() => {
    const dispatched = [];
    await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    }, watchPublish);

    expect(dispatched).toEqual([]);
  });

  it('should export the saga', () => {
    const result = datasetFormSagas();
    expect(result).toBeTruthy();
  });
});

