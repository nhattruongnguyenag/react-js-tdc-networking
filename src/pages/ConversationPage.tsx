import { Fragment, useEffect } from 'react'
import Header from '../components/common/Header'
import Loading from '../components/common/Loading'
import ConversationItem from '../conversation/ConversationItem'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { useGetConversationsByUserIdQuery } from '../redux/Service'
import { setConversations } from '../redux/Slice'

export default function ConversationPage() {
  const { conversations, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const { data, isSuccess, isLoading } = useGetConversationsByUserIdQuery(userLogin ? userLogin.id : -1, {
    pollingInterval: 3000
  })

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setConversations(data))
    }
  }, [data])

  return (
    <Fragment>
      <Header />

      {isLoading ? (
        <Loading showTitle />
      ) : (
        <div id='main-content-wrap' className='main-content'>
          <div className='middle-sidebar-bottom'>
            <div className='middle-sidebar-left' style={{ maxWidth: '100%' }}>
              <div className='chat-wrapper w-100 position-relative scroll-bar theme-dark-bg bg-white p-3'>
                <ul className='email-message'>
                  {conversations.map((item, index) => (
                    <ConversationItem key={index.toString()} data={item} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}
