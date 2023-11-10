import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { TEXT_CREATE_POST } from '../../constants/StringVietnamese'

export interface MyVerticallyCenteredModalType {
    show: boolean
    onHide: () => void,
}

export function MyVerticallyCenteredModal(props: Readonly<MyVerticallyCenteredModalType>) {
    return (
        <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Header>
                <div className='header-modal'>
                    <Modal.Title className='font-xss'>{TEXT_CREATE_POST}</Modal.Title>
                    <button
                        style={{ position: 'absolute', top: 0, right: 0 }}
                        type='button'
                        className='btn-close-modal-header close font-xl'
                        onClick={props.onHide}
                    >
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </div>
            </Modal.Header>
        </Modal>
    )
}

interface CustomizeModalCommentsType {
    visible: boolean
}

const CustomizeModalComments = (props: CustomizeModalCommentsType) => {
    const [modalShow, setModalShow] = useState(props.visible)
    return (
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    )
}

export default CustomizeModalComments
