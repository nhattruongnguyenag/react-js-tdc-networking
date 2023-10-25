import React, { useEffect, useRef, useState } from 'react'
import { handleDataClassification } from '../../utils/DataClassfications'
export interface PostContentType {
    content: string
}
const CustomizeBodyPost = (props: PostContentType) => {
    const [hidden, setHidden] = useState(true);
    const pRef = useRef<HTMLParagraphElement | null>(null);
    const getNumberLineOfParagraph = (): boolean => {
        const pElement = pRef.current;
        let number = false;
        if (pElement) {
            const pHeight = pElement.clientHeight;
            const lineHeight = parseFloat(getComputedStyle(pElement).lineHeight);
            const lines = Math.floor(pHeight / lineHeight);
            number = lines > 4;
            console.log('====================================');
            console.log(lines);
            console.log('====================================');
        }
        return number;
    }
    return (
        <>
            <div className='card-body me-lg-5 p-0'>
                {/* To show  */}
                {/* To check and hiddent */}
                <p ref={pRef} className="content-container fw-500 text-grey-500 lh-26 font-xssss w-100 mb-1" style={{ zIndex: -999, visibility:'hidden', position:'absolute'}}>
                    {
                        props.content
                    }
                </p>
                <p
                    className={hidden ? 'content-container fw-500 text-grey-500 lh-26 font-xssss w-100 mb-1 body-content' : 'content-container fw-500 text-grey-500 lh-26 font-xssss w-100 mb-1'}>
                    {
                        props.content
                    }.{' '}
                </p >
                {
                    getNumberLineOfParagraph() && <button
                        onClick={() => { setHidden(!hidden) }}
                        className='fw-600 text-primary'>
                        <span className='font-xssss'>
                            {
                                hidden ? 'Xem thêm' : 'Ẩn bớt'
                            }
                        </span>
                    </button>
                }
            </div >
        </>
    )
}

export default CustomizeBodyPost