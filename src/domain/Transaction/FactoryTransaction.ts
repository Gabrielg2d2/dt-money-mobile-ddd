import { Transaction } from './Transaction'
import { createTransaction } from './service/create/createTransaction'
import { deleteTransaction } from './service/delete/deleteTransaction'
import { getListTransactions } from './service/get/getListTransactions'
import { updateTransaction } from './service/update/updateTransaction'

export class FactoryTransaction {
  execute() {
    const transaction = new Transaction(
      getListTransactions,
      createTransaction,
      deleteTransaction,
      updateTransaction
    )

    return transaction
  }
}
