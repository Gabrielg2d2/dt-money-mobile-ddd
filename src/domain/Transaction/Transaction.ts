import { FactoryTransactionEntity } from "../../entity/Transaction/FactoryTransactionEntity";
import {
  CreateType,
  DeleteType,
  ITransaction,
  ListType,
  UpdateType,
} from "./interfacesTransactions";
import { TransactionDataTypes } from "../../entity/Transaction/TransactionEntity";

export class Transaction implements ITransaction {
  private listTransaction: TransactionDataTypes[] = [];

  constructor(
    private readonly getTransactionListApi: ListType,
    private readonly createTransactionApi: CreateType,
    private readonly deleteTransactionApi: DeleteType,
    private readonly updateTransactionApi: UpdateType
  ) {}

  formatTransaction(transaction: TransactionDataTypes) {
    return {
      id: transaction.id,
      amount: transaction.amount,
      date: transaction.date,
      category: transaction.category,
      type: transaction.type,
      name: transaction.name,
    };
  }

  async list() {
    const listTransaction = await this.getTransactionListApi();
    const formatList = listTransaction.map((transaction) =>
      this.formatTransaction(transaction)
    );
    this.listTransaction = formatList;
    return formatList;
  }

  async create(transaction: TransactionDataTypes) {
    const objTransaction = new FactoryTransactionEntity(
      transaction.id,
      transaction.amount,
      transaction.date,
      transaction.category,
      transaction.type,
      transaction.name
    ).execute();
    const newTransaction = objTransaction.create();
    await this.createTransactionApi(newTransaction);
    await this.list();
  }

  async delete(id: string) {
    if (!id) throw new Error("Id is required to delete");
    await this.deleteTransactionApi(id);
    await this.list();
  }

  async update(transaction: TransactionDataTypes) {
    const objTransaction = new FactoryTransactionEntity(
      transaction.id,
      transaction.amount,
      transaction.date,
      transaction.category,
      transaction.type,
      transaction.name
    ).execute();

    const newTransaction = objTransaction.update();
    await this.updateTransactionApi(newTransaction);
    await this.list();
  }

  get getList() {
    return this.listTransaction;
  }
}
