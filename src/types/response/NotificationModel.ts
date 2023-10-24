import { User } from "../User"

export interface NotificationModel {
    content: string
    status: string
    user: User
  }