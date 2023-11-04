import moment from 'moment'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import AppRouter from './AppRouter'
import { store } from './redux/Store'
const vi = require('moment/locale/vi')
moment.locale('vi', vi)

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <AppRouter />
    </Provider>
  )
}

export default App
