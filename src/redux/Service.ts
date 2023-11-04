import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Conversation } from '../types/Conversation'
import { Data } from '../types/Data'
import { DeviceToken } from '../types/DeviceToken'
import { FCMNotificationRequest } from '../types/request/FCMNotificationRequest'
import { JobApplyRequest } from '../types/request/JobApplyRequest'
import { RecruitmentPostRequest } from '../types/request/RecruitmentPostRequest'
import { SurveyConductRequest } from '../types/request/SurveyConductRequest'
import { MessageResponseData } from '../types/response/MessageResponseData'
import { NotificationModel } from '../types/response/NotificationModel'
import { Post } from '../types/Post'
import { QuestionResponse } from '../types/response/QuestionResponse'
import { SurveyPostRequest } from '../types/request/SurveyPostRequest'

export const TDCSocialNetworkAPI = createApi({
  reducerPath: 'TDCSocialNetworkAPI',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_ADDRESS }),
  tagTypes: ['UserLogin'],
  endpoints: (builder) => ({
    getNotificationsUserById: builder.query<Data<NotificationModel[]>, { id: number }>({
      query: (data) => ({
        url: 'api/notifications/user',
        method: 'POST',
        body: data
      })
    }),
    getConversationsByUserId: builder.query<Conversation[], number>({
      query: (userId) => `api/conversations/${userId}`
    }),
    getQuestionsFromSurveyPost: builder.query<Data<{ questions: QuestionResponse[] }>, number>({
      query: (postId) => `api/posts/survey/${postId}`
    }),
    saveDeviceToken: builder.mutation<MessageResponseData, DeviceToken>({
      query: (data) => ({
        url: 'api/device-token',
        method: 'POST',
        body: data
      })
    }),
    sendFCMNotification: builder.mutation<MessageResponseData, FCMNotificationRequest>({
      query: (data) => ({
        url: 'api/fcm-notification',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }),
    addSurveyPost: builder.mutation<MessageResponseData, SurveyPostRequest>({
      query: (data) => ({
        url: 'api/posts/survey',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }),
    addRecruitmentPost: builder.mutation<MessageResponseData, RecruitmentPostRequest>({
      query: (data) => ({
        url: 'api/posts/recruitment',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }),
    getAllPosts: builder.query<Data<Post[]>, void>({
      query: () => 'api/posts'
    }),
    getFacultyPosts: builder.query<Data<Post[]>, { faculty: string }>({
      query: (faculty) => `api/posts/group/group_dien_dien_tu`
    }),
    getBusinessPosts: builder.query<Data<Post[]>, void>({
      query: () => 'api/posts/group/group_connect_business'
    }),
    getStudentPosts: builder.query<Data<Post[]>, void>({
      query: () => 'api/posts/group/group_tdc'
    }),
    addSurveyConductAnswer: builder.mutation<MessageResponseData, SurveyConductRequest>({
      query: (data) => ({
        url: 'api/posts/survey/conduct',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }),
    jobApply: builder.mutation<MessageResponseData, JobApplyRequest>({
      query: (data) => ({
        url: 'api/job/apply',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetNotificationsUserByIdQuery,
  useGetQuestionsFromSurveyPostQuery,
  useGetConversationsByUserIdQuery,
  useAddSurveyPostMutation,
  useSaveDeviceTokenMutation,
  useSendFCMNotificationMutation,
  useAddRecruitmentPostMutation,
  useGetAllPostsQuery,
  useGetFacultyPostsQuery,
  useGetBusinessPostsQuery,
  useGetStudentPostsQuery,
  useAddSurveyConductAnswerMutation,
  useJobApplyMutation
} = TDCSocialNetworkAPI
