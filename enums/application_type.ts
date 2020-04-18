type applicationstatus = 'default' | 'force'
export interface IApplicationType {
  default: string
  force: string
  toSelect: { text: string; value: string }[]
}
const applicationstatus = {
  default: 'پیشفرض',
  force: 'ضروری'
}
export default applicationstatus

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    application_type: IApplicationType
  }
}
