import React from 'react'

interface InputTextWithTitleProps {
  title?: string
  placeholder?: string
  type?: string
  name?: string
  onTextChange?: (value: string) => void
  defaultValue?: string
}

const InputTextWithTitle = React.forwardRef(
  (props: InputTextWithTitleProps, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <div className='col-lg-12 mt-3'>
        <div className='form-gorup'>
          <label className='mont-font fw-600 font-xsss text-dark mb-2'>{props.title ?? 'Title'}</label>
          <input
            ref={ref}
            defaultValue={props.defaultValue}
            onChange={(event) => props.onTextChange && props.onTextChange(event.target.value)}
            placeholder={props.placeholder}
            type={props.type ? props.type : 'text'}
            name={props.name}
            className='form-control'
          />
        </div>
      </div>
    )
  }
)

export default InputTextWithTitle
