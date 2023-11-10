import React, { useCallback, useEffect, useState } from 'react'
import { Post } from '../types/Post';
import { numberDayPassed } from '../utils/FormatTime';
import Header from '../components/common/Header';
import { useGetFacultyPostsQuery, useGetPostsByIdQuery } from '../redux/Service';
import { LikeAction } from '../types/LikeActions';
import CustomizePost from '../components/post/CustomizePost';
import { useAppSelector } from '../redux/Hook';
import CustomizeProfile from '../components/profile/CustomizeProfile';
import axios from 'axios';
import { API_URL_GET_POST_BY_USER_ID } from '../constants/Path';
import { useParams } from 'react-router-dom';
import CreatePostSelector from '../components/CreatePostSelector';
import { handleDataClassification } from '../utils/DataClassfications';
import { TYPE_POST_STUDENT } from '../constants/StringVietnamese';

export default function ProfileScreen() {
    const { _userId } = useParams();
    const [type, setType] = useState<number>();
    const [userId, setUserId] = useState<number>();
    const [post, setPost] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState();
    const [typeAuthorPost, setTypeAuthorPost] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
    const { data, isFetching } = useGetPostsByIdQuery(
        { id: _userId ?? '0' },
        {
            pollingInterval: 2000
        }
    );

    useEffect(() => {
        if (data) {
            try {
                setTypeAuthorPost(data.data[0].user['roleCodes']);
                setUserInfo(data.data[0].user);
                setPost(data.data);
                setType(1)
            } catch (error) {
                setTypeAuthorPost(data.data[0].roleCodes);
                setUserInfo(data.data[0]);
                setPost([]);
                setType(2)
            }
        }
    }, [data]);
    
    const likeAction = (obj: LikeAction) => {

    }

    const renderItem = (item: any) => {
        return (
            <CustomizePost
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
            />
        )
    }

    return (
        <>
            <Header />
            <div className='main-content'>
                <div className='middle-sidebar-bottom'>
                    <div className='middle-sidebar-left'>
                        <div className='row feed-body'>
                            <div className='col-xl-8 col-xxl-9 col-lg-8'>
                                {
                                    post[0] !== null && <>
                                        {
                                            type === 1 ? <CustomizeProfile
                                                data={post}
                                                role={typeAuthorPost}
                                                userData={userInfo}
                                            /> : <CustomizeProfile
                                                data={post}
                                                role={typeAuthorPost}
                                                userData={userInfo}
                                            />
                                        }
                                    </>

                                }

                                {
                                    userLogin?.id == _userId && <CreatePostSelector group={null} />
                                }
                                {
                                    post.length !== 0 && type === 1 ? post.map((item) => renderItem(item)) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}