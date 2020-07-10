export interface CoronaTest {
  2304: string
  2305: string
  2306: string
  toSelect: { text: string; value: string }[]
}
const coronaTest = {
  2304: 'تست PCR',
  2305: 'تست AntyBody',
  2306: 'PCR & AntyBody'
}
export default coronaTest

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    corona_test: CoronaTest
  }
}
