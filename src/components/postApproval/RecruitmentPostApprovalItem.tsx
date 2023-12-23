import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RECRUITMENT_DETAILS_PAGE } from '../../constants/Page'
import { RecruitmentPostResponseModel } from '../../types/response/RecruitmentPostResponseModel'
import { slugify } from '../../utils/CommonUtls'
import CustomizeRecruitmentPost from '../recruitmentPost/CustomizeRecruitmentPost'
import { PostApprovalItemProps } from './PostApprovalItem'
import { useTranslation } from 'react-multi-lang'

interface RecruitmentPostApprovalItemProps {
    post: RecruitmentPostResponseModel
}

export default function RecruitmentPostApprovalItem(props: RecruitmentPostApprovalItemProps) {
    const navigate = useNavigate()
    const t = useTranslation();
    const handleClickBtnRecruitmentDetailEvent = (idPost: number, title: string) => {
        navigate(`${RECRUITMENT_DETAILS_PAGE}/${slugify(title)}-${idPost}`)
    }

    return (
        <CustomizeRecruitmentPost
            id={props.post.id}
            image={props.post.user.image}
            name={props.post.user.name}
            type={props.post.type}
            location={props.post.location}
            title={props.post.title}
            expiration={props.post.expiration}
            salary={props.post.salary.toLocaleString()}
            employmentType={props.post.employmentType}
            handleClickBtnSeeDetailEvent={handleClickBtnRecruitmentDetailEvent}
            createdAt={props.post.createdAt}
            role={props.post.user.roleCodes}
            typeAuthor={props.post.user.roleCodes}
            textButtonSeeDetail={t("RecruitmentPost.recruitmentPostButtonSeeDetail")}
        />
    )
}
