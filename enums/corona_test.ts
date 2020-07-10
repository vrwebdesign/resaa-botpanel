export interface CoronaTest {
  6843: string
  6844: string
  6845: string
  toSelect: { text: string; value: string }[]
}
const coronaTest = {
  6843: 'تست PCR',
  6844: 'تست AntyBody',
  6845: 'PCR & AntyBody'
}
export default coronaTest

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    corona_test: CoronaTest
  }
}
