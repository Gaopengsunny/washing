import {
	upBaseUrl
} from "@/plugins/config"
import {
	get,
	post,
	put
} from '@/plugins/http'

export const home = () => get('/api/wash_care/index')

/**
 * code - key
 * @param {*} param 
 */
export const zbWebAccess = (param) => post('ys/login/zbWebAccess', param)

/**
 * token
 * @param {*} param 
 */
export const zbWxmini = (param) => post('ys/login/zbWxmini', param)

/**
 * 订单列表
 * @param {*} param 
 */

export const orderDetailList = (param) => get('ys/crowdsourcingWashOrder/orderDetailList', param)
/**
 * 用户详情
 * @param {*} param 
 */
export const getByUserId = (param) => get('ys/crowdsourcingUser/getByUserId', param)

/**
 * 发送验证码
 * @param {*} param 
 */

export const identityCode = (param) => get('ys/crowdsourcingUser/identityCode', param)

/**
 * 验证码验证
 * @param {*} param 
 */

export const checkCode = (param) => get('ys/crowdsourcingUser/checkCode', param)

/**
 * 银行卡列表
 */

export const getUserBankList = (param) => get('ys/crowdsourcingUserBank/getUserBankList', param)


/**
 * 新增银行卡列表
 */

export const insertUserBankList = (param) => post('ys/crowdsourcingUserBank/insert', param)

/**
 * 修改接单状态
 */
export const updataUser = (param) => post('ys/crowdsourcingUser/updataUser', param)

/**
 * 删除银行卡
 */

export const deleteUserBankList = (param) => get('ys/crowdsourcingUserBank/delete', param)

/**
 * 完成取衣
 */

export const updataOrderStatus = (param) => post('ys/crowdsourcingWashOrder/updataOrderStatus', param)


/**
 * 异常订单
 */

export const orderAbnormal = (param) => get('ys/crowdsourcingWashOrder/orderAbnormal', param)




/**
 * 订单列表
 * @param {*} param 
 */

export const getById = (param) => get('ys/crowdsourcingWashOrder/getById', param)



/**
 * 取衣数量
 */
export const countObtainOrder = (param) => get('ys/crowdsourcingWashOrder/countObtainOrder', param)

/**
 * 送衣数据
 */

export const countTransportOrder = (param) => get('ys/crowdsourcingWashOrder/countTransportOrder', param)

/**
 * 取衣验证码
 */
export const crowdsourcingCode = (param) => get('ys/crowdsourcingWashOrder/identityCode', param)

/**
 * 取衣验证码验证
 */
export const crowdsourcingcheckCode = (param) => get('ys/crowdsourcingWashOrder/checkCode', param)

/**
 * 办卡列表
 */
export const allRechargeCard = (param) => get('ys/ysUserCard/getCardTypeList', param)


/**
 * 提现记录
 */
export const selectByUserIdList = (param) => get('ys/ysZbCashOut/selectByUserIdList', param)

/**
 * 顾客列表
 */

export const acqSearchUser = (param) => get('ys/ysUsers/search', param)
/**
 * 用户详情
 */

export const detailsById = (param) => get('ys/ysUsers/detailsById', param)

//新增用户
export const acqAddUser = (param) => post('ys/ysUsers/addUser', param)
//根据用户userId获取地址列表
export const acqGetAddress = (param) => get('ys/ysUserAddress/getZBAllAddress', param)
//新增地址
export const acqAddAddress = (param) => post('ys/ysUserAddress/addZBAddress', param)

/**
 * 分类佣金统计
 */
export const getCountIncome = (param) => get('ys/crowdsourcingWashOrderRefund/getCountIncome', param)

/**
 * 根据时间获取佣金数据
 */


export const getCountTimeIncome = (param) => get('ys/crowdsourcingWashOrderRefund/getCountTimeIncome', param)

/**
 * 佣金详情
 */


export const getIncomelist = (param) => get('ys/crowdsourcingWashOrderRefund/getIncomelist', param)

/**
 * 三级联动
 */


export const getArea = (param) => get('ys/ysAreaNew/getStreetList', param)

/**
 * 商品模块
 */

export const getCityShopModuleList = (param) => get('ys/homePage/getCityModuleList', param)
/**
 * 商品列表
 */

export const getClassList = (param) => get('ys/ysWashService/getClassList', param)

/**
 * 商品列表
 */


export const getServiceList = (param) => get('ys/ysWashService/getServiceList', param)

/**
 * 取下单
 */

export const createWashOrder = (param) => post('ys/ysWashOrder/createWashOrder', param)




/**
 * 办卡下单
 */

export const rechargeCard = (param) => post('ys/ysUserCard/rechargeCard', param)

/**
 * 办卡详情
 */

export const getCardType = (param) => get('ys/ysUserCard/getCardType', param)



/**
 * 提现
 */


export const cashOut = (param) => get('ys/crowdsourcingWashOrderRefund/cashOut', param)
/**
 * 办卡记录
 */

export const getCardRecordlist = (param) => get('ys/crowdsourcingWashOrder/getCardList', param)


/**
 * 订单详情
 */
export const orderServiceDetailList = (param) => get('ys/ysWashOrder/orderServiceDetailList', param)


/**
 * 优惠卷列表
 */
export const orderBonusList = (param) => get('ys/ysUserCard/orderBonusList', param)

/**
 * 平台卡余额
 */

export const confirmOrder = (param) => get('ys/ysWashOrder/confirmOrder', param)

/**
 * 收款
 */


export const paymentWashOrder = (param) => post('ys/ysWashOrder/paymentWashOrder', param)
/**
 * 平台卡
 */

export const WashidentityCode = (param) => get('ys/ysWashOrder/identityCode', param)



/**
 * 取衣验证码验证
 */

export const WashcheckCode = (param) => get('ys/ysWashOrder/checkCode', param)



/**
 * 提现金额
 */

export const getCountCashOut = (param) => get('ys/crowdsourcingWashOrderRefund/getCountCashOut', param)

/**
 * 提交门店列表
 */
export const sourcingOrderDetailList = (param) => get('ys/crowdsourcingWashOrder/orderServiceDetailList', param)

/**
 * 提交店铺
 */
export const updataOrderSubmitShop = (param) => post('ys/crowdsourcingWashOrder/updataOrderSubmitShop', param)



/**
 * 支付结果
 */
export const getTradeInfo = (param) => get('ys/ysWashOrder/getTradeInfo', param)

/**
 * 失败订单
 */
export const failOrderDetailList = (param) => get('ys/crowdsourcingWashOrder/failOrderDetailList', param)


/**
 * 上传图片
 */

// export const failOrderDetailList = (param) => get('ys/crowdsourcingWashOrder/failOrderDetailList',param)


export const  upImage =  (userId) => {

	return new Promise((resolve, reject) => {
		uni.chooseImage({
			success: (chooseImageRes) => {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				console.log(tempFilePaths)
				uni.uploadFile({
					url: upBaseUrl, //仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					name: 'file',
					formData: {
						'projectId': "1",
						"useDay": "1",
						"path": 'upload'

					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data)
						 let resData = JSON.parse(uploadFileRes.data)
						 if(resData.code != 200){
							 uni.showToast({
							 	icon:"none",
								title:"服务器错误"
							 })
						 }else{
							 resolve(resData.data);
						 }
					}
				});
			}
		});
		                       
	})

};
