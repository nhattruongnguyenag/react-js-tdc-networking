import React from 'react'
import Header from '../components/common/Header'

export default function SearchPage() {
    return (
        <>
            <Header />
            <div className='main-content bg-lightblue theme-dark-bg' style={{ height: '100vh' }}>
                <div className='middle-sidebar-bottom'>
                    <div className='middle-sidebar-left'>
                        <div className='middle-wrap'>
                            <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                                <div className='card-body p-lg-5 w-100 border-0 p-4' id='card_search'>
                                    <div className='header-search float-left ms-3'>
                                        {/*  */}
                                        
                                        {/*  */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
