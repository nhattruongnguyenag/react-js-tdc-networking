import { useNavigate } from 'react-router-dom'
import { SURVEY_DETAILS_PAGE, USER_DETAILS_PAGE } from '../../constants/Page'
import { SurveyPostResponseModel } from '../../types/response/SurveyPostResponseModel'
import { slugify } from '../../utils/CommonUtls'
import CustomizeSurveyPost from '../surveyPost/CustomizeSurveyPost'
import { useTranslation } from 'react-multi-lang'

interface SurveyPostApprovalItemProps {
    post: SurveyPostResponseModel
}

export default function SurveyPostApprovalItem(props: SurveyPostApprovalItemProps) {
    const navigate = useNavigate()
    const t = useTranslation();
    const handleClickBtnSurveyDetailEvent = (idPost: number, title: string) => {
        const state = {
            userId: props.post.user.id,
            group: props.post.user.facultyGroupId,
        }
        navigate(`${SURVEY_DETAILS_PAGE}/${slugify(title)}-${idPost}`)
    }
    return (
        <CustomizeSurveyPost
            id={props.post.id}
            image={props.post.user.image}
            name={props.post.user.name}
            type={props.post.type}
            title={props.post.title}
            handleClickBtnSeeDetailEvent={handleClickBtnSurveyDetailEvent}
            createdAt={props.post.createdAt}
            description={props.post.description}
            typeAuthor={props.post.user.roleCodes}
            role={props.post.user.roleCodes}
            isConduct={0}
            textSurveyPostButton={t("SurveyPost.surveyPostButton")}
            textSurveyPostButtonSetting={t("SurveyPost.surveyPostButtonSetting")}
         />
    )
}
