import React, { useState, useRef, useEffect } from "react"
import { TEXT_DETAILED_WARNING_CONTENT_NULL, TEXT_PLACEHOLDER_CONTENT_CREATE_POST, TEXT_CREATE_POST_FAIL, TEXT_DETAILED_WARNING_CONTENT_NUMBER_LIMITED, TEXT_CREATE_POST_SUCCESS, TEXT_CHAR } from "../constants/StringVietnamese";
import { isBlank, isLengthInRange, isNotBlank } from '../utils/ValidateUtils'
import { handleUploadImage } from "../utils/UploadUtils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { API_URL_NORMAL_POST } from "../constants/Path";
import { NUMBER_MAX_CHARACTER, NUMBER_MIN_CHARACTER, TYPE_NORMAL_POST } from "../constants/Variables";
import { useAppSelector } from "../redux/Hook";
import { NormalPost } from "../types/NormalPost";
import { COLOR_BTN_BLUE, COLOR_WHITE } from "../constants/Color";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface CreateNormalPostType {
  onHide: () => void
}
const CreateNormalPost = (props: CreateNormalPostType) => {
  // variable
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<object[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [normalPost, setNormalPost] = useState<NormalPost>({
    userId: userLogin?.id,
    type: TYPE_NORMAL_POST,
    groupId: 1,
    images: undefined,
    content: undefined
  });

  // Function 
  useEffect(() => {
    textAreaRef.current?.focus();
  }, [])

  const handleSubmitEvent = () => {
    if (isNotBlank(content?.trim()) && isLengthInRange(content.trim(), NUMBER_MIN_CHARACTER, NUMBER_MAX_CHARACTER)) {
      let fakeNames: string[] = [];
      if (images) {
        const promises = images.map((item: any) => {
          return new Promise<void>((resolve) => {
            const fileList = new DataTransfer();
            fileList.items.add(item.file);
            handleUploadImage(fileList.files, (response) => {
              fakeNames.push(response.data + '');
              resolve();
            });
          });
        });
        Promise.all(promises).then(() => {
          createNormalPost(fakeNames);
        });
      } else {
        createNormalPost([]);
      }
    } else if (isBlank(content?.trim())) {
      toast.error(TEXT_DETAILED_WARNING_CONTENT_NULL);
    } else {
      toast.error(TEXT_DETAILED_WARNING_CONTENT_NUMBER_LIMITED + ' ' + NUMBER_MAX_CHARACTER + ' ' + TEXT_CHAR);
    }
  }

  // Send data action 
  const createNormalPost = (fakeImages: string[]) => {
    normalPost.images = fakeImages;
    normalPost.content = content;
    axios.post(API_URL_NORMAL_POST, {
      type: normalPost.type,
      groupId: normalPost.groupId,
      images: normalPost.images,
      userId: normalPost.userId,
      content: normalPost.content
    }).then((response) => {
      if (response.data.status === 201) {
        toast.success(TEXT_CREATE_POST_SUCCESS);
        resetData();
        disable();
        setTimeout(() => {
          props.onHide()
        }, 2000)
      } else {
        toast.success(TEXT_CREATE_POST_FAIL);
      }
    }).catch((error) => {
      toast.error(error);
    })
  }

  const disable = () => {
    buttonRef.current?.setAttribute("disabled", "");
    textAreaRef.current?.setAttribute("disabled", "");
    buttonCallPickerImgRef.current?.setAttribute("disabled", "");
  }

  const resetData = () => {
    setContent('');
    setImages([]);
  }

  const handleGetFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFilePickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      let urls: object[] = []
      for (let i = 0; i < event.target.files.length; i++) {
        urls.push({
          url: URL.createObjectURL(event.target.files[i]),
          file: event.target.files[i]
        })
      }
      images.length != 0 ? setImages([...images, ...urls]) : setImages(urls)
    }
  }

  const scrollLeft = () => {
    const container = document.getElementById('imageContainer');
    if (container) {
      container.scrollLeft -= 200;
      setScrollPosition(container.scrollLeft);
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('imageContainer');
    if (container) {
      container.scrollLeft += 200;
      setScrollPosition(container.scrollLeft);
    }
  };

  const handleDeleteImage = (img: any) => {
    const newImages = images.filter((item: any) => item.url !== img.url);
    setImages(newImages);
  }

  return <>
    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 pb-3 pe-4 ps-4 pt-4'>
      <div className='card-body position-relative mt-3 p-0'>
        <textarea
          ref={textAreaRef}
          value={content}
          onChange={(value) => { setContent(value.target.value) }}
          name='message'
          className='h100 bor-0 w-100 h-100 rounded-xxl font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg p-3'
          cols={30}
          rows={10}
          placeholder={TEXT_PLACEHOLDER_CONTENT_CREATE_POST}
          defaultValue={''}
        />
      </div>
      <div style={{ position: 'relative' }}>
        {
          images.length >= 6 && <><div className="container-button-to-left-right">
            <button onClick={scrollLeft}> <FontAwesomeIcon icon={faChevronLeft} size="2x" color={COLOR_BTN_BLUE} /></button>
            <button onClick={scrollRight}> <FontAwesomeIcon icon={faChevronRight} size="2x" color={COLOR_BTN_BLUE} /></button>
          </div></>
        }
        <div className="image-file-container" id="imageContainer">
          {images.map((item: any, index: any) => (
            <li
              key={item + ''}
              className='image-wrapper card d-block shadow-xss rounded-xxxl mb-3 me-3  mt-0 overflow-hidden border-0'
            >
              <img className="image-file" src={item.url} alt={`Image ${index}`} />
              <button
                className="btn-delete-image"
                onClick={() => handleDeleteImage(item)}>
                <FontAwesomeIcon icon={faXmark} color={COLOR_WHITE} />
              </button>
            </li>
          ))}
        </div>
      </div>
      <div className='card-body d-flex mt-0 p-0'>
        <input type={'file'} multiple
          ref={fileInputRef}
          className='hidden'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFilePickerChange(event)} />
        <button
          ref={buttonCallPickerImgRef}
          onClick={handleGetFiles}
          className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
        >
          <i className='font-md text-success feather-image me-2' />
          <span className='d-none-xs'>Photo/Video</span>
        </button>
        <div
          className='pointer ms-auto '
          id='dropdownMenu4'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <button
            ref={buttonRef}
            onClick={handleSubmitEvent}
            className="btn btn-primary">
            <span className='d-none-xs'>Đăng bài viết</span>
          </button>
        </div>
      </div>
    </div>
    <ToastContainer />
  </>
}
export default CreateNormalPost