import React from 'react'
import { COLOR_DANGER, COLOR_SUCCESS } from '../constants/Color'
import { CssStyleClass } from '@fortawesome/fontawesome-svg-core'

interface TextValidateProps {
  textError: string
  isError: boolean
  isVisible: boolean
}

export default function TextValidate(props: TextValidateProps) {
  return (
    <label style={{ color: props.isError ? COLOR_DANGER : COLOR_SUCCESS, display: props.isVisible ? 'flex' : 'none' }}>
      {props.isError ? props.textError : ''}
    </label>
  )
}

const styles = {
  textError: {
    fontSize: 16,
    marginTop: 10
  }
}
