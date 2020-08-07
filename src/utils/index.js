// 封装处理uni api 为promise
export const uniProxy = new Proxy(uni, {
  get(target, key) {
    return params =>
      new Promise(resolve => {
        return target[key]({
          ...params,
          success: response => resolve(response),
          fail: () => resolve(null)
        })
      })
  }
})
