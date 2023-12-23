import React from 'react'
import { Like } from '../../types/Like'
import { Comment } from '../../types/Comment'
import { COMMENT_ACTION, LIKE_ACTION, SHOW_LIST_USER_REACTED } from '../../constants/Variables'
import DefaultAvatar from '../common/DefaultAvatar'
import { IMAGE_URL } from '../../constants/Path'

export interface BottomPostType {
  id: number,
  userLoginId: number | undefined,
  role: string,
  handleClickBottomBtnEvent: (a: number | null) => void,
  isLike: boolean,
  comments: Comment[] | null,
  likes: Like[],
  commentQty: number,
  textLike: string,
  textComments: string
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

  const getUserLikeQty = (arrayList: Like[]): string => {
    let numberLikeHadFormat = ''
    const numberUserLikeQty = arrayList.length - 3
    if (numberUserLikeQty > 9) {
      numberLikeHadFormat = '9 +'
    } else {
      numberLikeHadFormat = '+ ' + numberUserLikeQty
    }
    return numberLikeHadFormat;
  }

  const getListUserHadLike = () => {
    let userList;
    userList = props.likes.map((item, index) =>
      index < 3 ?
        Boolean(item.image) ? (
          <img
            key={item.id}
            src={IMAGE_URL + item.image}
            alt='avatar'
            className='avatar-user-reacted-list me-1 shadow-sm'
          />
        ) : (
          <DefaultAvatar key={item.id} name={item.name} size={35} styleBootstrap={'me-1'} />
        )
        : null
    )
    return userList
  }

  return (
    <div className='card-body d-flex p-0'>
      <div className='emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2'>
        <button className='like-button-bottom-wrapper' onClick={() => props.handleClickBottomBtnEvent(LIKE_ACTION)}>
          {props.isLike ? (
            <i className='feather-thumbs-up bg-primary-gradiant btn-round-xs font-xss me-1 text-white like' />
          ) : (
            <i className='feather-thumbs-up btn-round-xs font-xss text-dark me-1 unlike' />
          )}
          {getLikeQty(props.likes)} {props.textLike}
        </button>
      </div>
      <button
        onClick={() => props.handleClickBottomBtnEvent(COMMENT_ACTION)}
        className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'
      >
        <i className='feather-message-circle text-dark text-grey-900 btn-round-sm font-lg' />
        <span className='d-none-xss'>{props.commentQty} {props.textComments}</span>
      </button>

      <button
        onClick={() => props.handleClickBottomBtnEvent(SHOW_LIST_USER_REACTED)}
        className='pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss ms-auto '
        id='dropdownMenu32'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        {
          getListUserHadLike()
        }
        {
          props.likes.length > 3 ? <div className='avatar-user-reacted-list bg-greylight'>{getUserLikeQty(props.likes)}</div> : null
        }
      </button>
    </div>
  )
}

export default CustomizeBottomPost
