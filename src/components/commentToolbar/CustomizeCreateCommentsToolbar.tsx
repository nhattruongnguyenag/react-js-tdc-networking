import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { Textarea } from 'flowbite-react'
import { COLOR_WHITE } from '../../constants/Color'
import DefaultAvatar from '../common/DefaultAvatar'
import '../../assets/css/comments.css'
import { isBlank, isLengthInRange } from '../../utils/ValidateUtils'
import { NUMBER_MAX_CHARACTER, NUMBER_MIN_CHARACTER } from '../../constants/Variables'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-multi-lang'

interface CreateCommentsToolbarType {
    t:ReturnType<typeof useTranslation>,
    textCreateCommentOfButton: string,
    textCreateCommentPlaceholderInput: string,
    image: string,
    name: string,
    tagName: string,
    handleClickCreateCommentBtnEvent: (content: string, flag:boolean) => void
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
        if (isBlank(content.trim()) || !isLengthInRange(content.trim(), NUMBER_MIN_CHARACTER, NUMBER_MAX_CHARACTER)) {
            if (isBlank(content.trim())){
                toast.error(props.t("Toast.toastNotifyCommentNull")); 
            }else{
                toast.error(props.t("Toast.toastNotifyNumberCharacterHadCrossLimitedNumberCharacterNull") + ' ' + NUMBER_MAX_CHARACTER + ' ' +  props.t("Toast.toastNotifyNumberCharacter"));
            }
          } else {
            props.handleClickCreateCommentBtnEvent(content,true);
            setContent('');
          }
    }

    return (
        <div>
            <div className='containerCreateCommentToolbar'>
                {/* Avatar */}
                {
                    props.image ? <img
                        className='avatarCreateCommentToolbar avatarSetting' src={SERVER_ADDRESS + 'api/images/' + props.image} /> :
                        <div className='avatarCreateCommentToolbar'><DefaultAvatar name={props.name[0]} size={35} styleBootstrap={undefined} /></div>
                }
                {/* Text area */}
                <Textarea
                    ref={textAreaRef}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder={props.textCreateCommentPlaceholderInput}
                    className='textAreaCreateCommentToolbar bg-greylight'
                />
            </div>
            <button
                onClick={() => handleClickCreate()}
                className='btnSubmitComment bg-primary-gradiant'><span className='txtSubmitComments'>{props.textCreateCommentOfButton}</span><FontAwesomeIcon icon={faPaperPlane} size='1x' color={COLOR_WHITE} /></button>
        </div>
    )
}
