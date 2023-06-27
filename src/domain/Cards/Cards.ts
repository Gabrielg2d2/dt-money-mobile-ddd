import { TransactionDataTypes } from "../../entity/Transaction/TransactionEntity";

type GetCardsAPIType = () => Promise<TransactionDataTypes[]>;

export class Cards {
  private totalIncomingTransactions = 0;
  private totalOutgoingTransactions = 0;
  private totalTransactions = 0;

  constructor(private readonly getCardsAPI: GetCardsAPIType) {}

  formatCards(arrTransactions: TransactionDataTypes[]) {
    let totalIncomingTransactions = 0;
    let totalOutgoingTransactions = 0;
    let totalTransactions = 0;

    totalTransactions = arrTransactions.reduce((acc, transaction) => {
      if (transaction.type === "deposit") {
        totalIncomingTransactions += transaction.amount;
        return acc + transaction.amount;
      }

      totalOutgoingTransactions -= transaction.amount;
      return acc - transaction.amount;
    }, 0);

    return {
      totalIncomingTransactions,
      totalOutgoingTransactions,
      totalTransactions,
    };
  }

  async getCards() {
    const response = await this.getCardsAPI();
    if (!response) {
      this.totalIncomingTransactions = 0;
      this.totalOutgoingTransactions = 0;
      this.totalTransactions = 0;
      return;
    }

    const {
      totalIncomingTransactions,
      totalOutgoingTransactions,
      totalTransactions,
    } = this.formatCards(response);

    this.totalIncomingTransactions = totalIncomingTransactions;
    this.totalOutgoingTransactions = totalOutgoingTransactions;
    this.totalTransactions = totalTransactions;
  }

  get totalCards() {
    return {
      totalIncomingTransactions: this.totalIncomingTransactions,
      totalOutgoingTransactions: this.totalOutgoingTransactions,
      totalTransactions: this.totalTransactions,
    };
  }
}
