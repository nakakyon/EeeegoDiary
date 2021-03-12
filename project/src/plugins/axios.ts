import { Plugin } from '@nuxt/types'
import TransRepository from '~/repository/transRepository'

const repositoryPlugin: Plugin = (context, inject) => {
  // axiosインスタンスを生成する
  const api = context.$axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      common: {
        Accept: 'application/json',
      },
      'Content-Type': 'application/json',
    },
    data: {},
    // data: undefined,
  })
  // axiosのエラーはそのまま返却する
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.error(error)
      alert(error)
      throw error
    }
  )
  // Repositoryクラスをinjectする
  const transRepository = new TransRepository(api)
  inject('transRepository', transRepository)
}

export default repositoryPlugin
