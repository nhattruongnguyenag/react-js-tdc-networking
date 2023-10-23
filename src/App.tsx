import { useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BusinessDashboardPage from './pages/BusinessDashboardPage'
import ChatPage from './pages/ChatPage'
import ConversationPage from './pages/ConversationPage'
import IntroducePage from './pages/IntroducePage'
import LoginPage from './pages/LoginPage'
import NoPage from './pages/NoPage'
import SettingPage from './pages/SettingPage'
import { store } from './redux/Store'
import Router from './AppRouter'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
