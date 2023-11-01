import React from 'react'

interface InputTextWithTitleProps {
    title?: string
    placeholder?: string
    type?: string
    name?: string
}

export default function InputTextWithTitle(props: InputTextWithTitleProps) {
    return (
        <div className='col-lg-12 mb-3'>
            <div className='form-gorup'>
                <label className='mont-font fw-600 font-xssss text-dark'>{props.title ?? 'Title'}</label>
                <input
                    {...props}
                    className='form-control' />
            </div>
        </div>
    )
}
