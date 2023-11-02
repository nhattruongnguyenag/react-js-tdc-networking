import classNames from 'classnames'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BUSINESS_DASHBOARD_PAGE, CONVERSATION_PAGE, CREATE_RECRUITMENT_POST_PAGE, CREATE_SURVEY_POST_PAGE, FACULTY_DASHBOARD_PAGE, LOGIN_PAGE, MESSAGE_PAGE, REGISTER_BUSINESS_PAGE, REGISTER_PAGE, REGISTER_STUDENT_PAGE, SEARCH_PAGE, SETTING_PAGE, STUDENT_DASHBOARD_PAGE } from './constants/Page'
import BusinessDashboardPage from './pages/BusinessDashboardPage'
import ChatPage from './pages/ChatPage'
import ConversationPage from './pages/ConversationPage'
import CreateRecruitmentPostPage from './pages/CreateRecruitmentPostPage'
import CreateSurveyPostPage from './pages/CreateSurveyPostPage'
import FacultyDashboardPage from './pages/FacultyDashboardPage'
import IntroducePage from './pages/IntroducePage'
import LoginPage from './pages/LoginPage'
import NoPage from './pages/NoPage'
import RegisterBusinessPage from './pages/RegisterBusinessPage'
import RegisterStudentPage from './pages/RegisterStudentPage'
import SearchPage from './pages/SearchPage'
import SettingPage from './pages/SettingPage'
import StudentDashboardPage from './pages/StudentDashboardPage'
import { useAppSelector } from './redux/Hook'
import BusinessRegistationPage from './pages/BusinessRegistationPage'
import SelectTypeRegistationPage from './pages/SelectTypeRegistationPage'
import StudentRegistationPage from './pages/StudentRegistationPage'

export default function Router() {
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
            <Route path={REGISTER_BUSINESS_PAGE} element={<BusinessRegistationPage />} />
            <Route path={REGISTER_STUDENT_PAGE} element={<StudentRegistationPage />} />
            <Route path={REGISTER_PAGE} element={<SelectTypeRegistationPage />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
