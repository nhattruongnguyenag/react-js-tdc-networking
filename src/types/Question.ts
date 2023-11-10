import { QuestionResponse } from './response/QuestionResponse'

export interface Question {
  type: string
  title: string
  choices: string[]
  required: number
}

export interface QuestionProps {
  index?: number
  dataResponse?: QuestionResponse
  editMode?: boolean
  reviewMode?: boolean
  conductMode?: boolean
}

export type MultiChoiceQuestion = Question
export type OneChoiceQuestion = Question
export type ShortAnswerQuestion = Omit<Question, 'choices'>
