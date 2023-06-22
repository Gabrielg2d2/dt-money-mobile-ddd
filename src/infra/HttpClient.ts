import { AdapterAxios } from "./AdapterAxios";

export class HttpClient {
  constructor(private readonly adapterApi = new AdapterAxios()) {}

  async get<T>(url: string) {
    const apiGet = this.adapterApi.getApi;
    const response = await apiGet<T>(url);
    return response.data;
  }

  async post<T>(url: string, data: any) {
    const apiPost = this.adapterApi.postApi;
    const response = await apiPost<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: any) {
    const apiPut = this.adapterApi.putApi;
    const response = await apiPut<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string) {
    const apiDelete = this.adapterApi.deleteApi;
    const response = await apiDelete<T>(url);
    return response.data;
  }
}
