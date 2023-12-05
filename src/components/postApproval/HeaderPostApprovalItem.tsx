import axios, { AxiosResponse } from 'axios'
import classNames from 'classnames'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { POST_UPDATE_ID } from '../../constants/KeyValue'
import {
  CREATE_RECRUITMENT_POST_PAGE,
  CREATE_SURVEY_POST_PAGE,
  UPDATE_SURVEY_POST_PAGE,
  USER_DETAILS_PAGE
} from '../../constants/Page'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useAppDispatch } from '../../redux/Hook'
import { useAcceptPostMutation, useDeletePostMutation } from '../../redux/Service'
import { setPostRejectId, setRejectLogResponse } from '../../redux/Slice'
import { Data } from '../../types/Data'
import { MenuOptionItem } from '../../types/MenuOptionItem'
import { PostResponseModel } from '../../types/response/PostResponseModel'
import { PostRejectLogResponse } from '../../types/response/RejectLogResponse'
import { slugify } from '../../utils/CommonUtls'
import { isRecruitmentPost, isSurveyPost } from '../../utils/PostHelper'
import DefaultAvatar from '../common/DefaultAvatar'
import PostOptionsMenu from '../menu/PostOptionsMenu'
import { POST_APPROVAL, POST_PENDING, POST_REJECT } from './PostApprovalItem'

const RECRUITMENT_BADGE_COLOR = 'bg-gray-200'
const SURVEY_BADGE_COLOR = 'bg-blue-200'
const TEXT_IMAGE_BADGE_COLOR = 'bg-green-300'

const ACCEPT_POST = 0
const REJECT_POST = 1
const UPDATE_POST = 2
const DELETE_POST = 3
const REJECT_POST_DETAIL = 4

interface HeaderPostApprovalItemProps {
  post: PostResponseModel
  type: number
}

export default function HeaderPostApprovalItem(props: HeaderPostApprovalItemProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [acceptPost, acceptPostResponse] = useAcceptPostMutation()
  const [deletePost, deletePostResponse] = useDeletePostMutation()
  const t = useTranslation()

  const handleClickToAvatarAndName = () => {
    const state = {
      userId: props.post.user.id,
      group: props.post.group.code
    }
    navigate(`${USER_DETAILS_PAGE}/${slugify(props.post.user.name)}-${props.post.user.id}`, { state })
  }

  const [badge, setBadge] = useState<{ color: string; content: string }>({
    color: TEXT_IMAGE_BADGE_COLOR,
    content: 'ModalPostRejectReason.default'
  })

  const menuOptions = useMemo<MenuOptionItem[]>(() => {
    let options: MenuOptionItem[] = [
      {
        type: ACCEPT_POST,
        name: t('HeaderPostApproveItem.acceptMenuItem'),
        visible: props.type === POST_APPROVAL
      },
      {
        type: REJECT_POST,
        name: t('HeaderPostApproveItem.rejectMenuItem'),
        visible: props.type === POST_APPROVAL,
        color: 'red'
      },
      {
        type: REJECT_POST_DETAIL,
        name: t('HeaderPostApproveItem.rejectDetail'),
        visible: props.type === POST_REJECT
      },
      {
        type: UPDATE_POST,
        name: t('HeaderPostApproveItem.editPost'),
        visible: props.type === POST_REJECT || props.type === POST_PENDING
      },
      {
        type: DELETE_POST,
        name: t('HeaderPostApproveItem.deletePost'),
        visible: props.type === POST_REJECT || props.type === POST_PENDING,
        color: 'red'
      }
    ]

    return options
  }, [])

  useEffect(() => {
    if (isSurveyPost(props.post)) {
      setBadge({
        color: SURVEY_BADGE_COLOR,
        content: 'ModalPostRejectReason.survey'
      })
    } else if (isRecruitmentPost(props.post)) {
      setBadge({
        color: RECRUITMENT_BADGE_COLOR,
        content: 'ModalPostRejectReason.recruitment'
      })
    }
  }, [props.post])

  const onStartRejectedPost = (postId: number) => {
    dispatch(setPostRejectId(postId))
  }

  const onAcceptPost = (postId: number | undefined) => {
    acceptPost({
      postId: postId ?? -1
    })
  }

  const onRejectDetailsPress = (postId?: number) => {
    axios
      .get<void, AxiosResponse<Data<PostRejectLogResponse>>>(SERVER_ADDRESS + `api/approval/log/post/${postId}`)
      .then((response) => {
        if (response.status == 200) {
          dispatch(setRejectLogResponse(response.data.data))
        }
      })
      .catch((err) => console.log(err))
  }

  const onDeletePost = (postId?: number) => {
    if (postId) {
      deletePost({ postId: postId })
    }
  }

  const onUpdatePost = (post?: PostResponseModel) => {
    if (post) {
      localStorage.setItem(POST_UPDATE_ID, JSON.stringify(props.post.id))
      if (isRecruitmentPost(props.post)) {
        navigate(CREATE_RECRUITMENT_POST_PAGE)
      } else if (isSurveyPost(props.post)) {
        navigate(`${UPDATE_SURVEY_POST_PAGE}/${slugify(props.post.title)}-${props.post.id}`, {state: props.post})
      }
    }
  }

  useEffect(() => {
    if (deletePostResponse.data) {
      toast(t('ModalPostRejectReason.successDeleteMessageContent'))
    }
  }, [deletePostResponse.data])

  useEffect(() => {
    if (acceptPostResponse.data) {
      toast(t('HeaderPostApproveItem.acceptPostSuccess'))
    }
  }, [acceptPostResponse.data])

  const handleClickMenuOption = (flag: number) => {
    switch (flag) {
      case ACCEPT_POST:
        onAcceptPost(props.post.id)
        break
      case REJECT_POST:
        onStartRejectedPost(props.post.id)
        break
      case REJECT_POST_DETAIL:
        onRejectDetailsPress(props.post.id)
        break
      case UPDATE_POST:
        onUpdatePost(props.post)
        break
      case DELETE_POST:
        onDeletePost(props.post.id)
        break
      default:
        console.log('invalid choice')
        return
    }
  }

  return (
    <>
      <div className='card-body d-flex w-100 m-0 p-0'>
        <div className='avatar-wrapper-header'>
          <button onClick={() => handleClickToAvatarAndName()}>
            {Boolean(props.post?.user.image) ? (
              <img
                src={SERVER_ADDRESS + 'api/images/' + props.post?.user.image}
                alt='avatar'
                className='avatar-user-header-post shadow-sm'
              />
            ) : (
              <DefaultAvatar name={props.post?.user.name ?? ''} size={45} styleBootstrap={undefined} />
            )}
          </button>
        </div>
        <div className='text-header-name-wrapper'>
          <h4
            className='fw-700 text-grey-900 font-xssss mt-1 cursor-pointer'
            onClick={() => handleClickToAvatarAndName()}
          >
            {props.post?.user.name}
          </h4>
          <div className='mt-1 flex flex-row'>
            <span className='d-block font-xssss fw-500 lh-3 text-grey-500 mt-1'>
              {props.post?.createdAt ? moment(props.post.createdAt).fromNow() : t('ModalPostRejectReason.isLoading')}
            </span>
            <span className={classNames('ms-2 rounded-full px-3 text-sm', badge.color)}>{t(badge.content)}</span>
          </div>
        </div>
        <PostOptionsMenu menuOptions={menuOptions} handleClickMenuOption={handleClickMenuOption} />
      </div>
    </>
  )
}
