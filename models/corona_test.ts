import { CoronaTest } from '~/enums/corona_test'
import { coronaTestPaymentStatus } from '~/enums/corona_test_payment_status'
import { CoronaTestStatus } from '~/enums/corona_test_status'

export interface ICoronaTest {
  charge_id?: number
  doctor_id?: CoronaTest
  payment_status?: coronaTestPaymentStatus
  status?: CoronaTestStatus
}
