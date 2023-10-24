import { Base } from "../Base";
import { User } from "../User";

export interface NotificationModel extends Base {
    content: string
    status: number
    user: User
}