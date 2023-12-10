import React, { useMemo } from 'react'
import { ChartData } from './OptionSurveyQuesionResult'
import Stylesheet from "reactjs-stylesheet"
import BarItem from './BarItem'
import BarNoteItem from './BarNoteItem'
import { BAR_CHART_NOTE_TITLE_CHOICE } from '../../constants/StringVietnamese'

const randomColor = require('randomcolor')

interface HoriontalBarChartProps {
    data: ChartData[]
}

export default function HorizontalBarChart(props: HoriontalBarChartProps) {
    const maxNumberVote = useMemo(() => {
        return Math.max(...props.data.map((item) => item.value))
    }, [])

    return (
        <div style={styles.container}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 20, marginTop: 5 }}>
                {
                    props.data.map((item, index) => <div style={styles.yLabel}><p>{item.value}</p></div>)
                }
            </div>
            <div style={styles.chartContainer}>
                <div style={styles.barChartContainer}>
                    {
                        props.data.map((item, index) =>
                            <BarItem
                                key={index.toString()}
                                barChartFlex={maxNumberVote !== 0 ? item.value / maxNumberVote : 0}
                                data={item}
                            />)
                    }
                </div>

                <div style={styles.chartNote}>
                    <p style={styles.chartNoteTitle}>{BAR_CHART_NOTE_TITLE_CHOICE}</p>
                    {
                        props.data.map((item, index) => <BarNoteItem title={item.title} color={item.color} />)
                    }
                </div>
            </div>
        </div>
    )
}

const styles = Stylesheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 25,
        marginLeft: 15
    },
    chartContainer: {
        flex: 1,
        marginRight: 10
    },
    barChartContainer: {
        borderLeftWidth: 1,
        paddingBottom: 25
    },
    yLabel: {
        height: 20,
        marginTop: 25,
        marginRight: 15,
        textAlign: 'right',
        minWidth: 30,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    chartNote: {
        marginTop: 10
    },
    chartNoteTitle: {
        marginBottom: -5,
        fontSize: 15,
        fontWeight: 'bold'
    }
})


