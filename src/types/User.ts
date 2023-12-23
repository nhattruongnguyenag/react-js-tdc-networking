export interface User {
  id: number
  email: string
  name: string
  image: string
  status: number
  createdAt: string
  isTyping: number
  isMessageConnect: number
  updatedAt: string
  roleCodes: string
  phone: string
  code: string
  lastActive?: string
  facultyGroupCode: string | undefined
  facultyGroupId: number | undefined
}
