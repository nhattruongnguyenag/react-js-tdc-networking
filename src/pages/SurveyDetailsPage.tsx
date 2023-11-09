import React from 'react'
import { useParams } from 'react-router-dom'
import { getIdFromSlug } from '../utils/CommonUtls'

// chi tiet khao sat
export default function SurveyDetailsPage() {
    const { slug } = useParams()
    const postId = getIdFromSlug(slug ?? '')

    console.log(postId)

    return (
        <div>SurveyDetailsPage</div>
    )
}
