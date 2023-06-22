import { HttpClient } from '@/infra/HttpClient'

export async function deleteTransaction(id: string) {
  try {
    const httpClient = new HttpClient()
    await httpClient.delete(`/transactions/${id}`)
  } catch (error) {
    throw new Error('Error to delete transaction')
  }
}
