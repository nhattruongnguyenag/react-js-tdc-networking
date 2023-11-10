import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { SHORT_ANSWER } from '../pages/CreateSurveyPostPage'
import { Business } from '../types/Business'
import { Conversation } from '../types/Conversation'
import { Faculty } from '../types/Faculty'
import { Message } from '../types/Message'
import { ModalImage } from '../types/ModalImage'
import { ModalUserReaction } from '../types/ModalUserReaction'
import { Question } from '../types/Question'
import { SurveyPostRequest } from '../types/request/SurveyPostRequest'
import { Student } from '../types/Student'
import { getSelectedConversation, getSurveyPostRequest, getUserLogin } from '../utils/CommonUtls'
import { InputTextValidate } from '../utils/ValidateUtils'
import { ModalComments } from '../types/ModalComments'

export interface TDCSocialNetworkState {
  darkMode: boolean
  surveyPostRequest: SurveyPostRequest
  questionTitleValidates: InputTextValidate[]
  choices: string[]
  questions: Question[]
  imagesUpload: string[] | null
  conversations: Conversation[]
  conversationMessages: Message[]
  selectConversation: Conversation | null
  userLogin: Student | Faculty | Business | null
  deviceToken: string | null
  isOpenModalImage: boolean
  isOpenModalComments: boolean
  isOpenModalUserReaction: boolean
  modalImageData: ModalImage | null
  modalCommentData: ModalComments | null
  modalUserReactionData: ModalUserReaction | null
  updatePost: boolean
}

export const defaultSurveyPostRequest: SurveyPostRequest = {
  groupId: -1,
  images: [],
  title: '',
  type: 'khao-sat',
  description: '',
  questions: [],
  userId: -1
}

const initialState: TDCSocialNetworkState = {
  darkMode: false,
  conversationMessages: [],
  surveyPostRequest: defaultSurveyPostRequest,
  questionTitleValidates: [],
  choices: ['', '', ''],
  questions: [],
  imagesUpload: null,
  conversations: [],
  deviceToken: null,
  selectConversation: getSelectedConversation(),
  userLogin: getUserLogin(),
  isOpenModalImage: false,
  isOpenModalComments: false,
  isOpenModalUserReaction: false,
  modalImageData: null,
  modalCommentData: null,
  modalUserReactionData: null,
  updatePost: false
}

export const TDCSocialNetworkSlice = createSlice({
  name: 'TDCSocialNetwork',
  initialState,
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<void>) => {
      state.darkMode = !state.darkMode
    },
    setUserLogin: (state, action: PayloadAction<Student | Faculty | Business>) => {
      state.userLogin = action.payload
    },
    setDeviceToken: (state, action: PayloadAction<string>) => {
      state.deviceToken = action.payload
    },
    setImagesUpload: (state, action: PayloadAction<string[]>) => {
      state.imagesUpload = action.payload
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload
    },
    setSelectConversation: (state, action: PayloadAction<Conversation | null>) => {
      state.selectConversation = action.payload
    },
    setConversationMessages: (state, action: PayloadAction<Message[]>) => {
      state.conversationMessages = action.payload
    },
    setSurveyPostRequest: (state, action: PayloadAction<SurveyPostRequest>) => {
      state.surveyPostRequest = action.payload
    },
    setSurveyPostTitle: (state, action: PayloadAction<string>) => {
      state.surveyPostRequest.title = action.payload
    },
    setSurveyPostDescription: (state, action: PayloadAction<string>) => {
      state.surveyPostRequest.description = action.payload
    },
    addQuestion: (state, action: PayloadAction<string>) => {
      const question: Question = {
        title: '',
        type: action.payload,
        choices: []
      }
      if (question.type !== SHORT_ANSWER) {
        question.choices = ['', '', '']
      }
      state.surveyPostRequest.questions = [...state.surveyPostRequest.questions, question]
      console.log(current(state.surveyPostRequest))
    },
    setQuestionValidates: (state, action: PayloadAction<InputTextValidate[]>) => {
      state.questionTitleValidates = action.payload
    },
    addQuestionValidates: (state, action: PayloadAction<InputTextValidate>) => {
      state.questionTitleValidates.push(action.payload)
    },
    updateQuestionTitleValidate: (state, action: PayloadAction<{ index: number; validate: InputTextValidate }>) => {
      state.questionTitleValidates[action.payload.index] = action.payload.validate
    },
    deleteQuestionTitleValidate: (state, action: PayloadAction<{ index: number }>) => {
      state.questionTitleValidates.splice(action.payload.index, 1)
    },
    updateQuestion: (state, action: PayloadAction<{ index: number; question: Question }>) => {
      state.surveyPostRequest.questions[action.payload.index] = action.payload.question
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.surveyPostRequest.questions.splice(action.payload, 1)
    },
    addChoice: (state, action: PayloadAction<{ questionIndex: number }>) => {
      state.surveyPostRequest.questions[action.payload.questionIndex].choices.push('')
    },
    updateChoice: (state, action: PayloadAction<{ questionIndex: number; choiceIndex: number; choice: string }>) => {
      const { choiceIndex, questionIndex, choice } = action.payload
      state.surveyPostRequest.questions[questionIndex].choices[choiceIndex] = choice
    },
    deleteChoice: (state, action: PayloadAction<{ questionIndex: number; choiceIndex: number }>) => {
      const { choiceIndex, questionIndex } = action.payload
      state.surveyPostRequest.questions[questionIndex].choices.splice(choiceIndex, 1)
    },
    resetChoices: (state, action: PayloadAction<void>) => {
      state.choices = ['', '', '']
    },
    openModalImage: (state, action: PayloadAction<ModalImage>) => {
      state.modalImageData = action.payload
      state.isOpenModalImage = true
    },
    closeModalImage: (state, action: PayloadAction<void>) => {
      state.isOpenModalImage = false
    },
    openModalComments: (state, action: PayloadAction<ModalComments>) => {
      state.modalCommentData = action.payload
      state.isOpenModalComments = true
    },
    closeModalComments: (state, action: PayloadAction<void>) => {
      state.isOpenModalComments = false
    },
    openModalUserReaction: (state, action: PayloadAction<ModalUserReaction>) => {
      state.modalUserReactionData = action.payload
      state.isOpenModalUserReaction = true
    },
    closeModalUserReaction: (state, action: PayloadAction<void>) => {
      state.isOpenModalUserReaction = false
    },
    updatePostWhenHaveChangeComment: (state, action: PayloadAction<boolean>) => {
      state.updatePost = action.payload
    },
    listenConversationsSoket: (state, action: PayloadAction<void>) => {
      state.isOpenModalUserReaction = false
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  toggleDarkMode,
  setImagesUpload,
  setQuestionValidates,
  setUserLogin,
  setConversations,
  setConversationMessages,
  setDeviceToken,
  setSurveyPostRequest,
  addQuestionValidates,
  updateQuestionTitleValidate,
  deleteQuestionTitleValidate,
  setSurveyPostTitle,
  setSurveyPostDescription,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  addChoice,
  updateChoice,
  deleteChoice,
  resetChoices,
  openModalImage,
  closeModalImage,
  openModalComments,
  closeModalComments,
  openModalUserReaction,
  closeModalUserReaction,
  setSelectConversation,
  updatePostWhenHaveChangeComment
} = TDCSocialNetworkSlice.actions

export default TDCSocialNetworkSlice.reducer
