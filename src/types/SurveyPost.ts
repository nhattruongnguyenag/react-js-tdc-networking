import { Question } from "./Question"

export interface SurveyPost {
    id?: number
    groupId: number
    type: string
    title: string
    description: string
    userId: number
    questions: Question[]
}