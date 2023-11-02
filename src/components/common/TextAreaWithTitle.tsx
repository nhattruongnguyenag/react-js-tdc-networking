import React from 'react'

interface TextAreaWithTitleProps {
  title?: string
  rows?: number
  placeholder?: string
  value?: string
  onTextChange?: (value: string) => void
}

const TextAreaWithTitle = React.forwardRef((props: TextAreaWithTitleProps, ref: React.LegacyRef<HTMLTextAreaElement>) => {
  return (
    <div className='col-lg-12 mt-3'>
      <label className='mont-font fw-600 font-xsss text-dark mb-2'>{props.title ?? 'Title'}</label>
      <textarea
        ref={ref}
        className='form-control h-auto lh-16 mb-0 p-3'
        rows={props.rows ?? 5}
        placeholder={props.placeholder}
        onChange={(event) => props.onTextChange && props.onTextChange(event.target.value)}
      />
    </div>
  )
})

export default TextAreaWithTitle