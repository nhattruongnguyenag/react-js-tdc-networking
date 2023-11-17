import React from 'react'
import Stylesheet from "reactjs-stylesheet"

interface BarNoteItemProps {
  title: string
  color: string
}

export default function BarNoteItem(props: BarNoteItemProps) {
  return (
    <div style={styles.body}>
      <div style={{
        marginTop: 4,
        width: 20,
        height: 20,
        borderRadius: 2,
        backgroundColor: props.color
      }} />
      <div style={styles.itemTitle}>
        <div style={{ textAlign: 'justify' }}>{props.title}</div>
      </div>
    </div>
  )
}

const styles = Stylesheet.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  itemTitle: {
    marginLeft: 5,
    padding: 2,
    flexShrink: 1
  }
})
