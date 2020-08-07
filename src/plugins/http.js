// 封装请求
function http(url, method, data) {
  const header = {}
  return new Promise(resolve => {
    return uni.request({
      url: `${process.env.VUE_APP_APIURL}/${url}`,
      header,
      method,
      data,
      success(response) {
        // 根据业务需求进行配置
        const { code, data } = response.data
        resolve(data)
      },
      fail() {
        resolve(null)
      }
    })
  })
}

export const get = (url, data = {}) => http(url, 'get', data)
export const post = (url, data = {}) => http(url, 'post', data)
