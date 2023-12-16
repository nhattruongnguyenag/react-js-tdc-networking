import React from 'react'

interface TextAreaWithTitleProps {
  title?: string
  rows?: number
  placeholder?: string
  value?: string
  onTextChange?: (value: string) => void
  disabled?: boolean
  defaultValue?: string
}

const TextAreaWithTitle = React.forwardRef(
  (props: TextAreaWithTitleProps, ref: React.LegacyRef<HTMLTextAreaElement>) => {
    return (
      <div className='col-lg-12 mt-3'>
        <label className='mont-font fw-600 font-xsss text-dark mb-2'>{props.title ?? 'Title'}</label>
        <textarea
          defaultValue={props.defaultValue}
          disabled={Boolean(props.disabled)}
          value={props.value}
          ref={ref}
          className='form-control lh-16 mb-0 h-auto p-3'
          rows={props.rows ?? 5}
          placeholder={props.placeholder}
          onChange={(event) => props.onTextChange && props.onTextChange(event.target.value)}
        />
      </div>
    )
  }
)

export default TextAreaWithTitle
