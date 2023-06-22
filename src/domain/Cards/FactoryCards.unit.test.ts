import { FactoryCards } from './FactoryCards'

describe('FactoryCards', () => {
  it('should create a new Cards', () => {
    const cards = new FactoryCards().execute()
    expect(cards).toBeDefined()
  })
})
