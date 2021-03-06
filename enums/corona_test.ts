export interface CoronaTest {
  2304: string
  2305: string
  2306: string
  toSelect: { text: string; value: string }[]
}
const coronaTest = {
  2304: 'تست AntyBody',
  2305: 'تست PCR',
  2306: 'PCR & AntyBody',
  antybody: 'تست AntyBody',
  pcr: 'تست PCR',
  both: 'PCR & AntyBody'
}
export default coronaTest

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    corona_test: CoronaTest
  }
}
