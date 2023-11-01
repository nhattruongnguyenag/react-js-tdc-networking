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
                            <div className='card w-90 shadow-xs mb-2 border-0 bg-white p-0'>
                                <div className='card-body p-lg-5 w-100 border-0 p-4' id='card_search'>
                                    <div className='header-search float-left ms-3'>
                                        <div className='form-group icon-input mb-6'>
                                            <div style={{ paddingBottom: 4 }}>
                                                <i className='feather-search font-sm text-info' />
                                            </div>
                                            <input
                                                type='search'
                                                placeholder='Tìm kiếm ...'
                                                className='bg-grey lh-32 font-xssss fw-600 rounded-xl border-0 pb-2.5 pe-3 ps-5 pt-2.5 text-grey-700'
                                                style={{ width: 670, fontSize: 20 }}
                                            />
                                        </div>
                                        <div className="dropdown show">
                                            <div className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Dropdown link
                                            </div>

                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <div className="dropdown-item" >Action</div>
                                                <div className="dropdown-item" >Another action</div>
                                                <div className="dropdown-item" >Something else here</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='card shadow-xs mb-2 border-0 bg-white p-0' style={{ flexDirection: 'row', height: 90, alignItems: 'center' }}>
                                <div style={{ width: 65, height: 65, background: 'red', marginLeft: 30, marginRight: 20, borderRadius: 50, borderWidth: 1, borderColor: 'primary' }}></div>
                                <div className="a" style={{ width: '50%' }}><p style={{ fontSize: 17, fontWeight: 'bold' }}>Bảo Lâm</p></div>
                                <div style={{ position: 'absolute', right: 0, marginRight: 30 }}>

                                    <button type='button' className='btn btn-outline-primary' style={{ width: 130}}>Theo dõi</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
