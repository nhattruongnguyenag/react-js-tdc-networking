import React from 'react'
import { Dropdown } from 'flowbite-react'
import { Link } from 'react-router-dom'
import Header from '../components/common/Header'
import InputTextWithTitle from '../components/common/InputTextWithTitle'
import TextAreaWithTitle from '../components/common/TextAreaWithTitle'
import { BUSINESS_DASHBOARD_PAGE } from '../constants/Page'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import MultiQuestionMultiChoice from '../components/survey/MultiQuestionMultiChoice'
import MultiQuestionOneChoice from '../components/survey/MultiQuestionOneChoice'

export default function CreateSurveyPostPage() {
  const onBtnPublishSurveyPostPress = () => {}

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-wrap'>
          <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
            <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
              <Link className='d-inline-block mt-2' to={BUSINESS_DASHBOARD_PAGE}>
                <i className='ti-arrow-left font-sm text-white' />
              </Link>
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Thêm khảo sát</h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0 p-2'>
              <div className='row'>
                <InputTextWithTitle title='Tiêu đề' placeholder={'Nhập tiêu đề khảo sát...'} />

                <TextAreaWithTitle rows={10} placeholder='Nhập mô tả...' title='Mô tả' />
              </div>

              <p className='mont-font fw-600 font-xsss text-dark'>Câu hỏi</p>

              <ShortAnswerQuestion />
              <MultiQuestionMultiChoice />
              <MultiQuestionOneChoice />

              <div className='mt-3'>
                <Dropdown
                  className='z-50 text-black'
                  label=''
                  placement='top'
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <span className='cursor-pointer rounded-md bg-gradient-to-r from-cyan-600 to-cyan-500 px-4 py-2 text-white'>
                      Thêm câu hỏi
                    </span>
                  )}
                >
                  <Dropdown.Item onClick={() => {}}>Trả lời ngắn</Dropdown.Item>
                  <Dropdown.Item onClick={() => {}}>Trắc nghiệm</Dropdown.Item>
                  <Dropdown.Item onClick={() => {}}>Nhiều lựa chọn</Dropdown.Item>
                </Dropdown>
              </div>

              <div className='row'>
                <div className='col-lg-12 mb-0'>
                  <button
                    type='button'
                    className='font-xsss fw-600 w175 rounded-3 d-inline-block mt-3 bg-current p-3 text-center text-white'
                    onClick={() => onBtnPublishSurveyPostPress()}
                  >
                    Đăng bài viết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
