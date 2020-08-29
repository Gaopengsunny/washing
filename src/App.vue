<script>
import { uniProxy } from '@/utils'
import { mapMutations, mapState } from 'vuex'
import {getArea} from "@/api/index"
export default {
  onLaunch() {
    this.getSystemInfo()
    let userInfo = uni.getStorageSync('userInfo')
    if (userInfo) {
    }
	this.getArea()
  },
  computed: {
    ...mapState('publicData', ['isFullSucreen']),
  },
  methods: {
    ...mapMutations('publicData', ['setFullSucreen','setCityData']),
    // 获取系统信息 iPhone X 底部横条适配
    async getSystemInfo() {
      const data = await uniProxy.getSystemInfo()
      if (data.screenHeight - data.windowHeight - data.statusBarHeight - 32 > 72) this.setFullSucreen(true)
    },
	getArea(){
		getArea().then(res=>{
			this.setCityData(res)
		})
	}
	
  },
}
</script>

<style lang="scss">
	@import url("@/components/aui/css/aui.css");
	@import url("@/components/aui/css/aui.iconfont.css");
	@import "@/static/styles/global.scss"
		// page {
		//   height: 100%;
		// }
</style>
