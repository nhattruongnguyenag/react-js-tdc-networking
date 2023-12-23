import React, { useState, useRef, useEffect, memo } from 'react'
import { isBlank, isLengthInRange, isNotBlank } from '../../utils/ValidateUtils'
import { handleUploadImage } from '../../utils/UploadUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { API_URL_NORMAL_POST } from '../../constants/Path'
import { NUMBER_MAX_CHARACTER, NUMBER_MIN_CHARACTER, TYPE_NORMAL_POST } from '../../constants/Variables'
import { useAppSelector } from '../../redux/Hook'
import { NormalPost } from '../../types/NormalPost'
import { COLOR_BTN_BLUE, COLOR_WHITE } from '../../constants/Color'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createNorMalPostAPI } from '../../api/CallAPI'
import { t, useTranslation } from 'react-multi-lang'
import { UpdateNormalPost } from '../../types/UpdateNormalPost'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { setImagesUpload } from '../../redux/Slice'
import '../../assets/css/createNormalPost.css'
import { useUpdateNormalPostMutation } from '../../redux/Service'

export interface CreateNormalPostType {
  t: ReturnType<typeof useTranslation>,
  onHide: () => void,
  group: number | null,
  updateNormalPost: UpdateNormalPost | null
}
const CreateNormalPost = (props: CreateNormalPostType) => {
  const [updatePost, updatePostResponse] = useUpdateNormalPostMutation()
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<object[]>([])
  const [imagesUpdate, setImagesUpdate] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [postId, setPostId] = useState(-1);
  const [type, setType] = useState('thong-thuong');
  const [normalPost, setNormalPost] = useState<NormalPost>({
    userId: userLogin?.id ?? -1,
    type: TYPE_NORMAL_POST,
    groupId: props.group,
    images: [],
    content: ''
  })

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [])

  useEffect(() => {
    if (props.updateNormalPost != undefined) {
      setPostId(props.updateNormalPost.postId);
      setContent(props.updateNormalPost.content);
      // de xuat ra 
      const listImages1 = props.updateNormalPost.images.map((item: any) => { return { 'url': item.uri, file: {} } })
      setImages(listImages1)
      // de day len
      const listImages2 = props.updateNormalPost.images.map((item: any) => { return item.uri })
      setImagesUpdate(listImages2)
    }
  }, [])

  const handleSubmitEvent = async () => {
    if (isNotBlank(content?.trim()) && isLengthInRange(content.trim(), NUMBER_MIN_CHARACTER, NUMBER_MAX_CHARACTER)) {
      let fakeNames: string[] = [];
      if (images) {
        const promises = images.map((item: any) => {
          return new Promise<void>((resolve) => {
            if (item.file instanceof File) {
              const fileList = new DataTransfer();
              fileList.items.add(item.file);
              handleUploadImage(fileList.files, (response) => {
                fakeNames.push(response.data + '');
                resolve();
              });
            } else {
              resolve();
            }
          });
        });
        Promise.all(promises).then(async () => {
          if (props.updateNormalPost === null) {
            createNormalPost(fakeNames);
          } else {
            updateNormalPost(fakeNames);
          }
        });
      } else {
        createNormalPost([]);
      }
    } else if (isBlank(content?.trim())) {
      toast.error(props.t("Toast.toastNotifyContentNull"));
    } else {
      toast.error(props.t("Toast.toastNotifyNumberCharacterHadCrossLimitedNumberCharacterNull") + ' ' + NUMBER_MAX_CHARACTER + ' ' + props.t("Toast.toastNotifyNumberCharacter"));
    }
  }

  const updateNormalPost = async (fakeNames: string[]) => {
    const imageUpload = imagesUpdate;
    fakeNames.map((item) => {
      imageUpload.push(item);
    })
    const data = {
      postId: props.updateNormalPost?.postId ?? 0,
      content: content,
      images: imageUpload
    }
    updatePost(data);
  }
  const createNormalPost = async (fakeImages: string[]) => {
    normalPost.images = fakeImages
    normalPost.content = content
    const _data = {
      type: normalPost.type,
      groupId: normalPost.groupId,
      images: normalPost.images,
      userId: normalPost.userId,
      content: normalPost.content
    }
    const status = await createNorMalPostAPI(API_URL_NORMAL_POST, _data);
    if (status === 201) {
      toast.success(props.t("Toast.toastNotifyCreatePostSuccess"))
      resetData()
      disable()
      props.onHide()
    } else {
      toast.success(props.t("Toast.toastNotifyCreatePostUnSuccess"))
    }
  }

  useEffect(() => {
    if (updatePostResponse.data) {
      if (updatePostResponse.data.status == 201) {
        toast.success(props.t("Toast.toastUpdateProfileSuccess"))
        setImagesUpload([])
        resetData()
        disable()
        props.onHide()
      } else {
        toast.error(props.t("Toast.toastUpdateProfileUnSuccess"))
      }
    }
  }, [updatePostResponse.data])

  const disable = () => {
    buttonRef.current?.setAttribute('disabled', '')
    textAreaRef.current?.setAttribute('disabled', '')
    buttonCallPickerImgRef.current?.setAttribute('disabled', '')
  }

  const resetData = () => {
    setContent('')
    setImages([])
  }

  const handleGetFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }

  const onFilePickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      let urls: object[] = []
      for (let i = 0; i < event.target.files.length; i++) {
        urls.push({
          url: URL.createObjectURL(event.target.files[i]),
          file: event.target.files[i]
        })
      }
      images.length != 0 ? setImages([...images, ...urls]) : setImages(urls);
    }
  }

  const scrollLeft = () => {
    const container = document.getElementById('imageContainer')
    if (container) {
      container.scrollTo({
        left: container.scrollLeft - 200,
        behavior: 'smooth'
      });
      setScrollPosition(container.scrollLeft)
    }
  }

  const scrollRight = () => {
    const container = document.getElementById('imageContainer')
    if (container) {
      container.scrollTo({
        left: container.scrollLeft + 200,
        behavior: 'smooth'
      })
      setScrollPosition(container.scrollLeft)
    }
  }

  const handleDeleteImage = (img: any) => {
    const newImages = images.filter((item: any) => item.url !== img.url)
    setImages(newImages)
    const imageOldDelete = imagesUpdate.filter((item: any) => item !== img.url)
    setImagesUpdate(imageOldDelete);
  }

  return (
    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 pb-3 pe-4 ps-4 pt-4'>
      <div className='card-body position-relative mt-3 p-0'>
        <textarea
          ref={textAreaRef}
          value={content}
          onChange={(value) => {
            setContent(value.target.value)
          }}
          name='message'
          className='h100 bor-0 w-100 h-100 rounded-xxl font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg p-3'
          cols={30}
          rows={10}
          placeholder={props.t("ModalCreateNormalPost.modalCreateNormalPostPlaceholder")}
          defaultValue={''}
        />
      </div>
      <div style={{ position: 'relative' }}>
        {images.length >= 5 && (
          <div className='container-button-to-left-right'>
            <button onClick={scrollLeft}>
              {' '}
              <FontAwesomeIcon icon={faChevronLeft} size='2x' color={COLOR_BTN_BLUE} />
            </button>
            <button onClick={scrollRight}>
              {' '}
              <FontAwesomeIcon icon={faChevronRight} size='2x' color={COLOR_BTN_BLUE} />
            </button>
          </div>
        )}
        <div
          className='wrapperImageCreateNormalPost'
          id='imageContainer'
        >
          {
            props.updateNormalPost?.postId !== undefined ? (
              images.map((item: any, index: any) => (
                <div
                  key={item + ''}
                  style={{
                    minWidth: '150px',
                    height: '200px',
                    marginRight: '10px',
                  }}
                  className='image-wrapper card d-block shadow-xss rounded-xxxl mb-3 me-3  mt-0 overflow-hidden border-0'
                >
                  {
                    (typeof (item.url) === 'string' && item.url.includes("http")) ? <>
                      <img className='image-file' src={item.url} alt={`Image ${index}`} />
                    </> : <>
                      <img className='image-file' src={SERVER_ADDRESS + 'api/images/' + item.url} alt={`Image ${index}`} />
                    </>
                  }
                  <button className='btn-delete-image' onClick={() => handleDeleteImage(item)}>
                    <FontAwesomeIcon icon={faXmark} color={COLOR_WHITE} />
                  </button>
                </div>
              ))
            ) : (
              images.map((item: any, index: any) => (
                <div
                  style={{
                    minWidth: '150px',
                    height: '200px',
                    marginRight: '10px',
                  }}
                  key={item + ''}
                  className='image-wrapper card d-block shadow-xss rounded-xxxl mb-3 me-3  mt-0 overflow-hidden border-0'
                >
                  <img className='image-file' src={item.url} alt={`Image ${index}`} />
                  <button className='btn-delete-image' onClick={() => handleDeleteImage(item)}>
                    <FontAwesomeIcon icon={faXmark} color={COLOR_WHITE} />
                  </button>
                </div>
              ))
            )
          }
        </div>
      </div>
      <div className='card-body d-flex mt-0 p-0'>
        <input
          type={'file'}
          multiple
          ref={fileInputRef}
          className='hidden'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFilePickerChange(event)}
        />
        <button
          ref={buttonCallPickerImgRef}
          onClick={handleGetFiles}
          className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
        >
          <i className='font-md text-success feather-image me-2' />
          <span className='d-none-xs'>{props.t("ModalCreateNormalPost.modalCreateNormalPostEntryImages")}</span>
        </button>
        <div className='pointer ms-auto ' id='dropdownMenu4' data-bs-toggle='dropdown' aria-expanded='false'>
          {
            props.updateNormalPost === null ? <button ref={buttonRef} onClick={handleSubmitEvent} className='btn btn-primary'>
              <span className='d-none-xs'>{props.t("ModalCreateNormalPost.modalCreateNormalPostButton")}</span>
            </button> :
              <button ref={buttonRef} onClick={handleSubmitEvent} className='btn btn-primary'>
                <span className='d-none-xs'>{props.t("ModalCreateNormalPost.modalCreateNormalUpdatePostButton")}</span>
              </button>
          }
        </div>
      </div>
    </div>
  )
}
export default memo(CreateNormalPost)