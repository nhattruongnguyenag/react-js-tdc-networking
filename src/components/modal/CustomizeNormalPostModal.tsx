import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CreateNormalPost from '../post/CreateNormalPost'
import { TEXT_CREATE_NEW_POST, TEXT_CREATE_POST } from '../../constants/StringVietnamese'
import { t, useTranslation } from 'react-multi-lang'
export interface CreatePostModalType {
  t: ReturnType<typeof useTranslation>,
  show: boolean,
  onHide: () => void,
  group: number | null
}

export function CreatePostModal(props: Readonly<CreatePostModalType>) {
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header>
        <div className='header-modal'>
          <Modal.Title className='font-xss'>{t("ModalCreateNormalPost.modalCreateNormalPostTitle")}</Modal.Title>
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
      <CreateNormalPost
        t={props.t}
        onHide={props.onHide}
        group={props.group}
      />
    </Modal>
  )
}

const CreateNormalPostModal = (props: CreatePostModalType) => {
  const [modalShow, setModalShow] = useState(false)
  return (
    <>
      <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 pb-3 pe-4 ps-4 pt-4'>
        <div className='card-body p-0'>
          <button
            onClick={() => setModalShow(true)}
            className='font-xssss fw-600 text-grey-500 card-body d-flex align-items-center p-0'
          >
            <i className='btn-round-sm font-xs text-primary feather-edit-3 bg-greylight me-2' />
            {t("ModalCreateNormalPost.modalCreateNormalPostButton")}
          </button>
        </div>
      </div>
      <CreatePostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        group={props.group}
        t={props.t} />
    </>
  )
}
export default CreateNormalPostModal
