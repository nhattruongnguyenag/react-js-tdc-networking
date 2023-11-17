import React, { useState, useEffect } from 'react'
import { useGetFollowerUserQuery } from '../../redux/Service'
import { useAppSelector } from '../../redux/Hook'
import classNames from 'classnames'
import UserItem from '../items/UserItem'
import axios from 'axios'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import ItemUserFollower from '../items/ItemUserFollower'

export interface FollowerType {
    id: any
}

export default function FollowerListView(props: FollowerType) {
    var item = props

    // const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const { data, isFetching } = useGetFollowerUserQuery(
        {
            id: item.id,
        },
        {
            pollingInterval: 1000
        }
    )


    return (
        <div>
            <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 600 }}>
                {data?.data.map((item) => <ItemUserFollower id={item.id}
                    image={item.image}
                    name={item.name}
                    isFollow={item.isFollow}
                     />)}
            </div>
        </div>

    )
}
