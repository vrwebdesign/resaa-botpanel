interface TestItem {
  name: string
  price: number
  prepayment: number
  chargeId: number
  doctorId: number
}
export interface ICoronaCity {
  id?: number
  name?: string
  testsItems?: TestItem[]
}
