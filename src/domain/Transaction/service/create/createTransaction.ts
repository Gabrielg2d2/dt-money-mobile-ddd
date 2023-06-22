import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { HttpClient } from '@/infra/HttpClient'

export async function createTransaction(transaction: TransactionDataTypes) {
  try {
    const httpClient = new HttpClient()
    await httpClient.post('/transactions', transaction)
  } catch (error) {
    throw new Error('Error to create transaction')
  }
}
