import React from 'react'
import { ChartData } from './OptionSurveyQuesionResult'

interface BarItemProps {
    width?: number
    barChartFlex: number
    data: ChartData
    ref?: React.LegacyRef<HTMLDivElement> | undefined
}

export default function BarItem() {
    return (
        <div>BarItem</div>
    )
}
