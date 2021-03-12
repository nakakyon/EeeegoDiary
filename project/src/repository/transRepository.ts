import { NuxtAxiosInstance } from '@nuxtjs/axios'

type GetRequest = {
  source: string
  target: string
  text: string
}

type PostRequest = {
  source: string
  target: string
  text: string
}

type Responce = {
  code: string
  text: string
}

export default class TransRepository {
  private readonly axios: NuxtAxiosInstance
  private routePath = ''

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  public async get(source: string, target: string, text: string) {
    const params: GetRequest = { source, target, text }
    const res = await this.axios.get<Responce>(`${this.routePath}`, {
      params,
    })
    return res.data.text
  }

  public async post(source: string, target: string, text: string) {
    const postRequest: PostRequest = { source, target, text }
    const res = await this.axios.post<Responce>(
      `${this.routePath}`,
      postRequest
    )
    return res.data.text
  }
}
