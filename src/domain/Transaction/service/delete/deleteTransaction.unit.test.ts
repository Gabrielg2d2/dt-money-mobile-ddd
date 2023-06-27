import { HttpClient } from "../../../../infra/HttpClient";
import { deleteTransaction } from "./deleteTransaction";

describe("deleteTransaction", () => {
  let deleteTransactionStub: jest.SpyInstance;

  beforeEach(() => {
    deleteTransactionStub = jest
      .spyOn(HttpClient.prototype, "delete")
      .mockResolvedValueOnce(Promise.resolve());
  });

  afterEach(() => {
    deleteTransactionStub.mockRestore();
  });

  it("should delete a transaction", async () => {
    const id = "1";
    await deleteTransaction(id);

    expect(deleteTransactionStub).toHaveBeenCalledTimes(1);
    expect(deleteTransactionStub).toHaveBeenCalledWith(`/transactions/${id}`);
  });
});

describe("deleteTransaction - Error", () => {
  let deleteTransactionStub: jest.SpyInstance;

  beforeEach(() => {
    deleteTransactionStub = jest
      .spyOn(HttpClient.prototype, "delete")
      .mockResolvedValueOnce(
        Promise.reject(new Error("Error to delete transaction"))
      );
  });

  afterEach(() => {
    deleteTransactionStub.mockRestore();
  });

  it("should delete a transaction", async () => {
    const id = "1";
    await expect(deleteTransaction(id)).rejects.toThrow();
  });
});
