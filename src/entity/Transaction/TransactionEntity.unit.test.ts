/* eslint-disable no-new */
import { AdapterZodTransaction } from './AdapterZodTransaction'
import { TransactionEntity } from './TransactionEntity'

describe('TransactionEntity - create', () => {
  const adapterZodTransaction = new AdapterZodTransaction()
  it('should create a valid transaction', () => {
    const transaction = new TransactionEntity(
      null,
      100,
      new Date().toISOString(),
      'category',
      'deposit',
      'A valid transaction',
      adapterZodTransaction
    ).create()

    expect(transaction).toBeDefined()
  })

  it('should create a valid with id transaction', () => {
    const transaction = new TransactionEntity(
      null,
      100,
      new Date().toISOString(),
      'category',
      'deposit',
      'A valid transaction',
      adapterZodTransaction
    ).create()

    expect(transaction).toBeDefined()
  })

  it('should return error, when the value is equal to zero or description is less than 3 letters', () => {
    expect(() => {
      new TransactionEntity(
        null,
        0,
        new Date().toISOString(),
        'category',
        'deposit',
        'A valid transaction',
        adapterZodTransaction
      ).create()
    }).toThrowError('Amount must be positive for input and negative for output')

    expect(() => {
      new TransactionEntity(
        null,
        0,
        new Date().toISOString(),
        'category',
        'deposit',
        'A valid transaction',
        adapterZodTransaction
      ).create()
    }).toThrowError('Amount must be positive for input and negative for output')
  })
})

describe('TransactionEntity - update', () => {
  const adapterZodTransaction = new AdapterZodTransaction()
  it('should update a valid transaction', () => {
    const transaction = new TransactionEntity(
      '12345',
      100,
      new Date().toISOString(),
      'category',
      'deposit',
      'A valid transaction',
      adapterZodTransaction
    ).update()

    expect(transaction).toBeDefined()
  })

  it('should perform the update even with a negative output value', () => {
    const transaction = new TransactionEntity(
      '12345',
      -100,
      new Date().toISOString(),
      'category',
      'deposit',
      'A valid transaction',
      adapterZodTransaction
    ).update()

    expect(transaction).toBeDefined()
  })

  it('should return error, when the value is equal to zero or description is less than 3 letters', () => {
    expect(() => {
      new TransactionEntity(
        null,
        0,
        new Date().toISOString(),
        'category',
        'deposit',
        'A valid transaction',
        adapterZodTransaction
      ).update()
    }).toThrowError('Amount must be positive for input and negative for output')

    expect(() => {
      new TransactionEntity(
        null,
        0,
        new Date().toISOString(),
        'category',
        'deposit',
        'A valid transaction',
        adapterZodTransaction
      ).update()
    }).toThrowError('Amount must be positive for input and negative for output')
  })
})
