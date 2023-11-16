import classNames from 'classnames'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  ADD_QUESTION_PAGE,
  BUSINESS_DASHBOARD_PAGE,
  CONVERSATION_PAGE,
  CREATE_RECRUITMENT_POST_PAGE,
  CREATE_SURVEY_POST_PAGE,
  FACULTY_DASHBOARD_PAGE,
  FUNCTION_DESCRIPTION_PAGE,
  JOB_APPLY_PAGE,
  LIST_FOLLOW_PAGE,
  LOGIN_PAGE,
  MESSAGE_PAGE,
  RECRUITMENT_DETAILS_PAGE,
  REGISTER_BUSINESS_PAGE,
  REGISTER_PAGE,
  REGISTER_STUDENT_PAGE,
  REVIEW_SURVEY_POST_PAGE,
  SEARCH_PAGE,
  SETTING_PAGE,
  STUDENT_DASHBOARD_PAGE,
  SURVEY_DETAILS_PAGE,
  USER_DETAILS_PAGE
} from './constants/Page'
import AddQuestionPage from './pages/AddQuestionPage'
import BusinessDashboardPage from './pages/BusinessDashboardPage'
import BusinessRegistationPage from './pages/BusinessRegistationPage'
import ChatPage from './pages/ChatPage'
import ConversationPage from './pages/ConversationPage'
import CreateRecruitmentPostPage from './pages/CreateRecruitmentPostPage'
import CreateSurveyPostPage from './pages/CreateSurveyPostPage'
import DetailIntroducePage from './pages/DetailedIntroducePage'
import FacultyDashboardPage from './pages/FacultyDashboardPage'
import IntroducePage from './pages/IntroducePage'
import JobApplyPage from './pages/JobApplyPage'
import LoginPage from './pages/LoginPage'
import NoPage from './pages/NoPage'
import RecruitmentDetailsPage from './pages/RecruitmentDetailsPage'
import SearchPage from './pages/SearchPage'
import SelectTypeRegistationPage from './pages/SelectTypeRegistationPage'
import SettingPage from './pages/SettingPage'
import StudentDashboardPage from './pages/StudentDashboardPage'
import StudentRegistationPage from './pages/StudentRegistationPage'
import ReviewSurveyPostPage from './pages/ReviewSurveyPostPage'
import SurveyConductPage from './pages/SurveyConductPage'
import UserDetailsPage from './pages/UserDetailsPage'
import { useAppSelector } from './redux/Hook'
import ListFollowPage from './pages/ListFollowPage'

export default function AppRouter() {
  const { darkMode } = useAppSelector((state) => state.TDCSocialNetworkReducer)

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
            <Route path={ADD_QUESTION_PAGE} element={<AddQuestionPage />} />
            <Route path={REVIEW_SURVEY_POST_PAGE} element={<ReviewSurveyPostPage />} />
            <Route path={REGISTER_BUSINESS_PAGE} element={<BusinessRegistationPage />} />
            <Route path={REGISTER_STUDENT_PAGE} element={<StudentRegistationPage />} />
            <Route path={REGISTER_PAGE} element={<SelectTypeRegistationPage />} />
            <Route path={FUNCTION_DESCRIPTION_PAGE} element={<DetailIntroducePage />} />
            <Route path={USER_DETAILS_PAGE + '/:slug'} element={<UserDetailsPage />} />
            <Route path={JOB_APPLY_PAGE + '/:slug'} element={<JobApplyPage />} />
            <Route path={RECRUITMENT_DETAILS_PAGE + '/:slug'} element={<RecruitmentDetailsPage />} />
            <Route path={SURVEY_DETAILS_PAGE + '/:slug'} element={<SurveyConductPage />} />
            <Route path={LIST_FOLLOW_PAGE} element={<ListFollowPage />} />
            <Route path='*' element={<NoPage />} />
            <Route path='/' element={<IntroducePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
