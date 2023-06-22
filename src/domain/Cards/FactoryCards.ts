import { Cards } from './Cards'
import { getTotalCards } from './service/get/getListTransactions'

export class FactoryCards {
  execute() {
    return new Cards(getTotalCards)
  }
}
