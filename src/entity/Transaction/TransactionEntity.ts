import { AdapterZodTransaction } from "./AdapterZodTransaction";

export type TransactionType = "withdrawn" | "deposit";
export type TransactionDataTypes = {
  id: string | undefined;
  amount: number;
  date: string;
  category: string;
  type: TransactionType;
  name: string;
};

export class TransactionEntity {
  constructor(
    private readonly id: string | undefined,
    private readonly amount: number,
    private readonly date: string,
    private readonly category: string,
    private readonly type: TransactionType,
    private readonly name: string,
    private readonly adapterValidationTransaction: AdapterZodTransaction
  ) {}

  verifyNewTransaction(): boolean {
    if (this.amount === 0) {
      throw new Error(
        "Amount must be positive for input and negative for output"
      );
    }
    const validationResult =
      this.adapterValidationTransaction.validateNewTransaction({
        amount: this.amount,
        date: this.date,
        category: this.category,
        type: this.type,
        name: this.name,
      });

    if (!validationResult) {
      throw new Error("Invalid new transaction");
    }

    return true;
  }

  create(): TransactionDataTypes {
    if (!this.verifyNewTransaction()) return {} as TransactionDataTypes;
    return {
      id: this.id,
      amount: this.amount,
      date: this.date,
      category: this.category,
      type: this.type,
      name: this.name,
    };
  }

  update(): TransactionDataTypes {
    if (!this.verifyNewTransaction()) return {} as TransactionDataTypes;
    if (!this.id) throw new Error("Id is required to update");
    return {
      id: this.id,
      amount: this.amount,
      date: this.date,
      category: this.category,
      type: this.type,
      name: this.name,
    };
  }
}
