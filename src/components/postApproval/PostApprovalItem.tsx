import React from 'react'
import { Modal } from 'react-bootstrap'
import { PostResponseModel } from '../../types/response/PostResponseModel'
import { isRecruitmentPost, isSurveyPost, isTextImagePost } from '../../utils/PostHelper'
import HeaderPostApprovalItem from './HeaderPostApprovalItem'
import RecruitmentPostApprovalItem from './RecruitmentPostApprovalItem'
import SurveyPostApprovalItem from './SurveyPostApprovalItem'
import TextImagePostApprovalItem from './TextImagePostApprovalItem'

export const POST_APPROVAL = 0
export const POST_PENDING = 1
export const POST_REJECT = 2

export interface PostApprovalItemProps {
  post: PostResponseModel
  onAcceptedPost?: (postId: number) => void
}

export default function PostApprovalItem(props: PostApprovalItemProps) {
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-3 mt-4'>
      <HeaderPostApprovalItem
        post={props.post} />

      <div>
        {isTextImagePost(props.post) && <TextImagePostApprovalItem post={props.post} />}
        {isRecruitmentPost(props.post) && <RecruitmentPostApprovalItem post={props.post} />}
        {isSurveyPost(props.post) && <SurveyPostApprovalItem post={props.post} />}
      </div>
    </div>
  )
}
