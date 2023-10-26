import React, {useRef, useState } from 'react'
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
        }
        return number;
    }
    return (
        <>
            <div className='card-body me-lg-5 p-0'>
                {/* To show  */}
                {/* To check and hiddent */}
                <p ref={pRef} className="content-hidden-post content-container fw-500 text-grey-500 lh-26 font-xssss w-100 mb-1">
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