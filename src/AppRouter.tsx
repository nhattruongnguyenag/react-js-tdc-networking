import classNames from "classnames";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BusinessDashboardPage from "./pages/BusinessDashboardPage";
import ChatPage from "./pages/ChatPage";
import ConversationPage from "./pages/ConversationPage";
import IntroducePage from "./pages/IntroducePage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import SettingPage from "./pages/SettingPage";
import { useAppSelector } from "./redux/Hook";

export default function Router() {
  const { darkMode } = useAppSelector(state => state.TDCSocialNetworkReducer)

  return (
    <div className={classNames('color-theme-blue mont-font loaded',
      darkMode ? 'theme-dark' : ' theme-light'
    )}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<IntroducePage />} />
            <Route path='dang-nhap' element={<LoginPage />} />
            <Route path='doanh-nghiep/bai-viet' element={<BusinessDashboardPage />} />
            <Route path='hoi-thoai' element={<ConversationPage />} />
            <Route path='tin-nhan' element={<ChatPage />} />
            <Route path='cai-dat' element={<SettingPage />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
