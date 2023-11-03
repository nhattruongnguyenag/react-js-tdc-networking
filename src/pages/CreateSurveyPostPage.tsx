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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function CreateSurveyPostPage() {
  const onBtnPublishSurveyPostPress = () => { }

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

              <div className='flex flex-row items-center justify-between mt-5'>
                <Dropdown
                  className='z-50 text-black'
                  label=''
                  placement='top'
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <FontAwesomeIcon style={{ fontSize: 20, marginRight: 10 }} icon={icon({ name: 'plus' })} />
                      Thêm câu hỏi
                    </button>
                  )}
                >
                  <Dropdown.Item onClick={() => { }}>Trả lời ngắn</Dropdown.Item>
                  <Dropdown.Item onClick={() => { }}>Trắc nghiệm</Dropdown.Item>
                  <Dropdown.Item onClick={() => { }}>Nhiều lựa chọn</Dropdown.Item>
                </Dropdown>

                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-centerdark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FontAwesomeIcon style={{ fontSize: 18, marginRight: 10 }} icon={icon({ name: 'eye', style: 'regular' })} />
                    <span>Xem lại bài viết</span>
                </button>

                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-centerdark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Hoàn tất
                  <FontAwesomeIcon style={{ fontSize: 20, marginLeft: 10 }} icon={icon({ name: 'arrow-right' })} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
