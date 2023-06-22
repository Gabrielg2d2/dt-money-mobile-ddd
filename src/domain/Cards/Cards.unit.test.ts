import { TransactionDataTypes } from '@/entity/Transaction/TransactionEntity'
import { Cards } from './Cards'

describe('Cards - formatCards', () => {
  it('should be defined', () => {
    expect(Cards).toBeDefined()
  })

  it('should create a new Cards', () => {
    const getCardsAPISpy = jest.fn()
    const cards = new Cards(getCardsAPISpy)
    const arrCards: TransactionDataTypes[] = [
      {
        id: '1',
        amount: 100,
        category: 'category',
        date: '2021-01-01',
        name: 'name',
        type: 'deposit'
      }
    ]

    const result = cards.formatCards(arrCards)
    const objResult = {
      totalIncomingTransactions: 100,
      totalOutgoingTransactions: 0,
      totalTransactions: 100
    }

    expect(result).toEqual(objResult)
  })
})

describe('Cards - getCards', () => {
  it('should be defined', () => {
    expect(Cards).toBeDefined()
  })

  it('should create a new Cards', async () => {
    const getCardsAPISpy = jest.fn()
    const cards = new Cards(getCardsAPISpy)
    const arrCards: TransactionDataTypes[] = [
      {
        id: '1',
        amount: 100,
        category: 'category',
        date: '2021-01-01',
        name: 'name',
        type: 'deposit'
      }
    ]

    getCardsAPISpy.mockReturnValueOnce(Promise.resolve(arrCards))

    await cards.getCards()

    const objResult = {
      totalIncomingTransactions: 100,
      totalOutgoingTransactions: 0,
      totalTransactions: 100
    }

    expect(cards.totalCards).toEqual(objResult)
  })

  it('should return error in the create a new Cards', async () => {
    const getCardsAPISpy = jest
      .fn()
      .mockReturnValueOnce(Promise.reject(new Error('Error in getCards')))
    const cards = new Cards(getCardsAPISpy)

    await expect(cards.getCards()).rejects.toThrowError(
      new Error('Error in getCards')
    )

    expect(cards.totalCards).toEqual({
      totalIncomingTransactions: 0,
      totalOutgoingTransactions: 0,
      totalTransactions: 0
    })
  })
})
