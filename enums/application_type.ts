type applicationstatus = 'default' | 'force' | 'urgent' | 'notify' | 'internal'
export interface IApplicationType {
  default: string
  urgent: string
  notify: string
  internal: string
  toSelect: { text: string; value: string }[]
}
const applicationstatus = {
  default: 'default',
  urgent: 'urgent',
  notify: 'notify',
  internal: 'internal'
}
export default applicationstatus

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    application_type: IApplicationType
  }
}
