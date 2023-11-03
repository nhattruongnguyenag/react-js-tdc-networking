import React, { useState } from 'react'
import UserItem from '../items/UserItem'

export interface SearchListViewProps {
    data: any
    type: string
    handleFollow: (userId: number) => void;
}
// id={item.id} image={item.image} name={item.name} isFollow={item.isFollow} handleFollow={handleFollow}
export default function SearchListView({ data, type, handleFollow }: SearchListViewProps) {
    const checkType = () => {
        switch (type) {
          case 'sinh-vien':
            return data.map((item: any) => <UserItem id={item.id} image={item.image} name={item.name} isFollow={item.isFollow} handleFollow={handleFollow}/>)
            break
          case 'doanh-nghiep':
            return data.map((item: any) => <UserItem id={item.id} image={item.image} name={item.name} isFollow={item.isFollow} handleFollow={handleFollow}/>)
            break
          case 'khoa':
            return data.map((item: any) => <UserItem id={item.id} image={item.image} name={item.name} isFollow={item.isFollow} handleFollow={handleFollow}/>)
          break
        //   case 'thong-thuong':
        //     return masterData.map((item: any, index) =>
        //       <PostNormalItem
        //         id={item.id}
        //         image={item.image}
        //         type={item.type}
        //         content={item.content}
        //         user={{
        //           id: item.user.id,
        //           name: item.user.name,
        //           image: item.user.image
        //         }} />)
        //     break
        //   case 'khao-sat':
        //     return masterData.map((item, index) => postItems(item, index))
        //     break
        //   case 'tuyen-dung':
        //     return masterData.map((item, index) => postItems(item, index))
        //     break
          default:
            console.log('...')
        }
    }
    return (
        <div className=''>
            {
                checkType()
            }
        </div>
    )
}
