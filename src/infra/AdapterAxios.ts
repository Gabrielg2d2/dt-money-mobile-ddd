import axios, { Axios } from 'axios'
import { IAdapterApi } from './IAdapterApi'

export class AdapterAxios implements IAdapterApi {
  private readonly api: Axios

  constructor(
    private readonly baseURL: string = process.env.REACT_APP_API_URL
  ) {
    this.api = axios.create({
      baseURL: this.baseURL
    })
  }

  get getAxios() {
    return this.api
  }

  get getApi() {
    return this.api.get
  }

  get postApi() {
    return this.api.post
  }

  get putApi() {
    return this.api.put
  }

  get deleteApi() {
    return this.api.delete
  }
}
