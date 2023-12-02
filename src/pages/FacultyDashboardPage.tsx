import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { numberDayPassed } from '../utils/FormatTime';
import Header from '../components/common/Header';
import { useGetFacultyPostsQuery } from '../redux/Service';
import { handleDataClassification } from '../utils/DataClassfications';
import { LikeAction } from '../types/LikeActions';
import {
  TEXT_NOTIFICATION_FACULTY_POST_EMPTY,
  TEXT_PLACEHOLDER_FACULITY,
  TEXT_SELECT_FACULTY,
  TEXT_WARNING_AREA_BY_ROLE,
  TYPE_POST_BUSINESS,
  TYPE_POST_FACULTY,
  TYPE_POST_STUDENT
} from '../constants/StringVietnamese';
import CustomizePost from '../components/post/CustomizePost';
import CreatePostSelector from '../components/CreatePostSelector';
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton';
import { useAppSelector } from '../redux/Hook';
import ReactLoading from 'react-loading';
import { Spinner } from 'flowbite-react';
import { COLOR_BLUE_BANNER } from '../constants/Color';
import axios from 'axios';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import vi from '../translate/vn.json';
import en from '../translate/en.json';
import jp from '../translate/jp.json';
import { setDefaultLanguage, setTranslations, useTranslation } from 'react-multi-lang';
import { getFacultyTranslated } from '../utils/TranslateFaculty';

setTranslations({ vi, en, jp });

export default function FacultyDashboardPage() {
  setDefaultLanguage('jp');
  const t = useTranslation();
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const [code, setCode] = useState(userLogin?.roleCodes !== TYPE_POST_BUSINESS ? userLogin?.facultyGroupCode ?? '' : '');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCallData, setIsLoadingCallData] = useState(false);
  const { data, isFetching } = useGetFacultyPostsQuery(
    {
      faculty: code,
      id: userLogin?.id ?? 0
    },
    {
      pollingInterval: 500
    }
  );

  const handleFacultyNameChange = useCallback((e: any) => {
    setCode(e.target.value);
  }, []);

  const [dataRequest, setDataRequest] = useState<any[]>([]);

  const likeAction = (obj: LikeAction) => {
    // Implement your like action logic here
  };

  useEffect(() => {
    setIsLoadingCallData(true);
    axios
      .get(SERVER_ADDRESS + 'api/faculty')
      .then((response) => {
        setDataRequest(response.data.data);
      })
      .catch((error) => {
        // Handle error
      })
      .finally(() => {
        setIsLoadingCallData(false);
      });
  }, []);

  const renderItem = (item: any) => (
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
    />
  );

  return (
    <>
      <Header />
      {userLogin?.roleCodes !== TYPE_POST_BUSINESS ? (
        <div className='main-content'>
          <div className='middle-sidebar-bottom'>
            <div className='middle-sidebar-left'>
              <div className='row feed-body'>
                <div className='col-xl-8 col-xxl-9 col-lg-8'>
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
                      group={userLogin?.facultyGroupId ?? 0}
                      avatar={userLogin?.image ?? ''}
                      name={userLogin?.name ?? ''}
                      groupName={code}
                    />
                  )}
                  {data?.data.map((item: any) => renderItem(item))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='main-content'>
          <div className='middle-sidebar-bottom'>
            <div className='middle-sidebar-left'>
              <div className='row feed-body'>
                <div className='col-xl-8 col-xxl-9 col-lg-8'>
                  <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-2 text-center'>
                    <select
                      className='style2-input form-control font-xsss fw-600 ps-5 pt-0'
                      onChange={handleFacultyNameChange}
                      style={{ border: 'none', outline: 'none' }}
                    >
                      <option hidden>{t("BusinessSelectFacultyToolbar.businessSelectFacultyToolbarTitle")}</option>
                      {dataRequest.map((item, index) => (
                        <option value={item.facultyGroupCode} key={item.id}>
                          {getFacultyTranslated(item.name, t)}
                        </option>
                      ))}
                    </select>
                    {isLoadingCallData && (
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
                  {data?.data.length !== 0 ? (
                    data?.data.map((item: any) => renderItem(item))
                  ) : (
                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-3 text-center'>
                      {t("NotifyFacultyDontHaveAnyPost.TextNotifyFacultyDontHaveAnyPost")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
