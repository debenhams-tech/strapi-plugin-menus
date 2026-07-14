'use strict';

jest.mock('@strapi/strapi', () => ({
  factories: {
    // The real `createCoreController` merges Strapi's base CRUD controller (which provides
    // `sanitizeOutput`/`transformResponse`) with whatever the callback returns - stubbing just
    // enough of that merge here so `find`'s own `this.sanitizeOutput`/`this.transformResponse`
    // calls resolve against the same object `find` is invoked on.
    createCoreController:
      (uid, extend) =>
      ({ strapi }) => ({
        sanitizeOutput: jest.fn((results) => results),
        transformResponse: jest.fn((data, meta) => ({ data, meta })),
        ...extend({ strapi }),
      }),
  },
}));

jest.mock('@strapi/utils', () => ({
  errors: { ValidationError: class ValidationError extends Error {} },
}));

jest.mock('../../utils', () => ({
  getNestedParams: jest.fn((query) => query),
  getService: jest.fn(),
  hasParentPopulation: jest.fn(() => false),
  parseBody: jest.fn(),
  serializeNestedMenu: jest.fn((res) => res),
}));

const { getService } = require('../../utils');
const createController = require('../menu');

describe('menu controller - find', () => {
  const filteredPagination = { start: 1, limit: 1, total: 1 };

  beforeEach(() => {
    jest.clearAllMocks();
    getService.mockReturnValue({
      find: jest.fn().mockResolvedValue({ results: [], pagination: filteredPagination }),
    });
  });

  it('passes the pagination returned by the menu service straight through, without overriding total', async () => {
    const controller = createController({ strapi: {} });
    const ctx = { query: { filters: { title: { $containsi: 'Hello' } } } };

    const response = await controller.find(ctx);

    expect(response.meta).toEqual(filteredPagination);
  });

  it('never calls an unfiltered strapi.query(...).count() to compute the total', async () => {
    const mockCount = jest.fn();
    const strapi = { query: jest.fn(() => ({ count: mockCount })) };
    const controller = createController({ strapi });
    const ctx = { query: {} };

    await controller.find(ctx);

    expect(mockCount).not.toHaveBeenCalled();
  });
});
