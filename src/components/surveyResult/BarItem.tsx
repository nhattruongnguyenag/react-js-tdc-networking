import React, { useState } from 'react'
import { ChartData } from './OptionSurveyQuesionResult'
import Stylesheet from "reactjs-stylesheet"
import { Button, CustomFlowbiteTheme, Tooltip } from 'flowbite-react'

interface BarItemProps {
    width?: number
    barChartFlex: number
    data: ChartData
    ref?: React.LegacyRef<HTMLDivElement> | undefined
}

// const customTheme: CustomFlowbiteTheme = {
//     target: "w-fit"
// }

export default function BarItem(props: BarItemProps) {
    const [tooltipVisible, setTooltipVisible] = useState(false)
    return (
        <Tooltip content={props.data.title} theme={{ target: 'w-full' }}>
            <div
                onClick={() => {
                    setTooltipVisible(true)
                    console.log(props.data.color)
                }}
                className='bg-slate-300 hover:cursor-pointer'
                style={styles.barChartItemContainer}
            >
                <div ref={props.ref} style={{ flex: props.barChartFlex, height: 20, backgroundColor: props.data.color + (tooltipVisible ? 'b3' : 'ff') }} />
            </div>
        </Tooltip>
    )
}

const styles = Stylesheet.create({
    barChartItemContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginTop: 25
    },
    bar: {
        height: 20
    },
    barLabel: {
        marginLeft: 10,
        marginRight: 10
    },
    barLabelWrapper: {
        backgroundColor: '#eee'
    }
})
