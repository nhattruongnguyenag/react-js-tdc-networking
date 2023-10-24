import moment from 'moment'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import Router from './AppRouter'
import { store } from './redux/Store'
const vi = require('moment/locale/vi')
import 'photoswipe/dist/photoswipe.css'
moment.locale('vi', vi)
import { Gallery, Item } from 'react-photoswipe-gallery'

function App() {
  const smallItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '100%',
  }

  return (
    <Gallery>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 171px 171px',
        gridTemplateRows: '114px 114px',
        gridGap: 12,
      }}>
        <Item
          original="https://placekitten.com/1024/768?image=1"
          thumbnail="https://placekitten.com/80/60?image=1"
          width="1080"
          height="960"
        >
          {({ ref, open }) => (
            <img
              style={smallItemStyles}
              ref={ref as React.LegacyRef<HTMLImageElement>}
              onClick={open}
              src="https://placekitten.com/80/60?image=1" />
          )}
        </Item>
        <Item
          original="https://placekitten.com/1024/768?image=2"
          thumbnail="https://placekitten.com/80/60?image=2"
          width="1080"
          height="960"
        >
          {({ ref, open }) => (
            <img
              style={smallItemStyles}
              ref={ref as React.LegacyRef<HTMLImageElement>}
              onClick={open}
              src="https://placekitten.com/80/60?image=2" />
          )}
        </Item>
      </div>
    </Gallery>
  )
}

export default App
