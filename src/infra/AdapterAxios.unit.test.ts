import { AdapterAxios } from './AdapterAxios'

describe('AdapterAxios', () => {
  it('should be defined', () => {
    const adapterAxios = new AdapterAxios()
    expect(adapterAxios).toBeDefined()
  })

  it('should be able to get', () => {
    const adapterAxios = new AdapterAxios()
    const response = adapterAxios.getApi
    expect(response).toBeDefined()
  })

  it('should be able to post', () => {
    const adapterAxios = new AdapterAxios()
    const response = adapterAxios.postApi
    expect(response).toBeDefined()
  })

  it('should be able to put', () => {
    const adapterAxios = new AdapterAxios()
    const response = adapterAxios.putApi
    expect(response).toBeDefined()
  })

  it('should be able to delete', () => {
    const adapterAxios = new AdapterAxios()
    const response = adapterAxios.deleteApi
    expect(response).toBeDefined()
  })

  it('should be able to instance axios', () => {
    const adapterAxios = new AdapterAxios()
    const response = adapterAxios.getAxios
    expect(response).toBeDefined()
  })

  it('should be able to instance axios with baseURL', () => {
    const adapterAxios = new AdapterAxios('http://localhost:3333')
    const response = adapterAxios.getAxios
    expect(response).toBeDefined()
  })
})
