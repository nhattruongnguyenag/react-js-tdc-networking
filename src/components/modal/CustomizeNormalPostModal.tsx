import React from 'react'
import { Modal } from 'react-bootstrap'
import CreateNormalPost from './CreateNormalPost'
import { t, useTranslation } from 'react-multi-lang'
import { UpdateNormalPost } from '../../types/UpdateNormalPost'
export interface CreatePostModalType {
  t: ReturnType<typeof useTranslation>,
  show: boolean,
  onHide: () => void,
  group: number | null,
  updateNormalPost: UpdateNormalPost | null
}

export function CreatePostModal(props: Readonly<CreatePostModalType>) {
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header>
        <div className='header-modal'>
          <Modal.Title className='font-xss'>{props.updateNormalPost ? t("ModalCreateNormalPost.modalUpdateNormalPostTitle") : t("ModalCreateNormalPost.modalCreateNormalPostTitle")}</Modal.Title>
          <button
            style={{ position: 'absolute', top: 0, right: 20 }}
            type='button'
            className='btn-close-modal-header close font-xl buttonModalCustomizeHeaderToClose'
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
        updateNormalPost={props.updateNormalPost}
      />
    </Modal>
  )
}