import { useCallback } from 'react'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { ImageGalleryDisplay } from '../../types/ImageGalleryDispaly'
import { TextImagePostResponseModel } from '../../types/response/TextImagePostResponseModel'
import CustomizeBodyPost from '../post/CustomizeBodyPost'
import CustomizeImage from '../post/CustomizeImage'

interface TextImagePostApprovalItemProps {
    post: TextImagePostResponseModel
}

export default function TextImagePostApprovalItem(props: TextImagePostApprovalItemProps) {
    const changeDataToImagGallerys = useCallback(() => {
        const newImagesGallerys: ImageGalleryDisplay[] = props.post.images.map((element) => ({
            original: SERVER_ADDRESS + 'api/images/' + element.uri,
            thumbnail: SERVER_ADDRESS + 'api/images/' + element.uri
        }))
        return newImagesGallerys
    }, [])

    return (
        <>
            <CustomizeBodyPost content={props.post.content} />
            {props.post.images && props.post.images.length > 0 && <CustomizeImage images={changeDataToImagGallerys()} />}
        </>
    )
}
