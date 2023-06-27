import { HttpClient } from "../../../../infra/HttpClient";
import { updateTransaction } from "./updateTransaction";
import { TransactionDataTypes } from "../../../../entity/Transaction/TransactionEntity";

describe("updateTransaction", () => {
  let updateTransactionStub: jest.SpyInstance;

  beforeEach(() => {
    updateTransactionStub = jest
      .spyOn(HttpClient.prototype, "put")
      .mockResolvedValueOnce(Promise.resolve());
  });

  afterEach(() => {
    updateTransactionStub.mockRestore();
  });

  it("should update a transaction", async () => {
    const transaction: TransactionDataTypes = {
      id: "1",
      amount: 100,
      date: "2021-01-01",
      category: "category",
      type: "deposit",
      name: "name",
    };
    await updateTransaction(transaction);

    expect(updateTransactionStub).toHaveBeenCalledTimes(1);
    expect(updateTransactionStub).toHaveBeenCalledWith(
      `/transactions/${transaction.id}`,
      transaction
    );
  });
});

describe("updateTransaction - Error", () => {
  let updateTransactionStub: jest.SpyInstance;

  beforeEach(() => {
    updateTransactionStub = jest
      .spyOn(HttpClient.prototype, "put")
      .mockResolvedValueOnce(
        Promise.reject(new Error("Error to update transaction"))
      );
  });

  afterEach(() => {
    updateTransactionStub.mockRestore();
  });

  it("should update a transaction", async () => {
    const transaction: TransactionDataTypes = {
      id: "1",
      amount: 100,
      date: "2021-01-01",
      category: "category",
      type: "deposit",
      name: "name",
    };
    await expect(updateTransaction(transaction)).rejects.toThrow();
  });
});
