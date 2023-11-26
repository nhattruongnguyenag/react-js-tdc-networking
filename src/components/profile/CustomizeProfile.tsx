import React from 'react'
import CustomizeBodyStudentProfile from './CustomizeBodyStudentProfile'
import CustomizeHeaderProfile from './CustomizeHeaderProfile'
import CustomizeBodyBusinessProfile from './CustomizeBodyBusinessProfile'
import CustomizeBodyFacultyProfile from './CustomizeBodyFacultyProfile'
import { useTranslation } from 'react-multi-lang'
import { getFacultyTranslated } from '../../utils/TranslateFaculty'
import { TYPE_POST_BUSINESS, TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../../constants/StringVietnamese'

export interface CustomizeProfileType {
    t: ReturnType<typeof useTranslation>
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
                    position={props.userData.position ?? props.t("Profile.ProfileRole")}
                    phone={props.userData.phone ?? props.t("Profile.unUpdate")}
                    email={props.userData.email ?? props.t("Profile.unUpdate")}
                    numberPost={props.data.length ?? 0}
                    name={props.userData.name ?? props.t("Profile.unUpdate")}
                    isFollow={props.isFollow}
                    isSameUser={props.isSameUser}
                    t={props.t}
                />
                break;
            case TYPE_POST_BUSINESS:
                body = <CustomizeBodyBusinessProfile
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    timeWork={props.userData.timeWork ?? props.t("Profile.unUpdate")}
                    TaxIdentificationNumber={props.userData.TaxIdentificationNumber ?? props.t("Profile.unUpdate")}
                    representative={props.userData.representative ?? props.t("Profile.unUpdate")}
                    address={props.userData.address ?? props.t("Profile.unUpdate")}
                    phone={props.userData.phone ?? props.t("Profile.unUpdate")}
                    email={props.userData.email ?? props.t("Profile.unUpdate")}
                    name={props.userData.name}
                    numberPost={props.data.length ?? 0}
                    isFollow={props.isFollow}
                    isSameUser={props.isSameUser}
                    t={props.t}
                />
                break;
            case TYPE_POST_FACULTY:
                body = <CustomizeBodyFacultyProfile
                    handleClickButtonEvent={props.handleClickButtonEvent}
                    timeWork={props.userData.timeWork ?? props.t("Profile.unUpdate")}
                    address={props.userData.address ?? props.t("Profile.unUpdate")}
                    phone={props.userData.phone ?? props.t("Profile.unUpdate")}
                    email={props.userData.email ?? props.t("Profile.unUpdate")}
                    name={props.userData.name ?? props.t("Profile.unUpdate")}
                    numberPost={props.data.length ?? 0}
                    isFollow={props.isFollow}
                    isSameUser={props.isSameUser}
                    t={props.t}
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
                        name={getFacultyTranslated(props.userData.name, props.t)}
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
