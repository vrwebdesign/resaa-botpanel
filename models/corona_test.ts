import { CoronaTest } from '~/enums/corona_test'
import { CoronaTestStatus } from '~/enums/corona_test_status'

export interface ICoronaTest {
  charge_id?: number
  doctor_id?: CoronaTest
  status?: CoronaTestStatus
}
