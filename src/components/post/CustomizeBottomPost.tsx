import React from 'react'
import { Like } from '../../types/Like'
import { Comment } from '../../types/Comment'
import { COMMENT_ACTION, LIKE_ACTION, SHOW_LIST_USER_REACTED } from '../../constants/Variables'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import DefaultAvatar from '../common/DefaultAvatar'


export interface BottomPostType {
  id: number
  userLoginId: number | undefined
  role: string
  handleClickBottomBtnEvent: (a: number | null) => void
  isLike: boolean
  comments: Comment[] | null
  likes: Like[]
  commentQty: number
}

const CustomizeBottomPost = (props: BottomPostType) => {
  const getLikeQty = (arrayList: Like[]): string => {
    let numberLikeHadFormat = ''
    const likeQty = arrayList.length
    if (likeQty >= 1000) {
      numberLikeHadFormat = likeQty / 1000 + 'K'
    } else {
      numberLikeHadFormat = likeQty + ''
    }
    return numberLikeHadFormat
  }

  return (
    <div className='card-body d-flex p-0'>
      <div className='emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2'>
        <button 
        className='like-button-bottom-wrapper'
        onClick={() => props.handleClickBottomBtnEvent(LIKE_ACTION)}>
          {props.isLike ? (
            <i className='feather-thumbs-up bg-primary-gradiant btn-round-xs font-xss me-1 text-white' />
          ) : (
            <i className='feather-thumbs-up btn-round-xs font-xss text-dark me-1' />
          )}
        {getLikeQty(props.likes)} Like
        </button>
      </div>
      <button
        onClick={() => props.handleClickBottomBtnEvent(COMMENT_ACTION)}
        className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'
      >
        <i className='feather-message-circle text-dark text-grey-900 btn-round-sm font-lg' />
        <span className='d-none-xss'>{props.commentQty} Comment</span>
      </button>

      <button
        onClick={() => props.handleClickBottomBtnEvent(SHOW_LIST_USER_REACTED)}
        className='pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss ms-auto '
        id='dropdownMenu32'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        {props.likes.map((item, index) => (
          item.image != null ? <img
            key={item.id}
            src={SERVER_ADDRESS + 'api/images/' + item.image}
            alt='avatar'
            className='avatar-user-reacted-list shadow-sm me-1'
          /> : <DefaultAvatar key={item.id} name={item.name} size={35} styleBootstrap={'me-1'} />
        ))}
      </button>
    </div>
  )
}

export default CustomizeBottomPost
