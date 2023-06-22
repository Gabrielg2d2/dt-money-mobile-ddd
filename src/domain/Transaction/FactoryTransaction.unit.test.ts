import { FactoryTransaction } from './FactoryTransaction'

describe('FactoryTransaction', () => {
  it('should create a new Transaction', () => {
    const transaction = new FactoryTransaction().execute()
    expect(transaction).toBeDefined()
  })
})
