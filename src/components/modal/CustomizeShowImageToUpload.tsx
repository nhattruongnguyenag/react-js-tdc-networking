import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { bigLoading } from '../../constants/Variables';
import { useTranslation } from 'react-multi-lang';

interface ModalType {
    isBackground: boolean
    name: string
    image: string
    show: boolean
    onSelectImage: (isBackground: boolean, flag: boolean) => void
    onHide: () => void
}
export function CustomizeShowImageToUpload(props: Readonly<ModalType>) {
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
                        src={props.image}
                        alt="Your Image"
                        onLoad={handleImageLoad}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    props.onHide();
                    setIsImageLoaded(false);
                    props.onSelectImage(props.isBackground, false);
                }} className='btn bg-grey text-dark outline-none border-0'>{t("Modal.modalShowImageUpdateRejectUpdateButton")}</Button>
                <Button onClick={() => {
                    props.onHide();
                    setIsImageLoaded(false);
                    props.onSelectImage(props.isBackground, true);
                }} className='btn bg-primary outline-none border-0'>{t("Modal.modalShowImageUpdateAcceptUpdateButton")}</Button>
            </Modal.Footer>
        </Modal>

    );
}
