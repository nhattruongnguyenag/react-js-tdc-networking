import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { Textarea } from 'flowbite-react'
import { TEXT_CREATE_COMMENTS, TEXT_PLACEHOLDER_INPUT_COMMENT } from '../../constants/StringVietnamese'
import { COLOR_WHITE } from '../../constants/Color'
import DefaultAvatar from '../common/DefaultAvatar'

interface CreateCommentsToolbarType {
    image: string,
    name: string,
    tagName: string,
    handleClickCreateCommentBtnEvent: (content: string) => void
}
export default function CustomizeCreateCommentsToolbar(props: Readonly<CreateCommentsToolbarType>) {
    const [content, setContent] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    useEffect(() => {
        textAreaRef.current?.focus()
    }, [])

    useEffect(() => {
    }, [props.tagName])

    const handleClickCreate = () => {
        setContent('');
        props.handleClickCreateCommentBtnEvent(content);
    }

    return (
        <div>
            <div className='containerCreateCommentToolbar'>
                {/* Avatar */}
                {
                    props.image ? <img
                        className='avatarCreateCommentToolbar' src={SERVER_ADDRESS + 'api/images/' + props.image} /> :
                        <div className='avatarCreateCommentToolbar'><DefaultAvatar name={props.name[0]} size={35} styleBootstrap={undefined} /></div>
                }
                {/* Text area */}
                <Textarea
                    ref={textAreaRef}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder={TEXT_PLACEHOLDER_INPUT_COMMENT}
                    className='textAreaCreateCommentToolbar bg-greylight'
                />
            </div>
            <button
                onClick={() => handleClickCreate()}
                className='btnSubmitComment bg-primary-gradiant'><span className='txtSubmitComments'>{TEXT_CREATE_COMMENTS}</span><FontAwesomeIcon icon={faPaperPlane} size='1x' color={COLOR_WHITE} /></button>
        </div>
    )
}
