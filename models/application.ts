import { IApplicationType } from '~/enums/application_type'

export interface IApplication {
  id?: number
  url?: string
  verison?: string
  type?: IApplicationType
}
