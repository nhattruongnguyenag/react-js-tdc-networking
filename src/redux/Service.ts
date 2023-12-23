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
import { QuestionResponse, SurveyResponse } from '../types/response/QuestionResponse'
import { SurveyPostRequest } from '../types/request/SurveyPostRequest'
import { FollowUserModel } from '../types/response/FollowUserModel'
import { SurveyItemResult } from '../types/response/SurveyResult'
import { JobApplyRespose } from '../types/response/JobApplyResponse'
import { JobApplyResponseData } from '../types/response/JobApplyResponseData'
import { JobApplyUpdateRequest } from '../types/request/JobApplyUpdateRequest'
import { JobUpdateStatus } from '../types/request/JobUpdateStatus'
import { PostSavedModel } from '../types/response/PostSavedModel'
import { PostResponseModel } from '../types/response/PostResponseModel'
import { PostSearchRequest } from '../types/request/PostSearchRequest'
import { buildPostSearchRequest } from '../utils/PostHelper'
import { PostRejectedLog } from '../types/PostRejectLog'
import { RecruitmentPost } from '../types/RecruitmentPost'
import { QualityNotificationModel } from '../types/response/QualityNotificationModel'
import { NormalPostUpdateRequest } from '../types/request/NormalPostUpdateRequest'
import { CountNewUpdateConversation } from '../types/response/CountNewUpdateConversation'

export const TDCSocialNetworkAPI = createApi({
  reducerPath: 'TDCSocialNetworkAPI',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_ADDRESS }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getDetailPost: builder.query<Data<Post[]>, { userId: number | undefined, postId: number | undefined }>({
      query: (data) => ({
        url: 'api/posts/get',
        method: 'POST',
        body: data
      })
    }),
    getQualityNotification: builder.query<Data<QualityNotificationModel[]>, { id: number }>({
      query: (data) => ({
        url: 'api/notifications/user/count',
        method: 'POST',
        body: data
      })
    }),
    getListPostSaved: builder.query<Data<PostSavedModel[]>, number>({
      query: (userId) => `api/posts/user/save/${userId}`
    }),
    getFollowerUser: builder.query<Data<FollowUserModel[]>, { id: number }>({
      query: (data) => ({
        url: 'api/users/follow/other',
        method: 'POST',
        body: data
      })
    }),
    getFollowingUser: builder.query<Data<FollowUserModel[]>, { id: number }>({
      query: (data) => ({
        url: 'api/users/follow/me',
        method: 'POST',
        body: data
      })
    }),
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
    getQuestionsFromSurveyPost: builder.query<Data<SurveyResponse>, { postId: number; userLogin: number }>({
      query: ({ postId, userLogin }) => `api/posts/survey?postId=${postId}&userLogin=${userLogin}`
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
    getFacultyPosts: builder.query<Data<Post[]>, { faculty: string; id: number }>({
      query: (data) => ({
        url: `api/posts/search?faculty=${data.faculty}&userLogin=${data.id}&group=none`,
        method: 'GET'
      })
    }),
    getFacultyAndStudentPosts: builder.query<Data<Post[]>, { faculty: string; id: number }>({
      query: (data) => ({
        url: `api/posts/search?group=${data.faculty}&userLogin=${data.id}`,
        method: 'GET'
      })
    }),
    getBusinessPosts: builder.query<Data<Post[]>, { id: number }>({
      query: (data) => ({
        url: `api/posts/search?group=group_connect_business&userLogin=${data.id}`,
        method: 'GET'
      })
    }),
    getStudentPosts: builder.query<Data<Post[]>, { id: number }>({
      query: (data) => ({
        url: `api/posts/search?group=group_tdc&userLogin=${data.id}`,
        method: 'GET'
      })
    }),
    getPostsById: builder.query<Data<any>, { userId: number; groupCode: string; userLogin: number }>({
      query: (data) => ({
        url: `api/posts/group/user/detail`,
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
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
    }),
    getSurveyResult: builder.query<Data<SurveyItemResult[]>, number>({
      query: (surveyPostId) => ({
        url: `api/posts/survey/${surveyPostId}/result`
      })
    }),
    getJobProfile: builder.query<Data<JobApplyRespose[]>, number | undefined>({
      query: (userId) => ({
        url: `api/job/user/${userId}`
      })
    }),
    getProfileApply: builder.query<Data<JobApplyResponseData[]>, number | undefined>({
      query: (postId) => ({
        url: `api/job/post/${postId}`
      })
    }),
    jobApplyUpdate: builder.mutation<MessageResponseData, JobApplyUpdateRequest | JobUpdateStatus>({
      query: (data) => ({
        url: 'api/job/update',
        method: 'PUT',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }),
    getPosts: builder.query<Data<PostResponseModel[]>, PostSearchRequest>({
      query: (data) => ({
        url: `api/posts/search?${buildPostSearchRequest(data)}`
      }),
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(({ id }) => ({ type: 'Posts' as const, id: id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
        }

        return [{ type: 'Posts' as const, id: 'LIST' }]
      }
    }),
    rejectPost: builder.mutation<MessageResponseData, PostRejectedLog>({
      query: (data) => ({
        url: 'api/approval/post/log',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: 'LIST' }])
    }),
    acceptPost: builder.mutation<MessageResponseData, { postId: number }>({
      query: (data) => ({
        url: 'api/posts/acceptance',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: 'LIST' }])
    }),
    getPostRejectLog: builder.query<Data<PostRejectedLog>, { postId: number }>({
      query: (data) => ({
        url: `api/approval/log/post/${data.postId}`
      })
    }),
    deletePost: builder.mutation<MessageResponseData, { postId: number }>({
      query: (data) => ({
        url: `api/posts/${data.postId}`,
        method: 'DELETE',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: 'LIST' }])
    }),
    getRecruitmentPostUpdate: builder.query<RecruitmentPost, { postId: number }>({
      query: (data) => ({
        url: `api/posts/recruitment/${data.postId}/update`
      })
    }),
    updateRecruitmentPost: builder.mutation<MessageResponseData, RecruitmentPost>({
      query: (data) => ({
        url: 'api/posts/recruitment',
        method: 'PUT',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: data.id }])
    }),
    getSurveyPostUpdate: builder.query<Data<SurveyPostRequest>, { postId: number }>({
      query: (data) => ({
        url: `api/posts/survey/${data.postId}/update`
      })
    }),
    updateNormalPost: builder.mutation<MessageResponseData, NormalPostUpdateRequest>({
      query: (data) => ({
        url: 'api/posts/normal',
        method: 'PUT',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: data.postId }])
    }),
    updateSurveyPost: builder.mutation<MessageResponseData, SurveyPostRequest>({
      query: (data) => ({
        url: 'api/posts/survey',
        method: 'PUT',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: -1 }])
    }),
    countNewUpdateConversations: builder.query<CountNewUpdateConversation, { userId: number }>({
      query: (data) => ({
        url: `api/conversation/count/user/${data.userId}`
      })
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCountNewUpdateConversationsQuery,
  useGetDetailPostQuery,
  useGetQualityNotificationQuery,
  useJobApplyUpdateMutation,
  useGetJobProfileQuery,
  useGetProfileApplyQuery,
  useGetListPostSavedQuery,
  useGetFollowerUserQuery,
  useGetSurveyResultQuery,
  useGetFollowingUserQuery,
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
  useGetPostsByIdQuery,
  useAddSurveyConductAnswerMutation,
  useJobApplyMutation,
  useGetPostRejectLogQuery,
  useGetPostsQuery,
  useRejectPostMutation,
  useAcceptPostMutation,
  useDeletePostMutation,
  useGetRecruitmentPostUpdateQuery,
  useGetSurveyPostUpdateQuery,
  useUpdateRecruitmentPostMutation,
  useUpdateSurveyPostMutation,
  useGetFacultyAndStudentPostsQuery,
  useUpdateNormalPostMutation
} = TDCSocialNetworkAPI
