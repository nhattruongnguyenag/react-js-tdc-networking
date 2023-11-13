import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Data } from '../types/Data'
import { Student } from '../types/Student'
import { Token } from '../types/Token'
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isEmail,
  isLengthInRange,
  isPassword
} from '../utils/ValidateUtils'
import TextValidate from '../components/TextValidate'
import ReactLoading from 'react-loading'
import { handleUploadImage } from '../utils/UploadUtils'

interface RegisterStudent {
  name: InputTextValidate
  email: InputTextValidate
  studentCode: InputTextValidate
  major: InputTextValidate
  facultyName: InputTextValidate
  password: InputTextValidate
  confimPassword: InputTextValidate
}

const isAllFieldsValid = (validate: RegisterStudent): boolean => {
  let key: keyof RegisterStudent

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }
  return true
}

export default function StudentRegistationPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null)
  const [student, setStudent] = useState<
    Omit<Student, 'status' | 'roleCodes' | 'createdAt' | 'updatedAt' | 'isTyping' | 'isMessageConnect'>
  >({
    id: 0,
    password: '',
    code: Date.now().toString(),
    email: '',
    name: '',
    image: '',
    facultyName: '',
    major: '',
    studentCode: '',
    confimPassword: '',
    facultyGroupCode: '',
    facultyGroupId: 0
  })
  const [dataRequest, setDataRequest] = useState([
    {
      id: '',
      name: '',
      majors: [
        {
          id: '',
          name: ''
        }
      ]
    }
  ])
  const [dataNganhRequest, setDataNganhRequest] = useState([{ id: '', name: '' }])
  const [validate, setValidate] = useState<RegisterStudent>({
    name: {
      textError: 'Tên sinh viên không được để trống',
      isVisible: false,
      isError: true
    },
    email: {
      textError: 'Email không được để trống',
      isVisible: false,
      isError: true
    },
    studentCode: {
      textError: 'Mã số sinh viên không được để trống',
      isVisible: false,
      isError: true
    },
    facultyName: {
      textError: 'Tên khoa không được để trống',
      isVisible: false,
      isError: true
    },
    major: {
      textError: 'Vui lòng chọn khoa trước khi chọn ngành',
      isVisible: false,
      isError: true
    },
    password: {
      textError: 'Mật khẩu không được để trống',
      isVisible: false,
      isError: true
    },
    confimPassword: {
      textError: 'Nhập lại mật khẩu không được để trống',
      isVisible: false,
      isError: true
    }
  })

  const handleStudentNameChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: 'Tên sinh viên không được để trống'
          }
        })
      } else if (isContainSpecialCharacter(event.target.value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: 'Tên sinh viên không được chứa ký tự đặc biệt',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: 'Tên sinh viên không vượt quá 255 ký tự',
            isVisible: true
          }
        })
      } else {
        setStudent({ ...student, name: event.target.value })
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleStudentCodeChange = useCallback(
    (event: any) => {
      const stCode = new RegExp(/^[0-9]{5}[a-zA-Z]{2}[0-9]{4}$/)
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: 'Mã số sinh viên không được để trống'
          }
        })
      } else if (isContainSpecialCharacter(event.target.value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: 'Mã số sinh viên không được chứa ký tự đặc biệt'
          }
        })
      } else if (!stCode.test(event.target.value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: 'Mã sinh viên không đúng định dạng'
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 12)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: 'Mã sinh viên không vượt quá 255 ký tự'
          }
        })
      } else {
        setStudent({ ...student, studentCode: event.target.value })
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleCheckEmail = useCallback(() => {
    axios
      .post(SERVER_ADDRESS + `api/users/check?email=${student.email}`)
      .then((response) => {
        if (response.data.data == 0) {
          setValidate({
            ...validate,
            email: {
              ...validate.email,
              isError: true,
              textError: 'Email đã được được đăng ký! Vui lòng nhập email khác',
              isVisible: true
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [student.email])
  const handleEmailChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: 'Email không được để trống'
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: 'Email không vượt quá 255 ký tự'
          }
        })
      } else if (!isEmail(event.target.value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: 'Email sai định dạng'
          }
        })
      } else {
        setStudent({ ...student, email: event.target.value })
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handlePasswordChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: 'Mật khẩu không được để trống'
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 8)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: 'Mật khẩu không vượt quá 8 ký tự'
          }
        })
      } else if (!isPassword(event.target.value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: 'Mật khẩu sai định dạng'
          }
        })
      } else {
        setStudent({ ...student, password: event.target.value })
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleConfirmPasswordChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: true,
            isError: true,
            textError: 'Trường nhập lại mật khẩu không được để trống'
          }
        })
      } else if (event.target.value != student.password) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: true,
            isError: true,
            textError: 'Mật khẩu không đúng'
          }
        })
      } else {
        setStudent({ ...student, confimPassword: event.target.value })
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: false,
            isError: false
          }
        })
      }
    },
    [validate]
  )
  const handleMajorNameChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          major: {
            ...validate.major,
            isError: true,
            isVisible: true,
            textError: 'Tên ngành không được để trống'
          }
        })
      } else {
        setStudent({ ...student, major: event.target.value })
        setValidate({
          ...validate,
          major: {
            ...validate.major,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleFacultyNameChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          facultyName: {
            ...validate.facultyName,
            isVisible: true,
            isError: true,
            textError: 'Tên khoa không được để trống'
          }
        })
      } else {
        setStudent({ ...student, facultyName: event.target.value })
        setValidate({
          ...validate,
          facultyName: {
            ...validate.facultyName,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + 'api/faculty')
      .then((response) => {
        setDataRequest(response.data.data)
        dataRequest.map((data) => {
          if (data.name == student.facultyName) {
            setDataNganhRequest(data.majors)
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [student])

  const onSelectUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setImage(URL.createObjectURL(event.target.files[0]))
      handleUploadImage(event.target.files, (response) => {
        console.log(response.data)
        setStudent({ ...student, image: response.data[0] })
      })
    }
  }

  const handleGetFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.showPicker()
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = () => {
    if (isAllFieldsValid(validate)) {
      setIsLoading(true)
      axios
        .post<Student, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/student/register', student)
        .then((response) => {
          setIsLoading(false)
          alert('Đăng ký thành công')
          navigate('/dang-nhap')
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
          toast.error('Đăng ký thất bại')
        })
    } else {
      let key: keyof RegisterStudent

      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true
        }
      }

      setValidate({ ...validate })
    }
  }

  return (
    <Fragment>
      <div className='main-wrap'>
        <div className='nav-header border-0 bg-transparent shadow-none'>
          <div className='nav-top w-100'>
            <a href='/'>
              <i className='feather-zap text-success display1-size me-2 ms-0'> </i>
              <span className='d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text mb-0 text-current'>
                TDCer
              </span>
            </a>
            <button className='nav-menu me-0 ms-auto'> </button>
          </div>
        </div>

        <div className='row'>
          <div
            className='col-xl-5 d-none d-xl-block vh-100 bg-image-cover bg-no-repeat p-0'
            style={{
              backgroundImage: `url("/assets/images/login-bg-2.jpg")`
            }}
          ></div>

          <div className='col-xl-7 vh-100 align-items-center d-flex rounded-3 overflow-hidden bg-white'>
            <div className='card login-card me-auto ms-auto border-0 shadow-none'>
              <div className='card-body rounded-0 text-left'>
                <h5 className='fw-700 display1-size display2-md-size mb-4'> Đăng ký sinh viên </h5>
                <form className='register'>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-user text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleStudentNameChange(e)}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder='Họ tên sinh viên...'
                      style={{ borderColor: !validate.name?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.name?.textError}
                      isError={validate.name?.isError}
                      isVisible={validate.name?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-pencil-alt text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleStudentCodeChange(e)}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder='Mã số sinh viên...'
                      style={{ borderColor: !validate.studentCode?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.studentCode?.textError}
                      isError={validate.studentCode?.isError}
                      isVisible={validate.studentCode?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-email text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleEmailChange(e)}
                      onBlur={() => handleCheckEmail()}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder='Địa chỉ Email'
                      style={{ borderColor: !validate.email?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.email?.textError}
                      isError={validate.email?.isError}
                      isVisible={validate.email?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input display-flex mb-3'>
                    <i className='font-sm ti-bag text-grey-500 pe-0 '> </i>
                    <select
                      className='style2-input form-control font-xsss fw-600 ps-5 pt-0'
                      onChange={(e) => handleFacultyNameChange(e)}
                      style={{ borderColor: !validate.facultyName?.isError ? '#228b22' : '#eee' }}
                    >
                      <option hidden>Khoa</option>
                      {dataRequest.map((item, index) => (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <TextValidate
                      textError={validate.facultyName?.textError}
                      isError={validate.facultyName?.isError}
                      isVisible={validate.facultyName?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-briefcase text-grey-500 pe-0'> </i>
                    <select
                      className='style2-input form-control font-xsss fw-600 ps-5 pt-0'
                      onChange={(e) => handleMajorNameChange(e)}
                      style={{ borderColor: !validate.major?.isError ? '#228b22' : '#eee' }}
                    >
                      <option hidden>Ngành</option>
                      {dataNganhRequest.map((item, index) => (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <TextValidate
                      textError={validate.major?.textError}
                      isError={validate.major?.isError}
                      isVisible={validate.major?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <input
                      type='Password'
                      onChange={(e) => handlePasswordChange(e)}
                      className='style2-input form-control text-grey-900 font-xss ls-3 ps-5'
                      placeholder='Mật khẩu'
                      style={{ borderColor: !validate.password?.isError ? '#228b22' : '#eee' }}
                    />
                    <i className='font-sm ti-lock text-grey-500 pe-0'> </i>{' '}
                    <TextValidate
                      textError={validate.password?.textError}
                      isError={validate.password?.isError}
                      isVisible={validate.password?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-1'>
                    <input
                      type='Password'
                      onChange={(e) => handleConfirmPasswordChange(e)}
                      className='style2-input form-control text-grey-900 font-xss ls-3 ps-5'
                      placeholder='Nhập lại mật khẩu'
                      style={{ borderColor: !validate.confimPassword?.isError ? '#228b22' : '#eee' }}
                    />
                    <i className='font-sm ti-lock text-grey-500 pe-0'> </i>{' '}
                    <TextValidate
                      textError={validate.confimPassword?.textError}
                      isError={validate.confimPassword?.isError}
                      isVisible={validate.confimPassword?.isVisible}
                    />
                  </div>
                  <div className='d-flex mt-3 p-0'>
                    <input
                      type={'file'}
                      multiple
                      ref={fileInputRef}
                      className='hidden'
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImage(event)}
                    />
                    <button
                      type='button'
                      className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
                      onClick={handleGetFiles}
                      ref={buttonCallPickerImgRef}
                    >
                      <i className='font-md text-success feather-image me-2'></i>
                      <span className='d-none-xs'>Ảnh đại diện</span>
                    </button>
                  </div>
                  <div className='img'>{image ? <img src={image} className='avatar' /> : ''}</div>
                </form>

                <div className='col-sm-12 p-0 text-center'>
                  <div className='form-group mb-1 mt-4'>
                    <div className='gr'>
                      <button
                        className='form-control style2-input fw-600 bg-blue border-0 p-0 text-center text-white'
                        onClick={() => onSubmit()}
                      >
                        Đăng ký
                      </button>
                      <div className='loading' style={{ display: isLoading ? 'flex' : 'none' }}>
                        <ReactLoading type='bubbles' color='#ffff' height={50} width={50} />
                      </div>
                    </div>
                  </div>
                  <h6 className='text-grey-500 font-xsss fw-500 lh-32 mb-0 mt-0'>
                    Đã có tài khoản?
                    <button className='fw-700 txt-blue ms-1' onClick={() => navigate('/dang-nhap')}>
                      Đăng nhập
                    </button>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={5000} transition={Bounce} position='top-right' />
    </Fragment>
  )
}
