jest.mock('../../services/DatasetService', () => {
  return {
    DatasetService: jest.fn().mockImplementation(() => {
      return {
        getAllDatasets: async() => {
          return [{test: 1234}];
        },
        getUserDatasets: async(profileId: string) => {
          return [{test: 12345}];
        }
      }
    })
  }

});
import {GetUserDatasets, GetAllDatasets, watchMarketplace, marketplaceSagas} from "./marketplaceSaga";
import {runSaga} from "@redux-saga/core";
import {MARKETPLACE_ACTIONS} from "./marketplaceActions";


describe('Marketplace Saga', () => {

  it("should get all datasets", async () => {
    const dispatched = [];

    await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    }, GetAllDatasets);

    expect(dispatched[0].type).toBe(MARKETPLACE_ACTIONS.DATASETS_RETRIEVED);
    expect(dispatched[0].datasets).toEqual([{test: 1234}]);
  });

  it("should get user datasets", async () => {
    const dispatched = [];

    localStorage.setItem('profile', JSON.stringify({id: 'test1234'}));
    await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    }, GetUserDatasets);

    expect(dispatched[1].type).toBe(MARKETPLACE_ACTIONS.USER_DATASETS_RETRIEVED);
    expect(dispatched[1].datasets).toEqual([{test: 12345}]);
  });

  it("should get empty set for user datasets when profile is not set", async () => {
    const dispatched = [];

    localStorage.setItem('profile', JSON.stringify({id: undefined}));
    await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    }, GetUserDatasets);

    expect(dispatched[1].type).toBe(MARKETPLACE_ACTIONS.USER_DATASETS_RETRIEVED);
    expect(dispatched[1].datasets).toEqual([]);
  });

  it('should watch marketplace', async() => {
    const dispatched = [];
    await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    }, watchMarketplace);

    expect(dispatched).toEqual([]);
  });

  it('should export the saga', () => {
    const result = marketplaceSagas();
    expect(result).toBeTruthy();
  });
});

