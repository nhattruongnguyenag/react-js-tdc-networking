import React from 'react'
import { SurveyItemResult } from '../../types/response/SurveyResult'

const randomColor = require('randomcolor')

interface OptionSurveyQuesionResultProps {
    data: SurveyItemResult
}

export interface ChartData {
    name: string
    votes: number
    color: string
    legendFontColor: string
    legendFontSize: number
    tooltipVisible: boolean
}


export default function OptionSurveyQuesionResult() {
    return (
        <div>OptionSurveyQuesionResult</div>
    )
}
