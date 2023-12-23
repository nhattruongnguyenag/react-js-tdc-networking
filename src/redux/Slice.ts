import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { SHORT_ANSWER } from '../pages/CreateSurveyPostPage'
import { Business } from '../types/Business'
import { Conversation } from '../types/Conversation'
import { Faculty } from '../types/Faculty'
import { Message } from '../types/Message'
import { ModalImage } from '../types/ModalImage'
import { ModalUserReaction } from '../types/ModalUserReaction'
import { Choice, Question } from '../types/Question'
import { SurveyPostRequest } from '../types/request/SurveyPostRequest'
import { QuestionResponse } from '../types/response/QuestionResponse'
import { Student } from '../types/Student'
import { getSelectedConversation, getUserLogin } from '../utils/CommonUtls'
import { InputTextValidate } from '../utils/ValidateUtils'
import { ModalComments } from '../types/ModalComments'
import { PostRejectedLog } from '../types/PostRejectLog'
import { PostRejectLogResponse } from '../types/response/RejectLogResponse'

export interface TDCSocialNetworkState {
  previousPage: string
  rejectLogResponse: PostRejectLogResponse | null
  postRejectId: number | null
  darkMode: boolean
  surveyPostRequest: SurveyPostRequest
  questionConducts: QuestionResponse[]
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
  defaultLanguage: string
  userIdOfProfileNow: number
  currentScreenNowIsProfileScreen: boolean
}

export const defaultSurveyPostRequest: SurveyPostRequest = {
  groupId: -1,
  title: '',
  type: 'khao-sat',
  description: '',
  questions: [],
  userId: -1
}

const initialState: TDCSocialNetworkState = {
  previousPage: '',
  rejectLogResponse: null,
  postRejectId: null,
  defaultLanguage: 'vi',
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
  updatePost: false,
  questionConducts: [],
  userIdOfProfileNow: 0,
  currentScreenNowIsProfileScreen: false
}

export const TDCSocialNetworkSlice = createSlice({
  name: 'TDCSocialNetwork',
  initialState,
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<void>) => {
      state.darkMode = !state.darkMode
    },
    setUserLogin: (state, action: PayloadAction<Student | Faculty | Business | null>) => {
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
        choices: [],
        required: 1
      }
      if (question.type !== SHORT_ANSWER) {
        question.choices = [
          {
            content: ''
          },
          {
            content: ''
          },
          {
            content: ''
          }
        ]
      }
      state.surveyPostRequest.questions = [...state.surveyPostRequest.questions, question]
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
      state.surveyPostRequest.questions[action.payload.questionIndex].choices.push({
        content: ''
      })
    },
    updateChoice: (state, action: PayloadAction<{ questionIndex: number; choiceIndex: number; choice: string }>) => {
      const { choiceIndex, questionIndex, choice } = action.payload
      state.surveyPostRequest.questions[questionIndex].choices[choiceIndex].content = choice
    },
    deleteChoice: (state, action: PayloadAction<{ questionIndex: number; choiceIndex: number }>) => {
      const data = action.payload
      if (state.surveyPostRequest) {
        state.surveyPostRequest.questions[data.questionIndex].choices.splice(data.choiceIndex, 1)
      }
    },
    resetChoices: (state, action: PayloadAction<void>) => {
      state.choices = ['', '', '']
    },
    setQuestionConducts: (state, action: PayloadAction<QuestionResponse[]>) => {
      state.questionConducts = action.payload
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
    },
    setDefaultLanguage: (state, action: PayloadAction<string>) => {
      state.defaultLanguage = action.payload
    },
    setCurrentScreenNowIsProfileScreen: (state, action: PayloadAction<boolean>) => {
      state.currentScreenNowIsProfileScreen = action.payload
    },
    goToProfileScreen: (state, action: PayloadAction<number>) => {
      state.userIdOfProfileNow = action.payload
    },
    setPostRejectId: (state, action: PayloadAction<number | null>) => {
      state.postRejectId = action.payload
    },
    setRejectLogResponse: (state, action: PayloadAction<PostRejectLogResponse | null>) => {
      state.rejectLogResponse = action.payload
    },
    setPreviousPage: (state, action: PayloadAction<string>) => {
      state.previousPage = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setDefaultLanguage,
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
  updatePostWhenHaveChangeComment,
  setQuestionConducts,
  goToProfileScreen,
  setCurrentScreenNowIsProfileScreen,
  setPostRejectId,
  setRejectLogResponse,
  setPreviousPage
} = TDCSocialNetworkSlice.actions

export default TDCSocialNetworkSlice.reducer
