// 封装请求

// let BaseUrl = "http://10.1.1.20:8888"
let BaseUrl = "https://dev-cloud-services.haier-ioc.com"

function http(url, method, data) {

  let token = uni.getStorageSync("token")
  const header = {
    Authorization: `Bearer${token}`
    // "Content-Type": "application/x-www-form-urlencoded",
  }
  console.log(method)
  return new Promise(resolve => {
    return uni.request({
      url: `${BaseUrl}/${url}`,
      header,
      method,
      data,
      success(response) {
        // 根据业务需求进行配置
        const { code, data,message } = response.data
        if (code == 200) {
			if(response.data.orderSn){
				data.orderSn =response.data.orderSn
			}
          resolve(data)
			
        }else{
		uni.showToast({
			icon:"none",
			title:message
		})
		}
      },
      fail() {
        resolve(null)
      }
    })
  })
}

export const get = (url, data = {}) => http(url, 'get', data)
export const post = (url, data = {}) => http(url, 'POST', data)
export const put = (url, data = {}) => http(url, 'PUT', data)
