<script>
import { uniProxy } from '@/utils'
import { mapMutations, mapState } from 'vuex'

export default {
  onLaunch() {
    this.getSystemInfo()
  },
  computed: {
    ...mapState('publicData', ['isFullSucreen'])
  },
  methods: {
    ...mapMutations('publicData', ['setFullSucreen']),
    // 获取系统信息 iPhone X 底部横条适配
    async getSystemInfo() {
      const data = await uniProxy.getSystemInfo()
      if (data.screenHeight - data.windowHeight - data.statusBarHeight - 32 > 72) this.setFullSucreen(true)
    }
  }
}
</script>

<style lang="scss">
page {
  height: 100%;
}
</style>
