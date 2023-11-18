import React, { useMemo } from 'react'
import { ChartData } from './OptionSurveyQuesionResult'
import Stylesheet from "reactjs-stylesheet"

interface CustomizedPieNoteItemProps {
    data: ChartData[]
    index: number
}

export default function CustomizedPieNoteItem(props: CustomizedPieNoteItemProps) {
    const totalVotes = useMemo<number>(() => {
        return props.data.reduce((pre, cur) => {
            return pre + cur.value
        }, 0)
    }, [])

    const getVotesPercent = (votes: number) => {
        return ((votes / totalVotes) * 100).toFixed(2) + ' %'
    }


    return (
        <div style={styles.body}>
            <div style={{
                marginTop: 6,
                width: 20,
                height: 20,
                borderRadius: 999,
                backgroundColor: props.data[props.index].color
            }} />
            <div style={styles.itemTitle}>
                <div style={{ textAlign: 'justify', color: props.data[props.index].color }}>
                    {getVotesPercent(props.data[props.index].value)} - {props.data[props.index].title}
                </div>
            </div>
        </div>
    )
}


const styles = Stylesheet.create({
    body: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    itemTitle: {
        marginTop: 3,
        marginLeft: 5,
        padding: 2,
        flexShrink: 1
    }
})

