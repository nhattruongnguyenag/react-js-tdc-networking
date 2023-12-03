import moment from 'moment'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { useAppSelector } from '../../redux/Hook'

interface ModalPostRejectReasonProps {
    show: boolean
    onHide: () => void
}

export default function ModalRejectDetails(props: ModalPostRejectReasonProps) {
    const { rejectLogResponse } = useAppSelector(state => state.TDCSocialNetworkReducer)

    return (
        <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Header>
                <div className='header-modal'>
                    <Modal.Title className='font-xss'>Chi tiết</Modal.Title>
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
                    <p>Nội dung: {rejectLogResponse?.content}</p>
                    <p className='text-sm font-thin mb-5'>Ngày tạo: {moment(rejectLogResponse?.createdAt).format('DD/MM/YYYY hh:mm a')}</p>
                </div>
            </Modal.Body>
        </Modal>
    )
}
