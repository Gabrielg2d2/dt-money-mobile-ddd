import { AdapterZodTransaction } from './AdapterZodTransaction'
import { TransactionType, TransactionEntity } from './TransactionEntity'

export class FactoryTransactionEntity {
  adapterValidationTransaction = new AdapterZodTransaction()

  constructor(
    private readonly id: string | undefined,
    private readonly amount: number,
    private readonly date: string,
    private readonly category: string,
    private readonly type: TransactionType,
    private readonly name: string
  ) {}

  execute(): TransactionEntity {
    return new TransactionEntity(
      this.id,
      this.amount,
      this.date,
      this.category,
      this.type,
      this.name,
      this.adapterValidationTransaction
    )
  }
}
