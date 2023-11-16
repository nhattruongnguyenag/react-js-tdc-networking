import React from 'react'
import { useParams } from 'react-router-dom'
import { getIdFromSlug } from '../utils/CommonUtls'

export default function SurveyResultPage() {
    const { slug } = useParams()
    const surveyPostId = getIdFromSlug(slug ?? '') ?? -1

    return (
        <div>SurveyResultPage</div>
    )
}
