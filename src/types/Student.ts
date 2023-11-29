import { User } from './User'

export interface Student extends User {
  password: string
  facultyId: number
  majorId: number
  studentCode: string
  confimPassword: string
  background:string
  subject:string
  content:string
}
