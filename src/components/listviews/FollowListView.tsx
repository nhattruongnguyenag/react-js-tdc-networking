import React, { useState, useEffect } from 'react'
import { useGetFollowingUserQuery } from '../../redux/Service'
import { useAppSelector } from '../../redux/Hook'
import classNames from 'classnames'
import UserItem from '../items/UserItem'
import axios from 'axios'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import ItemUserFollower from '../items/ItemUserFollower'

export interface FollowingType {
    id: any
}
export default function FollowListView(props: FollowingType) {
    var item = props
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const { data, isFetching } = useGetFollowingUserQuery(
        {
            id: item.id,
        },
        {
            pollingInterval: 1000
        }
    )

    const handleFollow = (userFollowId: number) => {
        axios.post(`${SERVER_ADDRESS}api/users/follow`, {
            userFollowId: userFollowId,
            userId: item.id
        }
        )
    }

    return (

        <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 600 }}>
            {item.id == userLogin?.id ?
                data?.data.map((item) => <UserItem id={item.id}
                    image={item.image}
                    name={item.name}
                    isFollow={item.isFollow}
                    handleFollow={handleFollow} />) :
                data?.data.map((item) => <ItemUserFollower id={item.id}
                    image={item.image}
                    name={item.name}
                    isFollow={item.isFollow}
                />)
            }

        </div>
        // <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 600 }}>
        //     {data?.data.map((item) => <ItemUserFollower id={item.id}
        //         image={item.image}
        //         name={item.name}
        //         isFollow={item.isFollow}
        //     />)}
        // </div>


    )
}
