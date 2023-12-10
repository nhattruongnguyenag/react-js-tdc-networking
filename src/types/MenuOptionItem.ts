import { IconProp } from "@fortawesome/fontawesome-svg-core"

export interface MenuOptionItem {
  type: number
  name: string
  visible: boolean
  icon?: IconProp
  color?: string
}
