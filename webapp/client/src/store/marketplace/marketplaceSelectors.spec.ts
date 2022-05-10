import * as MarketplaceSelectors from './marketplaceSelectors';

describe('Marketplace Saga', () => {

  it("should get get marketplace state", () => {
    const state = {
      MarketplaceState: 1234
    };

    expect(MarketplaceSelectors.marketplaceSelector(state)).toBe(1234);
  });

  it('should get the datasets from the marketplace', () => {
    const state = {
      MarketplaceState: {
        datasets: 1234
      }
    };

    expect(MarketplaceSelectors.datasetSelector(state)).toBe(1234);
  });

  it('should get the state of the dataset dialog selector', () => {
    const state = {
      MarketplaceState: {
        datasetDialog: 1234
      }
    };

    expect(MarketplaceSelectors.datasetDialogSelector(state)).toBe(1234);
  });

  it('should get the state of the confirm delete dataset dialog', () => {
    const state = {
      MarketplaceState: {
        confirmDeleteDialog: 1234
      }
    };

    expect(MarketplaceSelectors.confirmDeleteDialogSelector(state)).toBe(1234);
  });


});

