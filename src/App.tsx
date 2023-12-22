import moment from 'moment'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import AppRouter from './AppRouter'
import { store } from './redux/Store'
import { useAppSelector } from './redux/Hook'
const vi = require('moment/locale/vi')
moment.locale('vi', vi)

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer />
    </Provider>
  )
}
export default App
