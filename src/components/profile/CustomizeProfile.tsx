import React from 'react'
import { TEXT_UN_UPDATE, TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../../constants/StringVietnamese'
import CustomizeBodyStudentProfile from './CustomizeBodyStudentProfile'
import CustomizeHeaderProfile from './CustomizeHeaderProfile'
import CustomizeBodyBusinessProfile from './CustomizeBodyBusinessProfile'
import CustomizeBodyFacultyProfile from './CustomizeBodyFacultyProfile'

export interface CustomizeProfileType {
    data: Object[]
    role: string
    userData: any
    isFollow: boolean,
    isSameUser: boolean,
    handleClickButtonEvent: (a: number) => void
    handleClickIntoHeaderComponentEvent: (a: number) => void,
}

export default function CustomizeProfile(props: Readonly<CustomizeProfileType>) {
    const getBody = () => {
        let body;
        switch (props.role) {
            case TYPE_POST_STUDENT:
                body = <CustomizeBodyStudentProfile
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    position={props.userData.position ?? 'Sinh viên'}
                    phone={props.userData.phone ?? TEXT_UN_UPDATE}
                    email={props.userData.email ?? TEXT_UN_UPDATE}
                    numberPost={props.data.length ?? 0}
                    name={props.userData.name ?? TEXT_UN_UPDATE}
                    isFollow={props.isFollow}
                    isSameUser={props.isSameUser}
                />
                break;
            case TYPE_POST_BUSINESS:
                body = <CustomizeBodyBusinessProfile
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    timeWork={props.userData.timeWork ?? TEXT_UN_UPDATE}
                    TaxIdentificationNumber={props.userData.TaxIdentificationNumber ?? TEXT_UN_UPDATE}
                    representative={props.userData.representative ?? TEXT_UN_UPDATE}
                    address={props.userData.address ?? TEXT_UN_UPDATE}
                    phone={props.userData.phone ?? TEXT_UN_UPDATE}
                    email={props.userData.email ?? TEXT_UN_UPDATE}
                    name={props.userData.name}
                    numberPost={props.data.length ?? 0}
                    isFollow={props.isFollow}
                    isSameUser={props.isSameUser}
                />
                break;
            case TYPE_POST_FACULTY:
                body = <CustomizeBodyFacultyProfile
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    timeWork={props.userData.timeWork ?? TEXT_UN_UPDATE}
                    address={props.userData.address ?? TEXT_UN_UPDATE}
                    phone={props.userData.phone ?? TEXT_UN_UPDATE}
                    email={props.userData.email ?? TEXT_UN_UPDATE}
                    name={props.userData.name ?? TEXT_UN_UPDATE}
                    numberPost={props.data.length ?? 0}
                    isFollow={props.isFollow}
                    isSameUser={props.isSameUser}
                />
                break;
            default:
                break;
        }
        return body
    }


    return (
        <div className='card w-100 shadow-xss rounded-xxl mb-3 mt-3 border-0 p-4'>
            <div className='snippet me-auto ms-auto mt-2' data-title='.dot-typing'>
                {
                    props.userData && <CustomizeHeaderProfile
                        background={props.userData.background}
                        avatar={props.userData.image}
                        name={props.userData.name}
                        handleClickIntoHeaderComponentEvent={
                            props.handleClickIntoHeaderComponentEvent
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
