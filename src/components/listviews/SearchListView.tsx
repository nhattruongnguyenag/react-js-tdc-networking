import React, { useState } from 'react'
import UserItem from '../items/UserItem'
import CustomizePost from '../post/CustomizePost';
import { numberDayPassed } from '../../utils/FormatTime';
import { LikeAction } from '../../types/LikeActions';

export interface SearchListViewProps {
  data: any
  type: string
  handleFollow: (userId: number) => void;
}
// id={item.id} image={item.image} name={item.name} isFollow={item.isFollow} handleFollow={handleFollow}
export default function SearchListView({ data, type, handleFollow }: SearchListViewProps) {
  const likeAction = (obj: LikeAction) => {
    // obj.code = TYPE_POST_BUSINESS
    // like(obj)
  }
  const checkType = () => {
    switch (type) {
      case 'user':
        return data.map((item: any) => <UserItem id={item.id} image={item.image} name={item.name} isFollow={item.isFollow} handleFollow={handleFollow} />)
        break
      case 'post':
        return <>{
          data != null && data.map((item: any) =>
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
            />)
        }</>


        break
      default:
        console.log('...')
    }
  }
  return (
    <div className=''>
      <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 630 }}>
        {
          checkType()
        }
      </div>
    </div>
  )
}
