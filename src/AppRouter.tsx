import classNames from 'classnames'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  ACCEPT_SEND_EMAIL_PAGE,
  ADD_QUESTION_PAGE, APPROVAL_POST_PAGE, AUTHENTICATE_REGISTRATION_PAGE, BUSINESS_DASHBOARD_PAGE,
  CONVERSATION_PAGE,
  CREATE_RECRUITMENT_POST_PAGE,
  CREATE_SURVEY_POST_PAGE,
  DETAILS_JOB_APPLY,
  FACULTY_DASHBOARD_PAGE,
  FORGOT_PASSWORD_PAGE,
  FUNCTION_DESCRIPTION_PAGE,
  JOB_APPLY_PAGE,
  LIST_JOB_APPLY_PAGE,
  LOGIN_PAGE,
  MANAGEMENT_JOB_APPLY_PAGE,
  MESSAGE_PAGE,
  PENDING_POST_PAGE,
  RECRUITMENT_DETAILS_PAGE,
  REGISTER_BUSINESS_PAGE,
  REGISTER_PAGE,
  REGISTER_STUDENT_PAGE,
  REJECT_POST_PAGE,
  RESET_PASSWORD_PAGE,
  REVIEW_SURVEY_POST_PAGE,
  SEARCH_PAGE,
  SETTING_PAGE,
  STUDENT_DASHBOARD_PAGE,
  SURVEY_DETAILS_PAGE,
  SURVEY_RESULT_PAGE,
  UPDATE_SURVEY_POST_PAGE,
  USER_DETAILS_PAGE,
  POST_DETAIL,
  CHANGE_PASSWORD_PAGE,
  FACULTY_STUDENT_PAGE
} from './constants/Page'
import AcceptSendEmailPage from './pages/AcceptEmailPage'
import AddQuestionPage from './pages/AddQuestionPage'
import AuthenticateRegistrationPage from './pages/AuthenticateRegistrationPage'
import BusinessDashboardPage from './pages/BusinessDashboardPage'
import BusinessRegistationPage from './pages/BusinessRegistationPage'
import ChatPage from './pages/ChatPage'
import ConversationPage from './pages/ConversationPage'
import CreateRecruitmentPostPage from './pages/CreateRecruitmentPostPage'
import CreateSurveyPostPage from './pages/CreateSurveyPostPage'
import DetailIntroducePage from './pages/DetailedIntroducePage'
import DetailJobApply from './pages/DetailJobApply'
import FacultyDashboardPage from './pages/FacultyDashboardPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import IntroducePage from './pages/IntroducePage'
import JobApplyPage from './pages/JobApplyPage'
import ListJobApplyPage from './pages/ListJobApplyPage'
import LoginPage from './pages/LoginPage'
import ManagementJobApplyPage from './pages/ManagementJobApplyPage'
import NoPage from './pages/NoPage'
import RecruitmentDetailsPage from './pages/RecruitmentDetailsPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ReviewSurveyPostPage from './pages/ReviewSurveyPostPage'
import SearchPage from './pages/SearchPage'
import SelectTypeRegistationPage from './pages/SelectTypeRegistationPage'
import SettingPage from './pages/SettingPage'
import StudentDashboardPage from './pages/StudentDashboardPage'
import StudentRegistationPage from './pages/StudentRegistationPage'
import SurveyConductPage from './pages/SurveyConductPage'
import SurveyResultPage from './pages/SurveyResultPage'
import UserDetailsPage from './pages/UserDetailsPage'
import { useAppSelector } from './redux/Hook'

import { useEffect } from 'react'
import { setDefaultLanguage, setTranslations } from 'react-multi-lang'

import en from './translates/en.json'
import ja from './translates/jp.json'
import vi from './translates/vi.json'
import ApprovePostPage from './pages/ApprovePostPage'
import PendingPostPage from './pages/PendingPostPage'
import RejectPostsPage from './pages/RejectPostsPage'
import PostDetail from './pages/PostDetail'
import ChangePasswordPage from './pages/ChangePasswordPage'
import FacultyAndStudentPage from './pages/FacultyAndStudentPage'
import axios from 'axios'
import { SERVER_ADDRESS } from './constants/SystemConstant'
import moment from 'moment'

setTranslations({ vi, en, ja })
setDefaultLanguage('vi')
const locale = new Map<string, any>()
locale.set('vi', require('moment/locale/vi'))
locale.set('en', require('moment/locale/es'))
locale.set('ja', require('moment/locale/ja'))

export default function AppRouter() {
  const { darkMode } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const { defaultLanguage } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const { userLogin } = useAppSelector(state => state.TDCSocialNetworkReducer)
  useEffect(() => {
    setDefaultLanguage(defaultLanguage)
    moment.locale(defaultLanguage, locale.get(defaultLanguage))
  }, [defaultLanguage])
  return (
    <div className={classNames('color-theme-blue mont-font loaded', darkMode ? 'theme-dark' : ' theme-light')}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/' element={<IntroducePage />} />
            <Route path={LOGIN_PAGE} element={<LoginPage />} />
            <Route index path={BUSINESS_DASHBOARD_PAGE.toString()} element={<BusinessDashboardPage />} />
            <Route path={FACULTY_DASHBOARD_PAGE + '/:code'} element={<FacultyDashboardPage />} />
            <Route path={STUDENT_DASHBOARD_PAGE} element={<StudentDashboardPage />} />
            <Route path={CONVERSATION_PAGE} element={<ConversationPage />} />
            <Route path={MESSAGE_PAGE} element={<ChatPage />} />
            <Route path={SETTING_PAGE} element={<SettingPage />} />
            <Route path={SEARCH_PAGE} element={<SearchPage />} />
            <Route path={CREATE_RECRUITMENT_POST_PAGE} element={<CreateRecruitmentPostPage />} />
            <Route path={CREATE_SURVEY_POST_PAGE} element={<CreateSurveyPostPage />} />
            <Route path={UPDATE_SURVEY_POST_PAGE + '/:slug'} element={<CreateSurveyPostPage />} />
            <Route path={ADD_QUESTION_PAGE} element={<AddQuestionPage />} />
            <Route path={REVIEW_SURVEY_POST_PAGE} element={<ReviewSurveyPostPage />} />
            <Route path={REGISTER_BUSINESS_PAGE} element={<BusinessRegistationPage />} />
            <Route path={REGISTER_STUDENT_PAGE} element={<StudentRegistationPage />} />
            <Route path={REGISTER_PAGE} element={<SelectTypeRegistationPage />} />
            <Route path={FUNCTION_DESCRIPTION_PAGE} element={<DetailIntroducePage />} />
            <Route path={FORGOT_PASSWORD_PAGE} element={<ForgotPasswordPage />} />
            <Route path={ACCEPT_SEND_EMAIL_PAGE} element={<AcceptSendEmailPage />} />
            <Route path={RESET_PASSWORD_PAGE + '/:slug'} element={<ResetPasswordPage />} />
            <Route path={USER_DETAILS_PAGE + '/:slug'} element={<UserDetailsPage />} />
            <Route path={JOB_APPLY_PAGE + '/:slug'} element={<JobApplyPage />} />
            <Route path={RECRUITMENT_DETAILS_PAGE + '/:slug'} element={<RecruitmentDetailsPage />} />
            <Route path={SURVEY_DETAILS_PAGE + '/:slug'} element={<SurveyConductPage />} />
            <Route path={DETAILS_JOB_APPLY + '/:slug'} element={<DetailJobApply />} />
            <Route path={LIST_JOB_APPLY_PAGE + '/:slug'} element={<ListJobApplyPage />} />
            <Route path={SURVEY_RESULT_PAGE + '/:slug'} element={<SurveyResultPage />} />
            <Route path={MANAGEMENT_JOB_APPLY_PAGE + '/:slug'} element={<ManagementJobApplyPage />} />
            <Route path={AUTHENTICATE_REGISTRATION_PAGE + '/:slug'} element={<AuthenticateRegistrationPage />} />
            <Route path={APPROVAL_POST_PAGE} element={<ApprovePostPage />} />
            <Route path={CHANGE_PASSWORD_PAGE} element={<ChangePasswordPage />} />
            <Route path={PENDING_POST_PAGE} element={<PendingPostPage />} />
            <Route path={REJECT_POST_PAGE} element={<RejectPostsPage />} />
            <Route path={POST_DETAIL + '/:slug'} element={<PostDetail />} />
            <Route path={FACULTY_STUDENT_PAGE} element={<FacultyAndStudentPage />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
