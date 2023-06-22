import { HttpClient } from '@/infra/HttpClient'
import { getListTransactions } from './getListTransactions'

describe('getListTransactions', () => {
  let updateTransactionStub: jest.SpyInstance

  beforeEach(() => {
    updateTransactionStub = jest
      .spyOn(HttpClient.prototype, 'get')
      .mockResolvedValueOnce(
        Promise.resolve([
          {
            id: '1',
            title: 'title',
            amount: 100,
            type: 'deposit',
            category: 'category',
            createdAt: '2021-01-01T00:00:00.000Z'
          }
        ])
      )
  })

  afterEach(() => {
    updateTransactionStub.mockRestore()
  })

  it('should be able to get list transactions', async () => {
    const response = await getListTransactions()
    expect(response).toEqual([
      {
        id: '1',
        title: 'title',
        amount: 100,
        type: 'deposit',
        category: 'category',
        createdAt: '2021-01-01T00:00:00.000Z'
      }
    ])
  })
})

describe('getListTransactions - Error', () => {
  let updateTransactionStub: jest.SpyInstance

  beforeEach(() => {
    updateTransactionStub = jest
      .spyOn(HttpClient.prototype, 'get')
      .mockRejectedValueOnce(new Error('Error to get transactions'))
  })

  afterEach(() => {
    updateTransactionStub.mockRestore()
  })

  it('should be able to get list transactions', async () => {
    await expect(getListTransactions()).rejects.toThrowError(
      new Error('Error to get transactions')
    )
  })
})
