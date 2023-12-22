import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useTranslation } from 'react-multi-lang';
import { useAppDispatch, useAppSelector } from '../redux/Hook';
import { Post } from '../types/Post';
import { useGetFacultyAndStudentPostsQuery } from '../redux/Service';
import { isFaculty, isStudent } from '../utils/UserHelper';
import { Student } from '../types/Student';
import { Faculty } from '../types/Faculty';
import { getPostActive } from '../utils/GetPostActive';
import CustomizePost from '../components/post/CustomizePost';
import { LikeAction } from '../types/LikeActions';
import { numberDayPassed } from '../utils/FormatTime';
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton';
import CreatePostSelector from '../components/CreatePostSelector';
import { TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/StringVietnamese';
import { useNavigate } from 'react-router-dom'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { COLOR_GREY_FEEBLE } from '../constants/Color';
import '../assets/css/studentAndFaculty.css'
import ButtonBackToTop from '../components/common/ButtonBackToTop';

export default function FacultyAndStudentPage() {
    const t = useTranslation();
    const navigate = useNavigate();
    const [isCalled, setIsCalled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [flag, setFlag] = useState(true);
    const { updatePost, userLogin } = useAppSelector(
        (state) => state.TDCSocialNetworkReducer
    )
    const [code, setCode] = useState("");
    const dispatch = useAppDispatch();
    const [facultyPost, setFacultyPost] = useState<Post[]>([]);
    const { data, isFetching } = useGetFacultyAndStudentPostsQuery(
        {
            faculty: code,
            id: userLogin?.id ?? 0
        },
        {
            pollingInterval: 2000
        }
    );

    useEffect(() => {
        if (data) {
            setIsLoading(false);
            setFacultyPost([]);
            setFacultyPost(data.data);
            setIsCalled(true);
        }
    }, [data])

    useEffect(() => {
        setCode((isStudent(userLogin) || isFaculty(userLogin)) ? ((userLogin as Student | Faculty).facultyGroupCode ?? "") : "");
    }, [userLogin]);

    useEffect(() => {
        if (facultyPost.length > 0 || isCalled || code.trim() === "") {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [facultyPost, isCalled, code])

    const handleUnSave = () => {
        // TODO
    }

    const likeAction = (obj: LikeAction) => {
        // Implement your like action logic here
    };

    const userLoginAllowCreatePost = (roleCodes: string): boolean => {
        return (roleCodes.includes(TYPE_POST_FACULTY) || roleCodes.includes(TYPE_POST_STUDENT));
    }

    const renderItem = (item: any) => {
        if (getPostActive(item.active)) {
            return (
                <CustomizePost
                    key={item.id}
                    id={item.id}
                    userId={item.user?.id}
                    name={item.user?.name}
                    avatar={item.user?.image}
                    typeAuthor={item.user['roleCodes']}
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
                    active={item.active} iCustomizeLikeAction={false}                />
            )
        } else {
            return null;
        }
    }

    return (
        <>
            <Header />
            <div className='main-content bg-lightblue theme-dark-bg'>
                <div className='middle-sidebar-bottom'>
                    <div className='middle-sidebar-left'>
                        <button
                            onClick={() => { navigate(-1) }}
                            className='buttonGoBackFacultyAndStudent'
                        >
                            <FontAwesomeIcon
                                icon={faCircleArrowLeft}
                                size='2x'
                                color={COLOR_GREY_FEEBLE}
                            />
                        </button>
                        <div className='middle-wrap'>
                            {
                                userLoginAllowCreatePost(userLogin?.roleCodes ?? "") && <CreatePostSelector
                                    id={userLogin?.id ?? 0}
                                    group={(userLogin as Faculty).facultyGroupId ?? 0}
                                    avatar={userLogin?.image ?? ''}
                                    name={userLogin?.name ?? ''}
                                    groupName={code}
                                />
                            }
                            {
                                isLoading ? <CustomizeSkeleton /> : facultyPost.map((item: any) => renderItem(item))
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <ButtonBackToTop />
        </>
    )
}