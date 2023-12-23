import { useTranslation } from "react-multi-lang";
import { Like } from "../../types/Like";
import { Button, Modal } from "react-bootstrap";
import { getFacultyTranslated } from "../../utils/TranslateFaculty";
import DefaultAvatar from "../common/DefaultAvatar";
import { SERVER_ADDRESS } from "../../constants/SystemConstant";

interface ModalType {
    show: boolean,
    onHide: () => void,
    likes: Like[],
    t: ReturnType<typeof useTranslation>,
    handleClickToAvatarAndName: (userId: number) => void,
}

export function ModalUserLiked(props: Readonly<ModalType>) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <div className='header-modal'>
                    <Modal.Title className='font-xss'>{props.t("ModalUserLiked.modalUserLikedTitle")}</Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body>
                {
                    props.likes.map((item, index) => {
                        return Boolean(item.image) ?
                            <button
                                onClick={() => props.handleClickToAvatarAndName(item.id)}
                                className='userLikedWrapper' key={item.id}>
                                <img alt='avatar' className='avatar-user-reacted-list me-1 shadow-sm list-user-liked'
                                    src={SERVER_ADDRESS + 'api/images/' + item.image} />
                                <span>
                                    {getFacultyTranslated(item.name, props.t)}
                                </span>
                            </button> :
                            <button
                                onClick={() => props.handleClickToAvatarAndName(item.id)}
                                className='userLikedWrapper'>
                                <DefaultAvatar key={item.id} name={item.name} size={35} styleBootstrap={'me-1 list-user-liked'} />
                                <span>
                                    {getFacultyTranslated(item.name, props.t)}
                                </span>
                            </button>
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn bg-primary' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
