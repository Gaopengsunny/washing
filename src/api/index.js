import { get } from '@/plugins/http'

export const home = () => get('/api/wash_care/index')
