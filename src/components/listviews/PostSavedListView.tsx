import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { getStompClient } from '../../sockets/SocketClient'
import { Client, Frame } from 'stompjs'
import { Post } from '../../types/Post'
import { useAppSelector } from '../../redux/Hook'
import axios from 'axios'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import CustomizePost from '../post/CustomizePost'
import { useGetListPostSavedQuery } from '../../redux/Service'
import '../../assets/css/saved.css'
import { useTranslation } from 'react-multi-lang'


let stompClient: Client
const PostSavedListView = () => {

  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [search, setSearch] = useState('')
  const [value, setValue] = useState(null)
  const t = useTranslation();

  const { data, isFetching } = useGetListPostSavedQuery(userLogin ? userLogin.id : -1, {
    pollingInterval: 1000
  })
  const filter = (data?.data)?.filter(item => item.type == 'thong-thuong' ? (item.content).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/d/g, 'đ').includes(search.toLowerCase().normalize("NFD").replace(/d/g, 'đ')) : item.title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/d/g, 'đ').includes(search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/d/g, 'đ')))

  const likeAction = () => {
    console.log('123');

  }

  const handleUnSave = () => { }




  return (
    <div>

      <div style={{ position: 'relative' }}>
        <input
          type='search'
          placeholder={t('Options.placeholderSearch')}
          style={{ width: '100%', marginBottom: 20, marginTop: 20, paddingLeft: 60, paddingRight: 30, borderWidth: '1px', height: '50px', borderRadius: 50 }}
          onChange={(txt) => {
            setSearch(txt.target.value)
          }} />
        <FontAwesomeIcon style={{ position: 'absolute', left: 27, top: 35, fontSize: 20 }} icon={faSearch} color='grey' />

      </div>
      <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 550 }}>
        {
          search == '' ?
            data?.data.map((item: any) =>
              <CustomizePost
                id={item.id}
                userId={item.user['id']}
                name={item.user['name']}
                avatar={item.user['image']}
                typeAuthor={'Doanh Nghiệp'}
                available={null}
                timeCreatePost={item.createdAt}
                content={item.content}
                type={item.type}
                likes={item.likes}
                comments={item.comment}
                commentQty={item.commentQuantity}
                images={item.images}
                role={item.user['roleCodes']}
                likeAction={likeAction}
                location={item.location ?? null}
                title={item.title ?? null}
                expiration={item.expiration ?? null}
                salary={item.salary ?? null}
                employmentType={item.employmentType ?? null}
                description={item.description ?? null}
                isSave={item.isSave}
                group={''}
                isConduct={null}
                handleUnSave={handleUnSave}
                active={item.active} iCustomizeLikeAction={false} />
            )
            :
            filter?.map((item: any) =>
              <CustomizePost
                id={item.id}
                userId={item.user['id']}
                name={item.user['name']}
                avatar={item.user['image']}
                typeAuthor={'Doanh Nghiệp'}
                available={null}
                timeCreatePost={item.createdAt}
                content={item.content}
                type={item.type}
                likes={item.likes}
                comments={item.comment}
                commentQty={item.commentQuantity}
                images={item.images}
                role={item.user['roleCodes']}
                likeAction={likeAction}
                location={item.location ?? null}
                title={item.title ?? null}
                expiration={item.expiration ?? null}
                salary={item.salary ?? null}
                employmentType={item.employmentType ?? null}
                description={item.description ?? null}
                isSave={item.isSave}
                group={''}
                isConduct={null}
                handleUnSave={handleUnSave}
                active={item.active} iCustomizeLikeAction={false} />
            )
        }
      </div>
    </div>

  )
}

export default PostSavedListView