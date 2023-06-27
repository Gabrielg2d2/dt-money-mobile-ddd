import { HttpClient } from "../../../../infra/HttpClient";
import { getTotalCards } from "./getListTransactions";

describe("getTotalCards", () => {
  let getTotalCardsStub: jest.SpyInstance;

  beforeEach(() => {
    getTotalCardsStub = jest
      .spyOn(HttpClient.prototype, "get")
      .mockResolvedValueOnce(
        Promise.resolve([
          {
            id: "1",
            title: "title",
            amount: 100,
            type: "deposit",
            category: "category",
            createdAt: "2021-01-01T00:00:00.000Z",
          },
        ])
      );
  });

  afterEach(() => {
    getTotalCardsStub.mockRestore();
  });

  it("should call getTotalCards", async () => {
    await expect(getTotalCards()).resolves.toEqual([
      {
        id: "1",
        title: "title",
        amount: 100,
        type: "deposit",
        category: "category",
        createdAt: "2021-01-01T00:00:00.000Z",
      },
    ]);
  });
});

describe("getTotalCards - Error", () => {
  let getTotalCardsStub: jest.SpyInstance;

  beforeEach(() => {
    getTotalCardsStub = jest
      .spyOn(HttpClient.prototype, "get")
      .mockResolvedValueOnce(
        Promise.reject(new Error("Error to getTotalCards"))
      );
  });

  afterEach(() => {
    getTotalCardsStub.mockRestore();
  });

  it("should call getTotalCards", async () => {
    await expect(getTotalCards()).rejects.toThrow(
      new Error("Error to getTotalCards")
    );
  });
});
