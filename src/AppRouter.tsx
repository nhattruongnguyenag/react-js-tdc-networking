import classNames from 'classnames'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BusinessDashboardPage from './pages/BusinessDashboardPage'
import ChatPage from './pages/ChatPage'
import ConversationPage from './pages/ConversationPage'
import CreateRecruitmentPostPage from './pages/CreateRecruitmentPostPage'
import CreateSurveyPostPage from './pages/CreateSurveyPostPage'
import IntroducePage from './pages/IntroducePage'
import LoginPage from './pages/LoginPage'
import NoPage from './pages/NoPage'
import RegisterBusinessPage from './pages/RegisterBusinessPage'
import RegisterStudentPage from './pages/RegisterStudentPage'
import SearchPage from './pages/SearchPage'
import SettingPage from './pages/SettingPage'
import { useAppSelector } from './redux/Hook'
import BusinessRegistationPage from './pages/BusinessRegistationPage'

export default function Router() {
  const { darkMode } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  return (
    <div className={classNames('color-theme-blue mont-font loaded', darkMode ? 'theme-dark' : ' theme-light')}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/' element={<IntroducePage />} />
            <Route path='dang-nhap' element={<LoginPage />} />
            <Route path='dang-ky-doanh-nghiep' element={<BusinessRegistationPage />} />
            <Route index path='doanh-nghiep/bai-viet' element={<BusinessDashboardPage />} />
            <Route path='hoi-thoai' element={<ConversationPage />} />
            <Route path='nhan-tin' element={<ChatPage />} />
            <Route path='cai-dat' element={<SettingPage />} />
            <Route path='tim-kiem' element={<SearchPage />} />
            <Route path='them-bai-viet/tuyen-dung' element={<CreateRecruitmentPostPage />} />
            <Route path='them-bai-viet/khao-sat' element={<CreateSurveyPostPage />} />
            <Route path='dang-ky/doanh-nghiep' element={<RegisterBusinessPage />} />
            <Route path='dang-ky/sinh-vien' element={<RegisterStudentPage />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
