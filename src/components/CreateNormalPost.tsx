import React, { useState, useRef } from "react"
import { TEXT_DETAILED_WARNING_CONTENT_NULL, TEXT_PLACEHOLDER_CONTENT_CREATE_POST, TEXT_DETAILED_WARNING_CONTENT_NUMBER_LIMITED, TEXT_CREATE_POST_SUCCESS } from "../constants/StringVietnamese";
import { isBlank, isLengthInRange, isNotBlank } from '../utils/ValidateUtils'
import { toast } from 'react-toastify';
import CustomizeToast from "./toast/CustomizeToast";
import { SERVER_ADDRESS } from "../constants/SystemConstant";
import { handleUploadImage } from "../utils/UploadUtils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { max, min } from "moment";

const CreateNormalPost = () => {
  // variable
  const [scrollPosition, setScrollPosition] = useState(0);
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  // Function 

  const handleSubmitEvent = () => {
    if (isNotBlank(content?.trim()) && isLengthInRange(content.trim(), 1, 1024)) {
      const submitPost = {
        type: "thong - thuong",
        images: images,
        userId: 1,
        content: content,
      }
      toast.success(TEXT_CREATE_POST_SUCCESS);

    } else if (isBlank(content?.trim())) {
      toast.error(TEXT_DETAILED_WARNING_CONTENT_NULL);
    } else {
      toast.error(TEXT_DETAILED_WARNING_CONTENT_NUMBER_LIMITED);
    }
  }

  const handleGetFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const onFilePickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const urls: string[] = []
      for (let i = 0; i < event.target.files.length; i++) {
        urls.push(URL.createObjectURL(event.target.files[i]))
      }
      setImages(urls);
      // Xử lý khi người dùng chọn tệp ảnh
      // const selectedFiles = event.target.files;
      // // upload
      // if (selectedFiles) {
      //   handleUploadImage(selectedFiles);
      //   // cho anh vao danh sach
      //   const fileNames = Array.from(selectedFiles).map((file) => file.name);
      //   setImages(fileNames);
      // }
    }
  }

  const handleDeleteImage = (img: string) => {
    alert(img);
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

  // Long click

  return <>
    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 pb-3 pe-4 ps-4 pt-4'>
      <div className='card-body position-relative mt-3 p-0'>
        <textarea
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
          images.length >= 6 && <><div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', left: 0, right: 0, bottom: '50%', zIndex: 999 }}>
            <button onClick={scrollLeft}> <FontAwesomeIcon icon={faArrowLeft} /></button>
            <button onClick={scrollRight}> <FontAwesomeIcon icon={faArrowRight} /></button>
          </div></>
        }
        <div style={{ display: 'flex', overflowX: 'hidden' }} id="imageContainer">
          {images.map((item: any, index: any) => (
            <li
              key={item + ''}
              style={{
                minWidth: '125px',
                height: '200px',
                position: 'relative'
              }}
              className='card d-block shadow-xss rounded-xxxl mb-3 me-3  mt-0 overflow-hidden border-0'
            >
              <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} src={item} alt={`Image ${index}`} />
              <button
                onClick={()=>handleDeleteImage}
                style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderRadius: 20, background: '#fff', color: 'black', borderWidth: 1, borderColor: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><p>x</p></button>
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
            onClick={handleSubmitEvent}
            className="btn btn-primary">
            <span className='d-none-xs'>Đăng bài viết</span>
          </button>
        </div>
        <div
          className='dropdown-menu rounded-xxl right-0 border-0 p-4 shadow-lg '
          aria-labelledby='dropdownMenu4'
        >
          <div className='card-body d-flex p-0'>
            <i className='feather-bookmark text-grey-500 font-lg me-3' />
            <h4 className='fw-600 text-grey-900 font-xssss pointer me-4 mt-0'>
              Save Link
              <span className='d-block font-xsssss fw-500 lh-3 text-grey-500 mt-1'>
                Add this to your saved items
              </span>
            </h4>
          </div>
          <div className='card-body d-flex mt-2 p-0'>
            <i className='feather-alert-circle text-grey-500 font-lg me-3' />
            <h4 className='fw-600 text-grey-900 font-xssss pointer me-4 mt-0'>
              Hide Post
              <span className='d-block font-xsssss fw-500 lh-3 text-grey-500 mt-1'>
                Save to your saved items
              </span>
            </h4>
          </div>
          <div className='card-body d-flex mt-2 p-0'>
            <i className='feather-alert-octagon text-grey-500 font-lg me-3' />
            <h4 className='fw-600 text-grey-900 font-xssss pointer me-4 mt-0'>
              Hide all from Group{' '}
              <span className='d-block font-xsssss fw-500 lh-3 text-grey-500 mt-1'>
                Save to your saved items
              </span>
            </h4>
          </div>
          <div className='card-body d-flex mt-2 p-0'>
            <i className='feather-lock text-grey-500 font-lg me-3' />
            <h4 className='fw-600 text-grey-900 font-xssss pointer mb-0 me-4 mt-0'>
              Unfollow Group{' '}
              <span className='d-block font-xsssss fw-500 lh-3 text-grey-500 mt-1'>
                Save to your saved items
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <CustomizeToast />
  </>
}

export default CreateNormalPost