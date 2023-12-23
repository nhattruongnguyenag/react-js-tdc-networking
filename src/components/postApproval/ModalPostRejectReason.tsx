import React, { useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-multi-lang'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { useRejectPostMutation } from '../../redux/Service'
import { setPostRejectId } from '../../redux/Slice'

interface ModalPostRejectReasonProps {
  show: boolean
  onHide: () => void,
}

export default function ModalPostRejectReason(props: ModalPostRejectReasonProps) {
  const t = useTranslation()
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const { postRejectId } = useAppSelector(state => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()

  const [rejectPost, rejectPostResponse] = useRejectPostMutation()

  const onCompleteRejectPost = () => {
    console.log(postRejectId, textAreaRef.current?.value)
    if (postRejectId && textAreaRef.current) {
      rejectPost({
        postId: postRejectId,
        content: textAreaRef.current.value
      })
      dispatch(setPostRejectId(null))
    }
  }

  useEffect(() => {
    if (rejectPostResponse.data) {
      toast(t('ModalPostRejectReason.rejectSuccessMessage'))
    }
  }, [rejectPostResponse.data])

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header>
        <div className='header-modal'>
          <Modal.Title className='font-xss'>Từ chối bài viết</Modal.Title>
          <button
            style={{ position: 'absolute', top: 0, right: 10 }}
            type='button'
            className='btn-close-modal-header close font-xl'
            onClick={props.onHide}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className='card-body position-relative mt-3 p-0'>
          <textarea
            ref={textAreaRef}
            name='message'
            className='h100 bor-0 w-100 h-100 rounded-xxl text-[16px] border-light-md theme-dark-bg p-3'
            cols={30}
            rows={10}
            placeholder={'Nhập lý do...'}
            defaultValue={''}
          />
        </div>

        <div className='d-flex' id='dropdownMenu4' data-bs-toggle='dropdown' aria-expanded='false'>
          <button onClick={() => onCompleteRejectPost()} className='btn btn-primary ms-auto mt-4'>
            <span className='d-none-xs'>{t('ModalPostRejectReason.buttonCompleteRejectPostTitle')}</span>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
