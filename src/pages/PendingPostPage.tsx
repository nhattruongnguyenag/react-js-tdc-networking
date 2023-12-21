import { useMemo } from 'react'
import { useTranslation } from 'react-multi-lang'
import { useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import ModalPostRejectReason from '../components/postApproval/ModalPostRejectReason'
import PostApprovalItem, { POST_APPROVAL, POST_PENDING } from '../components/postApproval/PostApprovalItem'
import PostManagementTab from '../components/postManagement/PostManagementTab'
import CustomizeSkeleton from '../components/skeleton/CustomizeSkeleton'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { useGetPostsQuery } from '../redux/Service'
import { setPostRejectId } from '../redux/Slice'
import { isAdmin, isFaculty } from '../utils/UserHelper'
import { UpdateNormalPost } from '../types/UpdateNormalPost'
import { TYPE_NORMAL_POST } from '../constants/Variables'

export default function PendingPostPage() {
    const navigate = useNavigate()
    const { userLogin, postRejectId } = useAppSelector(state => state.TDCSocialNetworkReducer)
    const dispatch = useAppDispatch()
    const t = useTranslation()
    const group = useMemo(() => {
        if (isAdmin(userLogin)) {
            return "group_connect_business"
        }

        return ""
    }, [userLogin])

    const faculty = useMemo(() => {
        if (isFaculty(userLogin)) {
            return userLogin.code
        }

        return ""
    }, [userLogin])

    const { data, isLoading } = useGetPostsQuery({
        active: 0,
        userId: userLogin?.id ?? -1
    }, { refetchOnFocus: true, refetchOnMountOrArgChange: true })

    return (
        <>
            <Header />
            <div className='main-content'>
                <div className='middle-wrap'>
                    <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                        <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
                            <button className='d-inline-block mt-2' onClick={() => navigate(-1)}>
                                <i className='ti-arrow-left font-sm text-white' />
                            </button>
                            <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Quản lý bài viết</h4>
                        </div>
                        <PostManagementTab />
                        <div className='card-body px-5 w-100 border-0'>

                            {isLoading ? (
                                <div>
                                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                                        <CustomizeSkeleton />
                                    </div>
                                    <div className='card w-100 shadow-xss rounded-xxl mb-3 border-0 p-4'>
                                        <CustomizeSkeleton />
                                    </div>
                                </div>
                            ) :
                                data?.data.map((item, index) => <PostApprovalItem
                                    type={POST_PENDING}
                                    key={index.toString()}
                                    post={item}
                                />)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ModalPostRejectReason show={Boolean(postRejectId)} onHide={() => { dispatch(setPostRejectId(null)) }} />
        </>
    )
}
