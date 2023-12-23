import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SERVER_ADDRESS } from '../../constants/SystemConstant';
import { useState } from 'react';
import { bigLoading } from '../../constants/Variables';
import { useTranslation } from 'react-multi-lang';

interface ModalType {
    typeImage: boolean
    name: string
    image: string
    show: boolean
    onHide: () => void
}
export function CustomizeModalShowImage(props: Readonly<ModalType>) {
    const t = useTranslation();
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size={props.typeImage ? 'xl' : undefined}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="fs-5">
                    {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className='wrapperImageModal'>
                    {!isImageLoaded && (
                        <div
                            className='wrapperLoadingOfModalImage'
                        >
                            {bigLoading}
                        </div>
                    )}
                    <img
                        className='imageModalShow'
                        style={{
                            opacity: isImageLoaded ? 1 : 0,
                        }}
                        src={SERVER_ADDRESS + 'api/images/' + props.image}
                        alt="Your Image"
                        onLoad={handleImageLoad}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    props.onHide();
                    setIsImageLoaded(false);
                }} className='btn bg-primary'>{t("Modal.modalShowImageCloseButton")}</Button>
            </Modal.Footer>
        </Modal>

    );
}
