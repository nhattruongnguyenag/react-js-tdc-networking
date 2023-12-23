import { QuestionResponse } from './response/QuestionResponse'

export interface Question {
  id?: undefined,
  type: string
  title: string
  choices: Choice[]
  required: number
}

export interface Choice {
  id?: number
  content: string
}


export interface QuestionProps {
  questionIndex?: number
  dataResponse?: QuestionResponse
  editMode?: boolean
  reviewMode?: boolean
  conductMode?: boolean
}

export type MultiChoiceQuestion = Question
export type OneChoiceQuestion = Question
export type ShortAnswerQuestion = Omit<Question, 'choices'>
