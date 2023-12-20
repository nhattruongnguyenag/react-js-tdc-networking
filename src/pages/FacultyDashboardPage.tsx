import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { numberDayPassed } from '../utils/FormatTime';
import Header from '../components/common/Header';
import { useGetFacultyPostsQuery } from '../redux/Service';
import { LikeAction } from '../types/LikeActions';
import {
  TYPE_POST_BUSINESS,
  TYPE_POST_FACULTY,
  TYPE_POST_STUDENT
} from '../constants/StringVietnamese';
import CreatePostSelector from '../components/CreatePostSelector';
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton';
import { useAppSelector } from '../redux/Hook';
import ReactLoading from 'react-loading';
import { COLOR_BLUE_BANNER } from '../constants/Color';
import axios from 'axios';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { useTranslation } from 'react-multi-lang';
import { getFacultyTranslated } from '../utils/TranslateFaculty';
import CustomizePost from '../components/post/CustomizePost'
import { getPostActive } from '../utils/GetPostActive'
import { isFaculty, isStudent } from '../utils/UserHelper';
import { Post } from '../types/Post';

export default function FacultyDashboardPage() {
  const t = useTranslation();
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCallData, setIsLoadingCallData] = useState(false);
  const [facultyPost, setFacultyPost] = useState<Post[]>([]);
  const [dataRequest, setDataRequest] = useState<any[]>([]);
  const { data, isFetching } = useGetFacultyPostsQuery(
    {
      faculty: code,
      id: userLogin?.id ?? 0
    },
    {
      pollingInterval: 500
    }
  );
  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setFacultyPost([]);
      setFacultyPost(data.data);
    }
  }, [data])

  useEffect(() => {
    if ((isStudent(userLogin) || isFaculty(userLogin))) {
      if (isFaculty(userLogin)) {
        setCode(userLogin?.code);
      } else {
        setCode(getFacultyByFacultyGroupCode(userLogin?.facultyGroupCode ?? ""));
      }
    } else {
      setFacultyPost([]);
    }
  }, [userLogin]);

  const getFacultyByFacultyGroupCode = (group: string): string => {
    let faculty = group.substring(group.indexOf('_') + 1)
    faculty = "khoa_" + faculty;
    return faculty;
  }

  const handleFacultyNameChange = useCallback((e: any) => {
    setCode(getFacultyByFacultyGroupCode(e.target.value));
  }, []);

  const likeAction = (obj: LikeAction) => {
    // Implement your like action logic here
  };

  const handleUnSave = () => {
    // TODO
  }


  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + 'api/faculty')
      .then((response) => {
        setDataRequest(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const renderItem = (item: any) => {
    // if (getPostActive(item.active)) {
    return (
      <CustomizePost
        key={item.id}
        id={item.id}
        userId={item.user?.id}
        name={item.user?.name}
        avatar={item.user?.image}
        typeAuthor={TYPE_POST_FACULTY}
        available={null}
        timeCreatePost={numberDayPassed(item.createdAt)}
        content={item.content}
        type={item.type}
        likes={item.likes}
        comments={item.comment}
        commentQty={item.commentQuantity}
        images={item.images}
        role={item.user?.roleCodes}
        likeAction={likeAction}
        location={item.location ?? null}
        title={item.title ?? null}
        expiration={item.expiration ?? null}
        salary={item.salary ?? null}
        employmentType={item.employmentType ?? null}
        description={item.description ?? null}
        isConduct={null}
        isSave={item.isSave}
        group={code}
        handleUnSave={handleUnSave}
        active={item.active}
      />
    )
    // } else {
    //   return null;
    // }
  }

  return (
    <>
      <Header />
      {userLogin?.roleCodes !== TYPE_POST_BUSINESS ? (
        <div className='main-content bg-light theme-dark-bg'>
          <div className='middle-sidebar-bottom'>
            <div className='middle-sidebar-left'>
              <div className='middle-wrap'>
                {isLoading && (
                  <Fragment>
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                      <CustomizeSkeleton />
                    </div>
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                      <CustomizeSkeleton />
                    </div>
                  </Fragment>
                )}
                {(userLogin?.roleCodes !== TYPE_POST_BUSINESS && userLogin?.roleCodes !== TYPE_POST_STUDENT) && (
                  <CreatePostSelector
                    id={userLogin?.id ?? 0}
                    group={null}
                    avatar={userLogin?.image ?? ''}
                    name={userLogin?.name ?? ''}
                    groupName={code}
                  />
                )}
                {facultyPost.map((item: any) => renderItem(item))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='main-content bg-lightblue theme-dark-bg'>
          <div className='middle-sidebar-bottom'>
            <div className='middle-sidebar-left'>
              <div className='middle-wrap'>
                <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-2 text-center'>
                  <select
                    className='style2-input form-control font-xsss fw-600 ps-5 pt-0 text-grey-900 text-dark'
                    onChange={handleFacultyNameChange}
                    style={{ border: 'none', outline: 'none' }}
                  >
                    <option hidden>{t("BusinessSelectFacultyToolbar.businessSelectFacultyToolbarTitle")}</option>
                    {dataRequest.map((item, index) => (
                      <option value={item.facultyGroupCode} key={item.id} className='text-grey-900 text-dark'>
                        {getFacultyTranslated(item.name, t)}
                      </option>
                    ))}
                  </select>
                  {!Boolean(dataRequest) && (
                    <ReactLoading className='spinnerLoading' type={'spin'} color={COLOR_BLUE_BANNER} height={30} width={30} />
                  )}
                </div>
                {isLoading && (
                  <Fragment>
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                      <CustomizeSkeleton />
                    </div>
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                      <CustomizeSkeleton />
                    </div>
                  </Fragment>
                )}
                {(Boolean(code) && Boolean(facultyPost.length)) ? (
                  facultyPost.map((item: any) => renderItem(item))
                ) : (
                  (Boolean(code)) ? <div className='text-grey-900 text-dark card w-100 shadow-xss rounded-xxl mb-3 border-0 p-3 text-center mt-5'>
                    {t("NotifyFacultyDontHaveAnyPost.textNotifyFacultyDontHaveAnyPost")}
                  </div> : <div className='text-grey-900 text-dark card w-100 shadow-xss rounded-xxl mb-3 border-0 p-3 text-center mt-5'>
                    Vui lòng chọn khoa!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}