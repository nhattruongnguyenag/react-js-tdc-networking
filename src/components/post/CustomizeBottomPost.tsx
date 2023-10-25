import React from 'react'
import { Like } from '../../types/Like'
import { Comment } from '../../types/Comment'
import { COMMENT_ACTION, LIKE_ACTION, SHOW_LIST_USER_REACTED } from '../../constants/Variables'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'

export interface BottomPostType {
    id: number
    userLoginId: number | undefined
    role: string
    handleClickBottomBtnEvent: (a: number | null) => void
    isLike: boolean
    comments: Comment[] | null
    likes: Like[]
    commentQty: number
}

const CustomizeBottomPost = (props: BottomPostType) => {

    const getLikeQty = (arrayList: Like[]): string => {
        let numberLikeHadFormat = ''
        const likeQty = arrayList.length;
        if (likeQty >= 1000) {
            numberLikeHadFormat = likeQty / 1000 + 'K';
        } else {
            numberLikeHadFormat = likeQty + '';
        }
        return numberLikeHadFormat;
    }

    return (
        <>
            <div className='card-body d-flex p-0'>
                <div className='emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2'>
                    <button
                        onClick={() => props.handleClickBottomBtnEvent(LIKE_ACTION)}
                    >
                        {
                            props.isLike ? <>
                                <i className='feather-thumbs-up bg-primary-gradiant btn-round-xs font-xss me-1 text-white' />
                            </> : <>
                                <i className='feather-thumbs-up btn-round-xs font-xss me-1 text-dark' />
                            </>
                        }
                    </button>
                    {getLikeQty(props.likes)} Like
                </div>
                <div className='emoji-wrap pointer '>
                    <ul className='emojis list-inline mb-0'>
                        <li className='emoji list-inline-item'>
                            <i className='em em---1' />{' '}
                        </li>
                        <li className='emoji list-inline-item'>
                            <i className='em em-angry' />
                        </li>
                        <li className='emoji list-inline-item'>
                            <i className='em em-anguished' />{' '}
                        </li>
                        <li className='emoji list-inline-item'>
                            <i className='em em-astonished' />{' '}
                        </li>
                        <li className='emoji list-inline-item'>
                            <i className='em em-blush' />
                        </li>
                        <li className='emoji list-inline-item'>
                            <i className='em em-clap' />
                        </li>
                        <li className='emoji list-inline-item'>
                            <i className='em em-cry' />
                        </li>
                        <li className='emoji list-inline-item'>
                            <i className='em em-full_moon_with_face' />
                        </li>
                    </ul>
                </div>
                <button
                    onClick={() => props.handleClickBottomBtnEvent(COMMENT_ACTION)}
                    className='d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss'
                >
                    <i className='feather-message-circle text-dark text-grey-900 btn-round-sm font-lg' />
                    <span className='d-none-xss'>{props.commentQty} Comment</span>
                </button>

                <button
                    onClick={() => props.handleClickBottomBtnEvent(SHOW_LIST_USER_REACTED)}
                    className='pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss ms-auto '
                    id='dropdownMenu32'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                >
                    <img src={SERVER_ADDRESS + 'api/images/' + 'girl.png'} alt='avater' className='rounded-circle w35 shadow-sm' />
                    <img src={SERVER_ADDRESS + 'api/images/' + 'girl.png'} alt='avater' className='rounded-circle w35 shadow-sm ml-1' />
                    <img src={SERVER_ADDRESS + 'api/images/' + 'girl.png'} alt='avater' className='rounded-circle w35 shadow-sm ml-1' />
                </button>
                <div
                    className='dropdown-menu dropdown-menu-end rounded-xxl right-0 border-0 p-4 shadow-lg '
                    aria-labelledby='dropdownMenu32'
                >
                    <h4 className='fw-700 font-xss text-grey-900 d-flex align-items-center'>
                        Share{' '}
                        <i className='feather-x font-xssss btn-round-xs bg-greylight text-grey-900 me-2 ms-auto' />
                    </h4>
                    <div className='card-body d-flex p-0'>
                        <ul className='d-flex align-items-center justify-content-between mt-2'>
                            <li className='me-1'>
                                <span className='btn-round-lg pointer bg-facebook'>
                                    <i className='font-xs ti-facebook text-white' />
                                </span>
                            </li>
                            <li className='me-1'>
                                <span className='btn-round-lg pointer bg-twiiter'>
                                    <i className='font-xs ti-twitter-alt text-white' />
                                </span>
                            </li>
                            <li className='me-1'>
                                <span className='btn-round-lg pointer bg-linkedin'>
                                    <i className='font-xs ti-linkedin text-white' />
                                </span>
                            </li>
                            <li className='me-1'>
                                <span className='btn-round-lg pointer bg-instagram'>
                                    <i className='font-xs ti-instagram text-white' />
                                </span>
                            </li>
                            <li>
                                <span className='btn-round-lg pointer bg-pinterest'>
                                    <i className='font-xs ti-pinterest text-white' />
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className='card-body d-flex p-0'>
                        <ul className='d-flex align-items-center justify-content-between mt-2'>
                            <li className='me-1'>
                                <span className='btn-round-lg pointer bg-tumblr'>
                                    <i className='font-xs ti-tumblr text-white' />
                                </span>
                            </li>
                            <li className='me-1'>
                                <span className='btn-round-lg pointer bg-youtube'>
                                    <i className='font-xs ti-youtube text-white' />
                                </span>
                            </li>
                            <li className='me-1'>
                                <span className='btn-round-lg pointer bg-flicker'>
                                    <i className='font-xs ti-flickr text-white' />
                                </span>
                            </li>
                            <li className='me-1'>
                                <span className='btn-round-lg pointer bg-black'>
                                    <i className='font-xs ti-vimeo-alt text-white' />
                                </span>
                            </li>
                            <li>
                                <span className='btn-round-lg pointer bg-whatsup'>
                                    <i className='font-xs feather-phone text-white' />
                                </span>
                            </li>
                        </ul>
                    </div>
                    <h4 className='fw-700 font-xssss text-grey-500 d-flex align-items-center mb-3 mt-4'>Copy Link</h4>
                    <i className='feather-copy position-absolute right-35 font-xs text-grey-500 mt-3' />
                    <input
                        type='text'
                        placeholder='https://socia.be/1rGxjoJKVF0'
                        className='bg-grey text-grey-500 font-xssss lh-32 font-xssss fw-600 rounded-3 w-100 theme-dark-bg border-0 p-2'
                    />
                </div>
            </div>
        </>
    )
}

export default CustomizeBottomPost