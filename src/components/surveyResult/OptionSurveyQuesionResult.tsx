import { Divider } from '@mui/material'
import { Button, Tooltip } from 'flowbite-react'
import React, { useMemo } from 'react'
import { SurveyItemResult } from '../../types/response/SurveyResult'
import CustomizedPieChart from './CustomizedPieChart'
import HorizontalBarChart from './HorizontalBarChart'

const randomColor = require('randomcolor')

interface OptionSurveyQuesionResultProps {
    data: SurveyItemResult
}

export interface ChartData {
    title: string
    value: number
    color: string
}


export default function OptionSurveyQuesionResult(props: OptionSurveyQuesionResultProps) {
    const randomColors = useMemo<string[]>(() => {
        if (props.data) {
            return props.data.choices.map((item) => randomColor({
                luminosity: 'dark',
                format: 'hex',
                alpha: .7
            }))
        }

        return []
    }, [])

    const chartData = useMemo<ChartData[]>(() => {
        return props.data.choices.map((item, index) => {
            return {
                title: item.content,
                value: item.votes,
                color: randomColors[index],
            }
        })
    }, [props.data])
    return (
        <>
            <HorizontalBarChart data={chartData} />
            <Divider className='w-full mt-10' />
            <CustomizedPieChart data={chartData} />
        </>
    )
}
