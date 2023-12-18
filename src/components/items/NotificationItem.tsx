import React, { useEffect, useState } from 'react'
import { Menu, MenuItem, MenuButton, ControlledMenu, useClick, useMenuState } from '@szhsin/react-menu'
import { FaEllipsisV, FaBullhorn, FaTimes, FaTablet } from 'react-icons/fa'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { Default } from 'react-toastify/dist/utils'
import DefaultAvatar from '../common/DefaultAvatar'
import moment from 'moment'
import { useTranslation } from 'react-multi-lang'
import { useAppSelector } from '../../redux/Hook'
import { ACCEPT_POST, CHANGE_PASSWORD_SUCCESS, CREATE_SURVEY, POST_LOG, REGISTER_SUCCESS, SAVE_POST, UPDATE_POST, USER_APPLY_JOB, USER_CHANGE_LANGUAGE, USER_COMMENT_POST, USER_CONDUCT_SURVEY, USER_CREATE_WATCH_JOB, USER_FOLLOW, USER_LIKE_POST, USER_REPLY_COMMENT, USER_UPDATE, USER_UPDATE_AVATAR } from '../../constants/TypeNotification';
export interface NotificationItemProps {
    id: any
    status: string
    dataValue: any
    type: string
    createdAt: any
    content: string
    userInteracted: any
    handleItem: (id: number) => void;
    handleIsNotRead: (id: number) => void;
    handleDelNotification: (id: number) => void;
    // handleItemCanNotClick: (id: number) => void;
}

export interface Value {
    header: string
    body: string
    image: string
    group: string
    defaultImage: string
    time: string
    canClick: boolean
    // header: tên của những thông báo có người tương tác
    // body: chứa nội dung thông báo
    // image: chứa hình của người tương tác hoặc là của mình
    // group: chỉ những thông báo có trả về bài viết ms có tên nhóm
    // defaultImage: chỉ những thông báo trả về do admin xử lý, trả về hình của admin
    // time: thời gian của thông báo
}

export default function NotificationItem(props: NotificationItemProps) {
    let item = props
    const t = useTranslation()
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const [value, setValue] = useState<Value>({
        header: '',
        body: '',
        image: '',
        group: '',
        defaultImage: '',
        time: '',
        canClick: false,
    })


    useEffect(() => {
        checkType()
    }, [props])

    const checkType = () => {
        switch (props.type) {
            // Thong bao dang ky thanh cong
            case REGISTER_SUCCESS:
                setValue({
                    ...value, defaultImage: 'admin',
                    header: '',
                    body: t('Notifications.register_success'),
                    image: '',
                    group: '',
                    time: props.createdAt
                })
                break
            // THong báo thay đổi mk
            case CHANGE_PASSWORD_SUCCESS:
                setValue({
                    ...value, defaultImage: 'admin',
                    header: '',
                    body: t('Notifications.change_password_success'),
                    image: '',
                    group: '',
                    time: props.createdAt
                })
                break

            // Doanh nghiệp đăng khảo sát
            case CREATE_SURVEY:
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name.length > 0 ? props.userInteracted.name[0] : '',
                    header: props.userInteracted.name,
                    body: t('Notifications.create_survey'),
                    image: props.userInteracted.image,
                    group: props.dataValue != null ? props.dataValue.group != null ? props.dataValue.group.name : '' : '',
                    time: props.createdAt,
                    canClick: true
                })
                break
            // Bài viết đã lưu
            case SAVE_POST:
                setValue({
                    ...value,
                    defaultImage: 'admin',
                    header: '',
                    body: t('Notifications.save_post'),
                    image: '',
                    group: props.dataValue != null ? props.dataValue.group != null ? props.dataValue.group.name : '' : '',
                    time: props.createdAt,
                    canClick: true
                })
                break
            // Người dùng like bài viết của mình
            case USER_LIKE_POST:
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name.length > 0 ? props.userInteracted.name[0] : '',
                    header: props.userInteracted.name,
                    body: t('Notifications.user_like_post'),
                    image: props.userInteracted.image,
                    group: props.dataValue != null ? props.dataValue.group != null ? props.dataValue.group.name : '' : '',
                    time: props.createdAt,
                    canClick: true
                })
                break
            // Người dùng comment bài viết của mình
            case USER_COMMENT_POST:
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name.length > 0 ? props.userInteracted.name[0] : '',
                    header: props.userInteracted.name,
                    body: t('Notifications.user_comment_post'),
                    image: props.userInteracted.image,
                    group: props.dataValue != null ? props.dataValue.group != null ? props.dataValue.group.name : '' : '',
                    time: props.createdAt,
                    canClick: true
                })
                break
            // Trả lời comment của mình trong bài viết
            case USER_REPLY_COMMENT:
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name.length > 0 ? props.userInteracted.name[0] : '',
                    header: props.userInteracted.name,
                    body: t('Notifications.user_reply_comment'),
                    image: props.userInteracted.image,
                    group: props.dataValue != null ? props.dataValue.group != null ? props.dataValue.group.name : '' : '',
                    time: props.createdAt,
                    canClick: true
                })
                break
            // Người trả lời khảo sát của mình
            case USER_CONDUCT_SURVEY:
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name.length > 0 ? props.userInteracted.name[0] : '',
                    header: props.userInteracted.name,
                    body: t('Notifications.user_conduct_survey'),
                    image: props.userInteracted.image,
                    group: props.dataValue != null ? props.dataValue.group != null ? props.dataValue.group.name : '' : '',
                    time: props.createdAt,
                    canClick: true
                })
                break
            // Bài viết không được duyệt
            case POST_LOG:
                setValue({
                    ...value,
                    defaultImage: 'admin',
                    header: '',
                    body: title_post_log(props),
                    image: '',
                    group: props.dataValue != null ? (props.dataValue.post != null ? (props.dataValue.post.group != null ? props.dataValue.post.group.name : '') : '') : '',
                    time: props.createdAt,
                    canClick: true
                })
                break
            // Bài viết đã được duyệt
            case ACCEPT_POST:
                setValue({
                    ...value,
                    defaultImage: 'admin',
                    header: '',
                    body: t('Notifications.accept_post'),
                    image: '',
                    group: props.dataValue != null ? props.dataValue.group != null ? props.dataValue.group.name : '' : '',
                    time: props.createdAt,
                    canClick: true
                })
                break
            // Cập nhật trang cá nhân 
            case USER_UPDATE:
                setValue({
                    ...value,
                    defaultImage: 'admin',
                    header: '',
                    body: t('Notifications.user_update'),
                    image: '',
                    group: '',
                    time: props.createdAt
                })
                break
            // Có người follow mình
            case USER_FOLLOW:
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name.length > 0 ? props.userInteracted.name[0] : '',
                    header: props.userInteracted.name,
                    body: t('Notifications.user_follow'),
                    image: props.userInteracted.image,
                    group: '',
                    time: props.createdAt
                })
                break
            // Thay đổi ngôn ngữ
            case USER_CHANGE_LANGUAGE:
                setValue({
                    ...value,
                    defaultImage: 'admin',
                    header: '',
                    body: t('Notifications.user_change_language'),
                    image: '',
                    group: '',
                    time: props.createdAt
                })
                break
            // Thông báo cho người nộp tuyển dụng
            case USER_APPLY_JOB:
                setValue({
                    ...value,
                    defaultImage: 'admin',
                    header: '',
                    body: `${t('Notifications.user_apply_job')} " ` + props.dataValue?.jobTitle + ' "',
                    image: props.dataValue != null ? props.dataValue.studentAvatar : '',
                    group: '',
                    time: props.createdAt,
                    canClick: true
                })
                break
            // Thông báo cho người đăng tuyển dụng có người tuyển dụng (Bài đăng tuyển dụng của mình)
            case USER_CREATE_WATCH_JOB:
                setValue({
                    ...value,
                    defaultImage: props.userInteracted.name.length > 0 ? props.userInteracted.name[0] : '',
                    header: props.userInteracted.name,
                    body: `${t('Notifications.user_create_watch_job')} " ` + props.dataValue.title + ' "',
                    image: props.userInteracted.image,
                    group: props.dataValue != null ? props.dataValue.group != null ? props.dataValue.group.name : '' : '',
                    time: props.createdAt,
                    canClick: true
                })
                break
            case USER_UPDATE_AVATAR:
                setValue({
                    ...value, defaultImage: 'admin',
                    header: '',
                    body: 'Bạn vừa cập nhật ảnh nền',
                    image: '',
                    group: '',
                    time: props.createdAt,
                })
                break
            default: <></>
                break
        }
    }

    const title_post_log = (props: any) => {
        let title = ''
        if (props.dataValue != null) {
            if (props.dataValue.post) {
                title += 'Bài viết: "'
                if (props.dataValue.post.title) {
                    if (props.dataValue.post.title > 15) {

                        title += props.dataValue.post.title.substring(0, 15) + '..." bị từ chối'
                    }
                } else {
                    title += props.dataValue.post.content
                }
            }

        } else {
            title = ''
        }
        return title
    }
    return (
        <div
            key={item.id}
            className='card bg-transparent-card w-100 itemNotification mb-0 border-0 ps-0'
            style={{ background: item.status == '0' ? '#e6e6e6' : '#fff', flexDirection: 'row', padding: 10 }}
            onClick={() => item.handleItem(item.id)}
        >
            <div className='image_item'>

                <img src='/assets/images/user-8.png' alt='user' />
            </div>
            <div className='content_item' >
                <h5 className='text-grey-900 fw-500 font-xsss lh-4 txt_content' >
                    <p className='txt_cnt' style={{ color: item.status == '0' ? '#000' : '#949393'}}>
                    
                        <p className='txt_content_notification_hasUser'>{value.header}</p>
                        <p className='txt_content_notification'>{value.body}</p>
                        <p className='txt_content_notification'>
                            <p className='txt_content_notification'>{value.group != '' ? t('Notifications.in_group') : '.'}</p></p>
                            <p className='txt_content_notification_hasUser'> {value.group != '' ? (value.group) + '.' : ''}</p>
                    </p>


                </h5>
                <h6 className='font-xssss text-grey-500 d-block txt_time' >
                    {moment(item.createdAt).fromNow()}
                </h6>
            </div>
            <Menu
                menuButton={
                    <MenuButton className='menu_btn '>
                        <FaEllipsisV />
                    </MenuButton>
                }
                transition
            >
                <MenuItem onClick={() => item.handleIsNotRead(item.id)}>
                    <FaBullhorn className='icon_option' />
                    {t('NotificationsComponent.unReadNotification')}
                </MenuItem>
                <MenuItem onClick={() => item.handleDelNotification(item.id)}>
                    <FaTimes className='icon_option' />
                    {t('NotificationsComponent.deleteNotification')}
                </MenuItem>
            </Menu>
        </div>
    )
}
