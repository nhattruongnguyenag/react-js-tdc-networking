import React from 'react'
import { CALL_ACTION, CLICK_CAMERA_AVATAR_EVENT, CLICK_CAMERA_BACKGROUND_EVENT, FOLLOW_ACTION, MESSENGER_ACTION, SEE_AVATAR, SEE_BACKGROUND, TYPE_SURVEY_POST } from '../../constants/Variables'
import { TEXT_UN_UPDATE, TYPE_POST_STUDENT } from '../../constants/StringVietnamese'
import CustomizeBodyStudentProfile from './CustomizeBodyStudentProfile'
import CustomizeHeaderProfile from './CustomizeHeaderProfile'

export interface CustomizeProfileType {
    data: Object[]
    role: string
    userData: any
}

export default function CustomizeProfile(props: Readonly<CustomizeProfileType>) {


    const handleClickButtonEvent = (flag: number) => {
        if (flag === MESSENGER_ACTION) {
            alert('chat');
        } else if (flag === FOLLOW_ACTION) {
            alert('follow');
        } else if (flag === CALL_ACTION) {
            alert('call');
        } else {
            handleClickIntoButtonMenu3dotEvent();
        }
    }

    const handleClickIntoButtonMenu3dotEvent = () => {
        alert('menu')
    }

    const handleClickIntoHeaderComponentEvent = (flag: number) => {
        switch (flag) {
            case CLICK_CAMERA_AVATAR_EVENT:
                console.log('CLICK_CAMERA_AVATAR_EVENT');
                break;
            case CLICK_CAMERA_BACKGROUND_EVENT:
                console.log('CLICK_CAMERA_BACKGROUND_EVENT');
                break;
            case SEE_AVATAR:
                console.log('SEE_AVATAR');
                break;
            case SEE_BACKGROUND:
                console.log('SEE_BACKGROUND');
                break;
            default:
                break;
        }
    }

    const getBody = () => {
        let body;
        switch (props.role) {
            case TYPE_POST_STUDENT:
                body = <CustomizeBodyStudentProfile
                    handleClickButtonEvent={handleClickButtonEvent}
                    position={props.userData.position ?? 'Sinh viên'}
                    phone={props.userData.phone ?? TEXT_UN_UPDATE}
                    email={props.userData.email ?? TEXT_UN_UPDATE}
                    numberPost={props.data.length ?? 0}
                    name={props.userData.name ?? TEXT_UN_UPDATE} />
                break;
            default:
                body = <div></div>;
                break;
        }
        return body
    }


    return (
        <div className='card w-100 shadow-xss rounded-xxl mb-3 mt-3 border-0 p-4 text-center'>
            <div className='snippet me-auto ms-auto mt-2' data-title='.dot-typing'>
                {
                    props.userData && <CustomizeHeaderProfile
                        background={props.userData.image}
                        avatar={props.userData.image}
                        name={props.userData.name}
                        handleClickIntoHeaderComponentEvent={
                            handleClickIntoHeaderComponentEvent
                        }
                    />
                }
            </div>
            <div>
                {
                    getBody()
                }
            </div>
        </div>
    )
}
