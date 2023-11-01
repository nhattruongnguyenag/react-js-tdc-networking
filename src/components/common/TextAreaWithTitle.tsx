import React from 'react'

interface TextAreaWithTitleProps {
  title?: string
  rows?: number
  placeholder?: string
  value?: string
}

export default function TextAreaWithTitle(props: TextAreaWithTitleProps) {
  return (
    <div className='col-lg-12 mb-3'>
      <label className='mont-font fw-600 font-xsss text-dark mb-2'>{props.title ?? 'Title'}</label>
      <textarea
        {...props}
        className='form-control h-auto lh-16 mb-0 p-3'
        rows={props.rows ?? 5}
      />
    </div>
  )
}
