type reservationStatus = 'cancelled' | 'payment_pending' | 'approved'
export interface IReservationStatus {
  cancelled: string
  payment_pending: string
  approved: string
  toSelect: { text: string; value: string }[]
}
const reservationStatus = {
  cancelled: 'لغو شده',
  payment_pending: 'در انتظار پرداخت',
  approved: 'تایید شده'
}
export default reservationStatus

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    reservation_status: IReservationStatus
  }
}
