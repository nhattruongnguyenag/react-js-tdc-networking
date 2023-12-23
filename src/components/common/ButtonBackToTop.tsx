import React, { useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa';
import '../../assets/css/button.css'
export default function ButtonBackToTop() {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div>
            <button
                onClick={scrollToTop}
                style={{
                    display: visible ? 'inline' : 'none'
                }}
                className='wrapperButtonToTop'
            >
                <div
                    className='wrapperButtonToTopIcon'
                >
                    <FaArrowCircleUp
                    />
                </div>
            </button>
        </div>
    )
}
