import { SELECTED_CONVERSATION, USER_LOGIN_KEY } from '../constants/KeyValue'
import { Conversation } from '../types/Conversation'
import { User } from '../types/User'

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getUserLogin(): User | null {
  const json = sessionStorage.getItem(USER_LOGIN_KEY)
  if (json) {
    return JSON.parse(json ?? '') as User
  }
  return null
}

export function getSelectedConversation(): Conversation | null {
  const json = sessionStorage.getItem(SELECTED_CONVERSATION)
  if (json) {
    return JSON.parse(json ?? '') as Conversation
  }
  return null
}
