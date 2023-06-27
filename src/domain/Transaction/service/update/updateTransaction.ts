import { TransactionDataTypes } from "../../../../entity/Transaction/TransactionEntity";
import { HttpClient } from "../../../../infra/HttpClient";

export async function updateTransaction(transaction: TransactionDataTypes) {
  try {
    const httpClient = new HttpClient();
    await httpClient.put<TransactionDataTypes>(
      `/transactions/${transaction.id}`,
      transaction
    );
  } catch (error) {
    throw new Error("Error to update transaction");
  }
}
