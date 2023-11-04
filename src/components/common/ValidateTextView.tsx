import classNames from 'classnames'
import React from 'react'

interface ValidateTextViewProps {
  textError: string
  isError: boolean
  isVisible: boolean
}

export default function ValidateTextView(props: ValidateTextViewProps) {
  return (
    <div className='mt-2'>
      <p className={classNames('text-sm text-red-500', props.isError && props.isVisible ? '' : 'hidden')}>
        {props.textError}
      </p>
    </div>
  )
}
