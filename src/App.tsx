import moment from 'moment'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import Router from './AppRouter'
import { store } from './redux/Store'
const vi = require('moment/locale/vi')
moment.locale('vi', vi)

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
