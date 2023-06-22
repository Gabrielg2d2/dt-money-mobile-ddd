import zod from 'zod'

type TransactionType = 'withdrawn' | 'deposit'
type TransactionValidation = {
  amount: number
  date: string
  category: string
  type: TransactionType
  name: string
}

export class AdapterZodTransaction {
  private readonly schema = zod.object({
    amount: zod.number(),
    date: zod.string(),
    category: zod.string(),
    type: zod.string(),
    name: zod.string()
  })

  private validate<T>(data: T): boolean {
    const validationResult = this.schema.safeParse(data)
    return validationResult.success
  }

  public validateNewTransaction(data: TransactionValidation): boolean {
    const validationResult = this.validate(data)
    return validationResult
  }

  get schemaTransaction() {
    return this.schema
  }
}
