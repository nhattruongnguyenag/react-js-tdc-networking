import { Base } from '../Base'

export interface QuestionResponse extends Base {
  type: string
  title: string
  choices: Choice[]
  required: number
}

interface Choice {
  voteQuestionId: number
  content: string
}
