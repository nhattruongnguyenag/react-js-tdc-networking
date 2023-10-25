import React, { useState, useRef } from "react"
import { TEXT_PLACEHOLDER_CONTENT_CREATE_POST, TEXT_PLACEHOLDER_INPUT_COMMENT, TEXT_PLACEHOLDER_TITLE_CREATE_POST } from "../constants/StringVietnamese";

const CreateNormalPost = () => {

  // variable
  const [content, setContent] = useState<string>();
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Function 
  const handleSubmitEvent = () => {
    // Clear data
    const submitPost = {
      type: "thong - thuong",
      images: images,
      userId: 1,
      content: content,
    }
    console.log('====================================');
    console.log(JSON.stringify(submitPost));
    console.log('====================================');
  }

  const handleGetFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Xử lý khi người dùng chọn tệp ảnh
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileNames = Array.from(selectedFiles).map((file) => file.name);
      setImages(fileNames);
    }
  };
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
      <div className='card-body d-flex mt-0 p-0'>
        <input
          ref={fileInputRef}
          multiple
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
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
  </>
}

export default CreateNormalPost