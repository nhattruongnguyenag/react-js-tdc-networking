import React, { useState, useEffect } from 'react'
import { useGetFollowerUserQuery } from '../../redux/Service'
import { useAppSelector } from '../../redux/Hook'
import classNames from 'classnames'
import UserItem from '../items/UserItem'
import axios from 'axios'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import ItemUserFollower from '../items/ItemUserFollower'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-multi-lang'

export interface FollowerType {
    id: any
}

export default function FollowerListView(props: FollowerType) {
    var item = props
    const t = useTranslation();
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const { data, isFetching } = useGetFollowerUserQuery(
        {
            id: item.id,
        },
        {
            pollingInterval: 1000
        }
    )
    const [search, setSearch] = useState('')
    const filter = (data?.data)?.filter(item => item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/d/g, 'đ')))


    return (
        <div>
            <div>
                {
                    item.id == userLogin?.id ? <div style={{ position: 'relative' }}>
                        <input
                            type='search'
                            placeholder={t('Options.placeholderSearch')}
                            style={{ width: '100%', marginBottom: 20, marginTop: 20, paddingLeft: 60, paddingRight: 30, borderWidth: '1px', height: '50px', borderRadius: 50 }}
                            onChange={(txt) => {
                                setSearch(txt.target.value)
                            }} />
                        <FontAwesomeIcon style={{ position: 'absolute', left: 27, top: 35, fontSize: 20 }} icon={faSearch} color='grey' />

                    </div> :
                        <></>
                }
            </div>
            <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 550 }}>
                {
                    search == '' ?
                        data?.data.map((item) => <ItemUserFollower id={item.id}
                            image={item.image}
                            name={item.name}
                            isFollow={item.isFollow}
                        />)
                        : filter?.map((item) => <ItemUserFollower id={item.id}
                            image={item.image}
                            name={item.name}
                            isFollow={item.isFollow}
                        />)
                }
            </div>
        </div>

    )
}
