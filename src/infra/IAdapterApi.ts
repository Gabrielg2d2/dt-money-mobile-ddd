export interface IAdapterApi {
  getApi: (url: string) => Promise<any>
  postApi: (url: string, data: any) => Promise<any>
  putApi: (url: string, data: any) => Promise<any>
  deleteApi: (url: string) => Promise<any>
}
