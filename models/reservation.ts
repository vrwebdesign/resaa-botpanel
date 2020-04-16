import { IReservationStatus } from '~/enums/reservation_status'

export interface IReservation {
  id?: number
  patient_id?: number
  description?: string
  track_id?: string
  start?: Date
  end?: Date
  status?: IReservationStatus
}
