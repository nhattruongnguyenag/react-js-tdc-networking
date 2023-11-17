import React from 'react'
import { ChartData } from './OptionSurveyQuesionResult'
import { PieChart } from 'react-minimal-pie-chart'
import Stylesheet from "reactjs-stylesheet"
import CustomizedPieNoteItem from './CustomizedPieNoteItem'

interface CustomizedPieChartProps {
    data: ChartData[]
}

export default function CustomizedPieChart(props: CustomizedPieChartProps) {
    return (
        <div style={styles.container}>
            <div className='flex justify-center mt-12'>
                <PieChart
                    style={{ width: 250, height: 250 }}
                    data={props.data}
                />
            </div>

            <div style={styles.chartNote}>
                {
                    props.data.map((item, index) => <CustomizedPieNoteItem data={props.data} index={index}/>)
                }
            </div>
        </div>
    )
}

const styles = Stylesheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    chartNote: {
        marginLeft: 40,
        marginRight: 10,
        marginTop: 20
    }
})

