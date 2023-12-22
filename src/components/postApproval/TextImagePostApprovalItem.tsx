import { useCallback } from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { ImageGalleryDisplay } from '../../types/ImageGalleryDispaly'
import { TextImagePostResponseModel } from '../../types/response/TextImagePostResponseModel'
import CustomizeBodyPost from '../post/CustomizeBodyPost'
import CustomizeImage from '../post/CustomizeImage'
import { ITranslationParams, useTranslation } from 'react-multi-lang'

interface TextImagePostApprovalItemProps {
    post: TextImagePostResponseModel
}

export default function TextImagePostApprovalItem(props: TextImagePostApprovalItemProps) {
    const t = useTranslation();
    const changeDataToImagGallerys = useCallback(() => {
        const newImagesGallerys: ImageGalleryDisplay[] = props.post.images.map((element) => ({
            original: SERVER_ADDRESS + 'api/images/' + element.uri,
            thumbnail: SERVER_ADDRESS + 'api/images/' + element.uri
        }))
        return newImagesGallerys
    }, [props.post.images])

    return (
        <>
            <CustomizeBodyPost t={t} content={props.post.content} />
            {props.post.images && props.post.images.length > 0 && <CustomizeImage images={changeDataToImagGallerys()} />}
        </>
    )
}
