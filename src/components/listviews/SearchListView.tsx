import React, { useState } from 'react'
import UserItem from '../items/UserItem'
import CustomizePost from '../post/CustomizePost'
import { numberDayPassed } from '../../utils/FormatTime'
import { LikeAction } from '../../types/LikeActions'

export interface SearchListViewProps {
  data: any
  sub: string
  handleFollow: (userId: number) => void
  likeAction: (obj: LikeAction) => void;
  handleUnSave: (userId: number) => void;
  handleDelete: (userId: number) => void;
}
export default function SearchListView({ data, sub, handleFollow, handleUnSave, handleDelete, likeAction }: SearchListViewProps) {

  const checkType = () => {
    switch (sub) {
      case 'user':
        return data.map((item: any) => (
          <UserItem
            id={item.id}
            image={item.image}
            name={item.name}
            isFollow={item.isFollow}
            handleFollow={handleFollow}
          />
        ))
        break
      case 'post':
        return (
          <>
            {data != null &&
              data.map((item: any) => (
                <CustomizePost
                  key={item.id}
                  id={item.id}
                  userId={item.user['id']}
                  name={item.user['name']}
                  avatar={item.user['image']}
                  typeAuthor={'Doanh Nghiệp'}
                  available={null}
                  timeCreatePost={numberDayPassed(item.createdAt)}
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
                  isConduct={item.isConduct ?? null}
                  isSave={item.isSave}
<<<<<<< HEAD
                  group={''}
                  handleUnSave={handleUnSave}
                />
=======
                  group={''} 
                  handleUnSave={handleUnSave}                
                  active={item.active}
                  />
>>>>>>> develop
              ))}
          </>
        )

        break
      default:
        console.log('...')
    }
  }
  return (
    <div className=''>
      <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 590 }}>
        {checkType()}
      </div>
    </div>
  )
}
