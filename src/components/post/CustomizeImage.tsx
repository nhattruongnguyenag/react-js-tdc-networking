import React from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { ImageGalleryDisplay } from '../../types/ImageGalleryDispaly'

export interface CustomizeImageType {
  images: ImageGalleryDisplay[],
}
export default function CustomizeImage(props: Readonly<CustomizeImageType>) {
  return <div>{props.images.length != 0 && <ImageGallery items={props.images} />}</div>
}
